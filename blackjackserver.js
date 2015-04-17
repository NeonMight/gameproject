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
  for (var i = 2; i < 11; i++)
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
var dealerCards = [];
var winningUser = [];
var winningHand = [];
var roomCount = 0;
var roomPopulation = [];
var capacity = 3;
for (var i = 0; i < 50; i++) //imposes a limit for number of players
{
  winningHand.push(0);
  roomPopulation.push(0);
  decks.push(createDeck());
  dealerCards.push([]);
}
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname+'/'));

//handler for connection

//events will be adduser, disconnect, round,
io.sockets.on('connection', function(socket)
{
  var hand = [];
  var seat = 0;
  socket.on('adduser',function(username)
  {
    socket.username = username;
    socket.room = 'Lobby';
    usernames[username] = username;
    socket.join('Lobby');
    //now join next available room
    socket.leave('Lobby');
    //console.log('Migrating user to new room...');
    socket.room = roomCount;
    socket.join('room'+socket.room);
    console.log(username+' has been added to room # '+socket.room);
    // check if another user is already in room
    roomPopulation[socket.room] += 1;
    //console.log('room '+socket.room+' seating is now at '+roomPopulation[socket.room])
    if(roomPopulation[socket.room] >= capacity) //if room limit has been reached
    {
      rooms.push('room'+roomCount);
      roomCount++;
    }
    //dealer cards
    socket.emit('ready',username);
    seat = roomPopulation[socket.room];
    dealerCards[socket.room].push(decks[socket.room].pop());
    dealerCards[socket.room].push(decks[socket.room].pop()); //both cards are already drawn
  });

  socket.on('init',function(usr) //sets up initial game
  {
    var offset = 0
    var position = 150 + (200 * seat);
    var dealercard = dealerCards[socket.room][0];
    io.sockets.in('room'+socket.room).emit('dealer',{x:500+offset, y:125, val:dealercard});
    io.sockets.in('room'+socket.room).emit('dealer',{x:500+75, y:125, val:1});
    for (var i = 0; i < 2;i++)
    {
      // store guest cards in another array and iterate to get existing user's cards
      var guestcard = decks[socket.room].pop();
      hand.push(guestcard);
      io.sockets.in('room'+socket.room).emit('card',{x:position+offset, y:400, val:guestcard, user:usr});
      offset += 75;
    }
    var total = 0;
    for (var i = 0; i < hand.length; i++)
    {
      total += hand[i];
    }
    console.log(usr+' has a hand of '+total);
    if (roomPopulation[socket.room] >= 2)
    {
      io.sockets.in('room'+socket.room).emit('turn', 'test'); //the first user
    }
  })

  socket.on('disconnect',function()
  {
    io.sockets.in('room'+socket.room).emit('left',socket.username);
    delete usernames[socket.username];
    socket.leave('room'+socket.room);
    console.log( socket.username+' has left.');
  })
}
)

http.listen(3002, function() {
          console.log('listening on *:3002');
});
