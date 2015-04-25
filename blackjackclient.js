// turn event will pass a username, which will add a click event to the canvas if usernames match
// turn will iterate through the available users and send back the next user
// hitme will be a event listener on dblclick that will send the username to the server
function renderBackground()
{
  var background = new paper.Raster();
  background.source = 'http://web.stanford.edu/~jlewis8/cs148/pokerscene/textures/perlinfelt1.jpg';
  //http://104.130.213.200/img/main-bg.jpg
  //http://web.stanford.edu/~jlewis8/cs148/pokerscene/textures/perlinfelt1.jpg
  background.scale(1.1);
  background.position.x += 550;
  background.position.y += 0;
}

function setUpBlackJack(usr)
{
  var canv = document.getElementById('can');
  paper.setup(canv);
  renderBackground();
  document.getElementById('chat-status').innerHTML = "Connected";
  chatbox = document.getElementById('chat-output');
  //you should be able to see both of your cards and one of dealer's
  var socket = io.connect('http://localhost:3002');
  //set up chat
  var input = document.getElementById('chat-input');
  input.onkeydown = function(ev)
  {
    if (ev.keyCode == 13)
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
  socket.on("bust",function(usr){alert(usr+ " busted!");});
  socket.on('dealer',function(data)
  {
    renderCard(data.x,data.y,'dealer',data.val); //user will have different x position depending on their seat in the room
  });
  socket.on('card',function(data)
  {
    renderCard(data.x,data.y,data.user,data.val,socket);
  });
  socket.on('turn',function(who)
  {
    alert(who+'\'s turn');
    if (usr == who)
    {
      //add event listeners
      canv.ondblclick = function(){socket.emit('hitme',who)};
      document.onkeydown = function(event)
      {
        if (event.keyCode == 32) socket.emit('pass',who);
        //console.log('user pressed a key');
      };
    }
    else
    {
      //remove listeners
      canv.ondblclick = '';
      document.onkeydown = '';
    }
    if (usr == 'dealer') socket.emit('roundover','stuff');
  });

  socket.on('winner',function(who)
  {
    alert(who+' wins!');
    setTimeout(function(){paper.project.clear();},2000);
    renderBackground();
  });

  socket.on('left',function(user)
  {
    alert(user+' has left.');
  });
}

function renderCard(x,y,usr,val,s)
{
  var card = new paper.Raster();
  card.source = 'http://104.130.213.200/img/card'+val+'.png';
  card.position.x = x;
  card.position.y = y;
  card.data = usr;
  card.scale(0.21);
}
