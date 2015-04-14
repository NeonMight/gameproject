function setUpBlackJack(usr)
{
  var canv = document.getElementById('can');
  paper.setup(canv);
  var background = new paper.Raster();
  background.source = 'http://web.stanford.edu/~jlewis8/cs148/pokerscene/textures/perlinfelt1.jpg';
  background.scale(1.1);
  background.position.x += 550;
  background.position.y += 0;
  //you should be able to see both of your cards and one of dealer's
  var socket = io.connect('http://localhost:3002');
  socket.on('connect',function() {
    socket.emit('adduser',usr);
  });
  socket.on('ready',function(u)
  {
    socket.emit('init',u);
    //render player username here
  });
  socket.on('dealer',function(data)
  {
    renderCard(data.x,data.y,'DEALER',data.val); //user will have different x position depending on their seat in the room
  });
  socket.on('card',function(data)
  {
    renderCard(data.x,data.y,data.user,data.val);
  });
}

function renderCard(x,y,usr,val)
{
  var card = new paper.Raster();
  card.source = 'http://104.130.213.200/img/card'+val+'.png';
  card.position.x = x;
  card.position.y = y;
  card.data = usr;
  card.scale(0.25);
}
