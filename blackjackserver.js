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
  for (var i = 2; i < 15; i++)
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
var dealer = []; //each room will have a dealer (first person to connect). This stores usernames?
var userCount = 0;
var roomCount = 0;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname+'/'));

//handler for connection

io.sockets.on('connection', function(socket)
{
  socket.on('adduser',function(username)
  {
    var role = '';
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
      role = 'dealer';
    }
    else role = 'guest';
    //now join next available room
    socket.leave('Lobby');
    //console.log('Migrating user to new room...');
    socket.room = Math.floor(userCount/2);
    userCount++;
    socket.join('room'+socket.room);
    console.log(username+' has been added to room # '+socket.room+' as the '+role);
    socket.emit('role',role);
    // check if another user is already in room
  });
  socket.on('disconnect',function()
  {
    delete usernames[socket.username];
    socket.leave(socket.room);
    console.log( socket.username+' has left.');
  })
}
)

http.listen(3002, function() {
          console.log('listening on *:3002');
});
