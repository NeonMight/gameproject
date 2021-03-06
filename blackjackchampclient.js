// turn event will pass a username, which will add a click event to the canvas if usernames match
// turn will iterate through the available users and send back the next user
// hitme will be a event listener on dblclick that will send the username to the server

//jquery fadein from onextrapixel.com
$(document).ready(function(){
	//fade in from http://www.onextrapixel.com/2010/02/23/how-to-use-jquery-to-make-slick-page-transitions/
	$("body").css("display", "none");
	$("body").fadeIn(500);
});

function renderBackground()
{
  var background = new paper.Raster();
  background.source = 'img/goldTable.png';
  //http://104.130.213.200/img/main-bg.jpg
  //http://web.stanford.edu/~jlewis8/cs148/pokerscene/textures/perlinfelt1.jpg
  background.scale(1);
  background.position.x += 550;
  background.position.y += 190;
}

function setUpBlackJack(usr)
{
  document.getElementById('playme').onclick = "";
  var canv = document.getElementById('can');
  paper.setup(canv);
  renderBackground();
  document.getElementById('chat-status').innerHTML = "Connected";
  var chatbox = document.getElementById('chat-output');
    //you should be able to see both of your cards and one of dealer's
  var socket = io.connect('http://localhost:3003');
  //set up chat
  var input = document.getElementById('chat-input');
  var chatfocus = false;
  input.onfocus = function(ev) {chatfocus = true;}; //handle whether chat is active or not
  input.onblur = function(ev) {chatfocus = false;};
  input.onkeydown = function(ev)
  {
    if (ev.keyCode == 13 && chatfocus == true)
    {
      socket.emit('message',{username:usr, message:input.value});
      input.value = '';
    }
  }
  //end chat setup
  socket.on('connect',function() {
    socket.emit('adduser',usr);
  });

  socket.on('chat',function(data) //handle chatbox for all players
  {
    chatbox.innerHTML += "<h5 id=''><b>"+data.username+"</b>: "+data.message+"</h5>";
  });

  socket.on('ready',function(u)
  {
    socket.emit('init',u);
  });
  socket.on("bust",function(usr){alert(usr+ " busted!");}); //handle if user > 21
  socket.on('dealer',function(data)
  {
    renderCard(data.x,data.y,'dealer',data.val,socket,usr,data.type); //pass data.type
  });
  socket.on('card',function(data)
  {
    renderCard(data.x,data.y,data.user,data.val,socket,usr,data.type); //now pass usr into function and compare to data.user
  });

  socket.on('nametag',function(data)
  {
    renderNameplate(data.x,data.y,data.user)
  })

  socket.on('turn',function(who)
  {
    //console.log('Turn signal received');
    alert(who+'\'s turn');
    if (usr == who)
    {
      //add event listeners
      canv.ondblclick = function(){socket.emit('hitme',who)};
      document.onkeydown = function(event)
      {
        if (event.keyCode == 32 && chatfocus == false) socket.emit('pass',who);
        //console.log('user pressed a key');
      };
    }
    else
    {
      //remove listeners
      canv.ondblclick = '';
      document.onkeydown = '';
    }
    if (who == 'dealer') socket.emit('roundover','stuff');
  });

  socket.on('winner',function(who)
  {
    //console.log('win signal received');
    //render winner text
    paper.project.clear();
    renderBackground();
    setTimeout(function(){socket.emit('newround',who);},3000*Math.random()); //reinit canvas & game
  });

  socket.on('left',function(user)
  {
    alert(user+' has left.');
  });
}

function renderCard(x,y,u,val,soc,player,type) //renderCard(x,y,usr,val,soc,player,type)
{
  var card = new paper.Raster();
  card.source = 'http://104.130.213.200/img/card'+val+'.png';
  card.position.x = x;
  card.position.y = y;
  card.data = u;
  card.scale(0.18);
  //for WC Edition/possibly standard, if owner and user !=, render a card1 on top of it so it is pre-rendered and remove those card1's on roundover
  //also could have cover card animate on roundover instead of change source
  //if type =='hidden' and u == player {do some stuff here}
  if (card.data != player && type == "hidden")
  {
    //do the things! hide the cards!
    var coverCard = new paper.Raster();
    coverCard.source = 'http://104.130.213.200/img/card1.png';
    coverCard.position.x = x;
    coverCard.position.y = y;
    coverCard.scale(0.18);
    soc.on('winner',function()
    {
      coverCard.source = ''; //remove cover card
    })
  }
}

function renderNameplate(x,y,name)
{
  var nameplate = new paper.PointText(new paper.Point(x,y));
  nameplate.content = name;
  nameplate.fillColor = 'white';
  nameplate.fontSize = 20;
}
