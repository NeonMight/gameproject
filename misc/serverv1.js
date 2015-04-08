//shuffle function taken from https://github.com/coolaj86/knuth-shuffle
function shuffle(array)
{
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var io = require('socket.io')(3001);
console.log('Server listening on port 3001');
var num_players = 0;
//create global deck
var cards_played = 0;
var first_card = 0;
var deck = [];
for (var i = 2; i<10; i++)
{
  deck.push(i);
  deck.push(i);
  deck.push(i);
  deck.push(i);
}
shuffle(deck);

io.on('connection', function(socket)
{
  console.log('User has connected');
  num_players++;
  if(num_players < 3)
  {
    //pop off of deck and send back to player
    for (var i = 0; i < 1; i++)
    {
      socket.emit('card',1);
      socket.emit('card',0);
    }
  }
  else
  {
    socket.emit('full','Player capacity reached. Please wait for a spot to open.');
  }
  socket.on('play', function(uoo)
  {
    var val = deck.pop();
    console.log('User has played a '+val);
    if (uoo == 1)
    {
      socket.emit('flipu',val);
    }
    else socket.emit('flipo',first_card);
    cards_played++;
    if(cards_played == 2)
    {
      if (first_card > val)
      {
          socket.emit('first','First player wins');
          setTimeout(function(){io.sockets.emit('reset',1);},3000);
      }
      else
      {
        socket.emit('second','Second player wins');
        setTimeout(function(){io.sockets.emit('reset',1);},3000);
      }
      first_card = 0;
      cards_played = 0;
    }
    else first_card = val;
  });
  socket.on('disconnect',function(){num_players--;console.log('User has disconnected');});
}
);
