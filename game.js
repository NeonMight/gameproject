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

function initialize_game()
{
  var canv = document.getElementById('field');
  var ctx = canv.getContext('2d');
  var cardbank = document.getElementById('cardbank');
  var deck = [];
  for (var i = 1; i<13; i++)
  {
    deck.push(i);
    deck.push(i);
    deck.push(i);
    deck.push(i);
  }
  shuffle(deck);
  //we will split the deck into equal halves later
  var card1 = deck.pop();
  var card2 = deck.pop();
  var card3 = deck.pop();
  alert('Your 3 random cards are '+card1+' '+card2+' and '+card3);
  console.log('gratz');
  // You will have to use images to make on click work

  var c1 = new Image(150,200);
  var c2 = new Image(150,200);
  var c3 = new Image(150,200);
  c1.src = 'http://static.giantbomb.com/uploads/original/2/27734/1074207-king.jpg';
  c2.src = 'http://static.giantbomb.com/uploads/original/2/27734/1074207-king.jpg';
  c3.src = 'http://static.giantbomb.com/uploads/original/2/27734/1074207-king.jpg';
  //c1.src = 'img/card'+card1+'.jpg';
  //c2.src = 'img/card'+card2+'.jpg';
  //c3.src = 'img/card'+card3+'.jpg';
  //var onc1 = 'playCard('+card1+')';
  c1.setAttribute('onclick','playCard('+card1+', "field")');
  c2.setAttribute('onclick','playCard('+card2+', "field")');
  c3.setAttribute('onclick','playCard('+card3+', "field")');
  //c2.setAttribute('onclick','playCard('+card2')');
  //c3.setAttribute('onclick','playCard('+card3')');
  cardbank.appendChild(c1);
  cardbank.appendChild(c2);
  cardbank.appendChild(c3);
}

function playCard(x,f)
{
  //alert('You played '+x+' to '+f+'!');
  canvas = document.getElementById(f);
  ctx = canvas.getContext("2d");
  var newcard = new Image(10,20);
  newcard.src = 'http://static.giantbomb.com/uploads/original/2/27734/1074207-king.jpg';
  //newcard.src = 'img/card'+x+'.jpg';
  newcard.onload = function(){ctx.drawImage(newcard,450,750,150,200);}
}
