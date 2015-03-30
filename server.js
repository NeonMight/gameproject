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

var io = require('socket.io')(1337);
console.log('Server listening on port 1337');
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
  if(num_players < 2)
  {
    //pop off of deck and send back to player
  }
  else
  {
    console.log('There are 2 players already playing');
  }
  socket.on('message', function()
  {
    console.log('A card has been played');
    //receive data played by user here
    cards_played++;
    if(cards_played == 2)
    {
      //decide which one is larger here
    }
  });
  socket.on('disconnect',function(){num_players--;});
}
);
