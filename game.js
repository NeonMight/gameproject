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

function initialize_game(usr)
{
  var canv = document.getElementById('field');
  var ctx = canv.getContext('2d');
  var deck = [];
  for (var i = 1; i<13; i++)
  {
    deck.push(i);
    deck.push(i);
    deck.push(i);
    deck.push(i);
  }
  shuffle(deck);
  //we will draw from one single deck for both players
  /*
  var card1 = deck.pop();
  var card2 = deck.pop();
  var card3 = deck.pop();
  alert('Your 3 random cards are '+card1+' '+card2+' and '+card3);
  console.log('gratz');
  */
  var offset = 0;
  for (var i = 0; i < 3; i++)
  {
    //draw cards
    renderCard(deck.pop(),100+offset,750,ctx,canv);
    offset += 175;
  }
  //request for users score here with xmlrequest
  var request = getXMLHttpObject();
  //pass username into this function with php
  //get the username from the function call
  var params = "action=getScore&text="+usr+"&sid="+Math.random();
  request.open('post','gamerequest.php',true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.send(params);
  request.onreadystatechange = function() {
    var score = document.getElementById('score');
    var pizza = 'Your score is: <b>'+request.responseText+'</b>';
    score.innerHTML = pizza;
  }
  console.log('Your username is '+usr);
}

function renderCard(c,x,y,ctx,can)
{
  //
  console.log('Rendering a '+c);
  var card = new Image(150,200);
  card.src = 'http://upload.wikimedia.org/wikipedia/commons/9/9b/Poker-sm-212-Ks.png'; //default image for now
  card.onload = function(){ctx.drawImage(card,x,y,150,200);}
  //img.onload = function(){ctx.drawImage(img,0,0);write_text(ctx);}
  can.addEventListener('click', function(event) {
    var xe = event.pageX - can.offsetLeft;
    var ye = event.pageY - can.offsetTop;
    if (xe >= x && xe <= x+150 && ye >= y && ye <= y+200) alert('clicked a card');
  }, false);
}
