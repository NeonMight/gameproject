function validateLogin()
{
  var u = document.getElementById('username').value;
  var p = document.getElementById('password').value;
  if (p == '' || u == '')
  {
    alert('Make sure all fields are filled in before continuing');
    return false;
  }
}

function validateRegister()
{
  var u = document.getElementById('user').value;
  var p = document.getElementById('pass').value;
  var p2 = document.getElementById('pass2').value;
  var uclass = document.getElementById('userfield').getAttribute('class');
  //alert(uclass);
  if (p == '' || u == '' || p2 == '')
  {
    alert('Make sure all fields are filled in before continuing');
    return false;
  }
  if (p != p2)
  {
    alert('Passwords do not match. Try again.');
    return false;
  }
  if (uclass == 'form-group has-error')
  {
    alert('Username '+u+' already exists.');
    return false;
  }
}

//jquery fadein from onextrapixel.com
$(document).ready(function(){
	//fade in from http://www.onextrapixel.com/2010/02/23/how-to-use-jquery-to-make-slick-page-transitions/
	$("body").css("display", "none");
	$("body").fadeIn(500);
});

function getXMLHttpObject()
{
	if (window.XMLHttpRequest)
	{
		xmlHttp = new XMLHttpRequest(); //good browsers
	}
	else
	{
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); // IE
	}
	return xmlHttp;
}

function userAvail() //change event to onkeyup
{
  //alert('changed!');
  var request = getXMLHttpObject();
  var text = document.getElementById('user').value;
  var params = "action=checkAvailUsers&text="+text+"&sid="+Math.random(); //all ajax will be sent with an action to gamerequest.php
  request.open('post','gamerequest.php',true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.send(params);
  request.onreadystatechange = function()
  {
    var pizza = request.responseText;
    //alert(pizza);
    var input = document.getElementById('userfield');
    if (pizza == 0)
    {
      input.setAttribute('class','form-group has-success');
    }
    else
    {
      input.setAttribute('class','form-group has-error');
    }
  }
}

function initialize_game(usr)
{
  var canv = document.getElementById('field');
  var ctx = canv.getContext('2d');
  paper.setup(canv);
  var background = new paper.Raster();
  background.source = 'http://catalog.windfalllumber.com/wp-content/uploads/2012/10/TRGRP_211_001_R72-e1352741367732.jpg';
  background.scale(1);
  background.position.x += 400;
  var socket = setUpSocket();
  socket.on('full',function(data){alert(data);});
  socket.on('first',function(data){alert(data);});
  socket.on('second',function(data){alert(data);});
  socket.on('card',function(data)
  {
    if(data == 1)
    {
      renderCard(500,400,1,socket);
    }
    else renderCard(500,150,0,socket);
  });
}
// give cards a unique id
function renderCard(x,y,uoo,s)
{
    var raster = new paper.Raster();
    raster.source = 'http://104.130.213.200/img/card1.png';
    raster.scale(.25);
    raster.position.x = x;
    raster.position.y = y;
    if(uoo == 1)
    {
      raster.onClick = function(event){raster.position.y-=70;s.emit('play',uoo);} //pass the user
      s.on('flipu',function(val){raster.source='http://104.130.213.200/img/card'+val+'.png';});
      s.on('reset',function(){raster.source='http://104.130.213.200/img/card1.png';raster.position.y+=70;});
    }
    else
    {
      raster.rotate(180);
      s.on('flipo',function(val){raster.source='http://104.130.213.200/img/card'+val+'.png';});
    }
}

function setUpSocket()
{
  var socket = io.connect('http://localhost:3001');
  return socket;
}
