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
}

//draw grid taken from class example
function setup_canvas()
{
  //Get our context
  var a_canvas = document.getElementById("field");
  var a_context = a_canvas.getContext("2d");

  //Trace the horizontal and vertical lines
  for (var x = 0.5; x < 700; x += 10) {
    a_context.moveTo(x, 0);
    a_context.lineTo(x, 700);
  }

  for (var y = 0.5; y < 700; y += 10) {
    a_context.moveTo(0, y);
    a_context.lineTo(700, y);
  }

  //Set the stroke style (in this case, only a color)
  a_context.strokeStyle = "#eee";

  //This line below actually draws everything
  a_context.stroke();

  //setup mousedown drawing on canvas
  var mouse_click_x = 0;
  var mouse_click_y = 0;
  var mouse_is_down = false;
  var line_array = new Array(10);
  var lines = 0;


  $("#field").mousemove(function(e){
    var pageCoords = "( " + e.pageX + ", " + e.pageY + " )";
    var clientCoords = "( " + e.clientX + ", " + e.clientY + " )";
    $("span:first").text("( e.pageX, e.pageY ) : " + pageCoords);
    $("span:last").text("( e.clientX, e.clientY ) : " + clientCoords);

    if(mouse_is_down)
    {
      //Get our context
      var a_canvas = document.getElementById("field");
      var a_context = a_canvas.getContext("2d");

      //Clear the context
      //a_canvas.width = a_canvas.width;

      //Set the stroke style
      a_context.strokeStyle = "#000";

      //Redraw all of our lines
      for(i=0; i<lines; i++)
      {
        a_context.moveTo(line_array[i][0], line_array[i][1]);
        a_context.lineTo(line_array[i][2], line_array[i][3]);
        a_context.stroke();
      }

      //Draw the new line
      a_context.moveTo(mouse_click_x, mouse_click_y);
      a_context.lineTo(e.pageX, e.pageY);
      a_context.stroke();
    }
  });

  $("#field").mousedown(function(e){
    //A new line has started
    mouse_click_x = e.pageX;
    mouse_click_y = e.pageY;
    mouse_is_down = true;
  });

  $("#field").mouseup(function(e){
    //Stop drawing the new line
    mouse_is_down = false;

    //Put this new line into our lines array
    line_array[lines] = new Array(4);
    line_array[lines][0] = mouse_click_x;
    line_array[lines][1] = mouse_click_y;
    line_array[lines][2] = e.pageX;
    line_array[lines][3] = e.pageY;
    lines++;
  });

  //now initialize the game environment

  initialize_game();
}
