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

function bust(array) //check if array is over 21
{
  var total = 0;
  for(var a = 0; a < array.length; a++)
  {
    total += array[a];
  }
  var contains11 = array.indexOf(11);
  while (total > 21 && contains11 > -1)
  {
    array[contains11] -= 10;
    total -= 10;
    contains11 = array.indexOf(11);
  }
  if (total > 21) total = -1 //player bust
  return total;
}

var rooms = ['Lobby'];
var decks = [];
var usernames = {};
var dealerCards = [];
var userCards = {};
var winningUser = [];  // current winning user for each room
var winningHand = []; //current high hand for each room
var inRoom = [];
var roomCount = 0;
var roomPopulation = [];
var capacity = 2;
for (var i = 0; i < 50; i++) //imposes a limit for number of players
{
  winningHand.push(0);
  roomPopulation.push(0);
  decks.push(createDeck());
  dealerCards.push([]);
  inRoom.push([]);
  winningUser.push('dealer');
}
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname+'/'));

//handler for connection

//events will be adduser, disconnect, turn, hitme, pass
io.sockets.on('connection', function(socket)
{
  //var seat = 0;
  socket.on('adduser',function(username) //when a new user connects, welcome that user and send them the how to play message
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
    inRoom[socket.room].push(username); //put username into the room data
    console.log(username+' has been added to room # '+socket.room);
    // check if another user is already in room
    roomPopulation[socket.room] += 1;
    //console.log('room '+socket.room+' seating is now at '+roomPopulation[socket.room])
    if(roomPopulation[socket.room] >= capacity) //if room limit has been reached
    {
      rooms.push('room'+roomCount);
      inRoom[socket.room].push("dealer"); //now push dealer
      roomCount++;
    }
    //dealer cards
    socket.emit('ready',username);
    //seat = roomPopulation[socket.room];
    dealerCards[socket.room].push(decks[socket.room].pop());
    dealerCards[socket.room].push(decks[socket.room].pop()); //both cards are already drawn
    socket.emit('chat',{username:"Server", message:'Welcome! To hit, double click canvas! To stay, press spacebar!'})
  });

  socket.on('message',function(data)
  {
    io.sockets.in('room'+socket.room).emit('chat',{username:data.username, message:data.message})
  });

  socket.on('init',function(usr) //sends card data to client to be rendered
  {
    var offset = 0
    var position = 100; // THIS is what you need to edit to figure out proper offset leves
    io.sockets.in('room'+socket.room).emit('dealer',{x:350+offset, y:125, val:dealerCards[socket.room][0]});
    io.sockets.in('room'+socket.room).emit('dealer',{x:350+50, y:125, val:dealerCards[socket.room][1]});
    userCards[usr] = [];
    userCards[usr].push(decks[socket.room].pop());
    userCards[usr].push(decks[socket.room].pop());  //deal first 2 cards for user
    for (var i = 0; i < inRoom[socket.room].length-1; i++) //for each user minus the server
    {
      // store guest cards in another array and iterate to get existing user's cards
      //var guestcard = decks[socket.room].pop();
      //io.sockets.in('room'+socket.room).emit('card',{x:position+offset, y:400, val:guestcard, user:usr});
      //offset += 75;
      // iterate over saved cards and output
      var name = inRoom[socket.room][i] // use i to index into players array
      for (var j = 0; j < userCards[name].length; j++) //for each card
      {
        io.sockets.in('room'+socket.room).emit('card', {x:position+offset/*player offset + card offset*/, y:400, val:userCards[name][j], user:name}); // send each card for this user
        offset += 50; //increment CARD offset for this player
      }
      // NOW, increment the PLAYER offset here
      io.sockets.in('room'+socket.room).emit('nametag',{x:position, y:320, user:name});
      position += 225; //will this work???
      offset = 0;
    }
    if (roomPopulation[socket.room] >= 2)
    {
      io.sockets.in('room'+socket.room).emit('turn', inRoom[socket.room][0]); //the first user in room
    }
  });

  socket.on('hitme',function(usr)
  {
    //give the user another card; how to save LOCATION?! Render cards AGAIN!!!
    //if hand is greater than 21, then bust and send bust, then emit turn next user in room
    var newcard = decks[socket.room].pop();
    userCards[usr].push(newcard);
    //io.sockets.in('room'+socket.room).emit("card",{x:300, y:300,val:newcard,user:usr}); //RE RENDER OLD CARDS WITH SAME LOOP AS INIT

    var offset = 0;
    var position = 100;
    for (var i = 0; i < inRoom[socket.room].length; i++) //for each user minus the server
    {
      var name = inRoom[socket.room][i] // use i to index into players array
      console.log('Getting cards for '+name+'...'); //dont get cards for dealer
      if (name != 'dealer')
      {
        for (var j = 0; j < userCards[name].length; j++) //for each card
        {
          io.sockets.in('room'+socket.room).emit('card', {x:position+offset/*player offset + card offset*/, y:400, val:userCards[name][j], user:name}); // send each card for this user
          offset += 50; //increment CARD offset for this player
        }
      position += 225;
      offset = 0;
      }
    }

    console.log('Rendered');

    var total = bust(userCards[usr]);
    if (total == -1)
      {
        socket.emit("bust",usr);
        var totheback = inRoom[socket.room].shift(); //move front user, who just went, to the back of the line
        inRoom[socket.room].push(totheback);
        setTimeout(function(){io.sockets.in('room'+socket.room).emit('turn',inRoom[socket.room][0])},3000);
      }
  });

  socket.on('pass',function(usr)
  {
    //compare player's total to the current winning hand
    var total = bust(userCards[usr]);
    if (total > winningHand[socket.room])
    {
      winningHand[socket.room] = total;
      winningUser[socket.room] = usr;
    }
    //else, send turn next user in room
    var totheback = inRoom[socket.room].shift(); //move front user, who just went, to the back of the line
    inRoom[socket.room].push(totheback);
    // if hand is greater than highest value, then set highest value and winning username for room
    io.sockets.in('room'+socket.room).emit('turn',inRoom[socket.room][0]); //next user
  });

  socket.on('roundover',function()
  {
    //send init message again in this one and reset deck (decks[socket.room] = createDeck())
    //socket.send('winner',) //send whoever winner is and clear canvas
    //setTimeout(function(){},6000);  send re-initialized game state signal
    var dealertotal = bust(dealerCards[socket.room]);
    if (dealertotal >= winningHand[socket.room])
    {
      winningUser[socket.room] = 'dealer';
    }
    socket.emit('winner',winningUser[socket.room]);
    console.log('Round over.');
  });

  socket.on('disconnect',function()
  {
    io.sockets.in('room'+socket.room).emit('left',socket.username);
    delete usernames[socket.username];
    socket.leave('room'+socket.room);
    console.log( socket.username+' has left.');
  });
}
);

http.listen(3002, function() {
          console.log('listening on *:3002');
});
