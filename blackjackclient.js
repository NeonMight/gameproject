function setUpBlackJack(usr)
{
  var canv = document.getElementById('can');
  var guestOrDealer = '';
  var socket = io.connect('http://localhost:3002');
  socket.on('connect',function() {
    socket.emit('adduser',usr);
  });
  socket.on('role',function(role)
  {
    console.log('You are the '+role);
    guestOrDealer = role;
  });
  //paper.setup(canv);
  //var background = new Paper.Raster();
  //background.source = '';
}
