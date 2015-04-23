// turn event will pass a username, which will add a click event to the canvas if usernames match
// turn will iterate through the available users and send back the next user
// hitme will be a event listener on dblclick that will send the username to the server
function setUpBlackJack(usr)
{
  var canv = document.getElementById('can');
  paper.setup(canv);
  var background = new paper.Raster();
  background.source = 'http://web.stanford.edu/~jlewis8/cs148/pokerscene/textures/perlinfelt1.jpg';
  background.scale(1.1);
  background.position.x += 550;
  background.position.y += 0;
  chatbox = document.getElementById('chat-output');
  //you should be able to see both of your cards and one of dealer's
  var socket = io.connect('http://localhost:3002');
  socket.on('connect',function() {
    socket.emit('adduser',usr);
  });

  socket.on('chat',function(data) //handle chatbox for all players
  {
    chatbox.innerHTML += "<br><div class='chat-area' id=''>"+data.username+": "+data.message+"</div>";
  });

  socket.on('ready',function(u)
  {
    socket.emit('init',u);
  });
  socket.on('dealer',function(data)
  {
    renderCard(data.x,data.y,'DEALER',data.val); //user will have different x position depending on their seat in the room
  });
  socket.on('card',function(data)
  {
    renderCard(data.x,data.y,data.user,data.val);
  });
  socket.on('turn',function(who)
  {
    alert(who+'\'s turn');
    if (usr == who)
    {
      //add event listeners
      canv.ondblclick = function(){alert('hit me!');};
      document.onkeydown = function(event)
      {
        if (event.keyCode == 32) alert('pass');
        console.log('user pressed a key');
      };
    }
    else
    {
      //remove listeners
      canv.ondblclick = '';
      document.onkeydown = '';
    }
  })
  socket.on('left',function(user)
  {
    alert(user+' has quit.');
  })
}

function renderCard(x,y,usr,val)
{
  var card = new paper.Raster();
  card.source = 'http://104.130.213.200/img/card'+val+'.png';
  card.position.x = x;
  card.position.y = y;
  card.data = usr;
  card.scale(0.21);
}
