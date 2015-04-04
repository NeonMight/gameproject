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
    deck.push(i);
    deck.push(i);
  }
  shuffle(deck);
  return deck;
}

var rooms = ['Lobby'];
var decks = [];
var firstPlay = [];
for(var i = 0; i < 51; i++)
{
  firstPlay.push(0);
}
var usernames = {};
var firstUser = [];
for(var i = 0; i < 51; i++)
{
  firstUser.push(0);
}
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
    //now join next available room
    socket.leave('Lobby');
    //console.log('Migrating user to new room...');
    socket.room = Math.floor(userCount/2);
    userCount++;
    socket.join('room'+socket.room);
    console.log(username+' has been added to room # '+socket.room);
    io.sockets.in('room'+socket.room).emit('card',username);
    // check if another user is already in room
    if(firstUser[socket.room] != 0)
    {
      io.sockets.in('room'+socket.room).emit('card',firstUser[socket.room]);
      firstUser[socket.room] = 0;
    }
    else firstUser[socket.room] = username;
  });
  socket.on('play',function(user)
  {
    var id = 'room'+socket.room;
    var value = decks[socket.room].pop();
    io.sockets.in(id).emit('flip',{val: value, owner: user});
    if (firstPlay[socket.room] != 0)
    {
      if (firstPlay[socket.room] < value) io.sockets.in(id).emit('winner',user);
      else io.sockets.in(id).emit('winner',firstUser[socket.room]);
      firstPlay[socket.room] = 0;
      setTimeout(function(){io.sockets.in(id).emit('reset','me');},3000);
    }
    else {
      firstPlay[socket.room] = value;
      firstUser[socket.room] = user;
    }
    console.log(user+' played a '+value);
  })
  socket.on('gameover',function(winner)
  {
    io.sockets.in('room'+socket.room).emit('gameend',winner);
  })
  socket.on('disconnect',function()
  {
    delete usernames[socket.username];
    socket.leave(socket.room);
    console.log('A user has left.');
  })
}
)
