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

//return shuffled deck of cards
function createDeck()
{
  var deck = [];
  for (var i = 2; i < 10; i++)
  {
    deck.push(i);
    deck.push(i);
    deck.push(i);
    deck.push(i);
  }
  shuffle(deck);
  return deck;
}

var rooms = ['Lobby'];
var decks = [];
var usernames = {};
var userCount = 0;
var roomCount = 0;
var app = require('http').createServer();
var io = require('socket.io').listen(app);
app.listen(3001);
console.log('Server listening on port 3001');
//handler for connection
io.sockets.on('connection', function(socket)
{
  socket.on('adduser',function(username)
  {
    socket.username = username;
    socket.room = 'Lobby';
    usernames[username] = username;
    socket.join('Lobby');
    if(userCount%2 == 0)
    {
      rooms.push('room'+roomCount);
      roomCount++;
      var newdeck = createDeck();
      decks.push(newdeck);
    }
    userCount++;
    //now join next available room
    socket.leave('Lobby');
    //console.log('Migrating user to new room...');
    socket.room = 'room'+(Math.floor(userCount/2));
    socket.join(rooms[socket.room]);
    console.log(username+' has been added to '+socket.room);
  });
  socket.on('disconnect',function()
  {
    delete usernames[socket.username];
    socket.leave(socket.room);
    console.log('User has left.');
  })
}
)
