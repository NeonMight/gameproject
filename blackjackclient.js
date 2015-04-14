function setUpBlackJack(usr)
{
  var canv = document.getElementById('can');
  var guestOrDealer = '';
  var socket = io.connect('http://localhost:3002');
  socket.on('connect',function() {
    socket.emit('adduser',usr);
  });
  paper.setup(canv);
  var background = new paper.Raster();
  background.source = 'http://web.stanford.edu/~jlewis8/cs148/pokerscene/textures/perlinfelt1.jpg';
  background.scale(1.1);
  background.position.x += 550;
  background.position.y += 0;
  //you should be able to see both of your cards and one of dealer's
}
