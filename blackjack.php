<?php
session_start();
if (empty($_SESSION['username']))
{
  header('location:gameportal.php');
}
include 'gameconnect.php';
$con = connect_to_db();
$username = $_SESSION['username'];
?>
<html>
<head>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
<title>Awkward Seagull Games: Blackjack</title>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src='http://paperjs.org/assets/js/paper.js'></script>
<script src="https://cdn.socket.io/socket.io-1.3.4.js"></script>
<!--external javascript-->
<script src='blackjackclient.js' defer></script>
<link href="css/style.css" rel="stylesheet">
<style>
canvas {background-color: black;}
h1  {color:white; text-shadow: 0px 1px 4px black;}
h2	{color:white; text-shadow: 0px 2px 4px black;}
h3	{color:white; text-shadow: 0px 2px 4px black;}
#SGicon {
    margin:0;
    padding:0;
    width:40px;
    max-width:100%;
    height:auto;
  }
body {background-color:#999999;;
      background-size:100% auto;
      background-repeat: no-repeat;
}
/*

bubble windows
the layers are:
- bubble-outer (jquery adds alot of stuff here)
- bubble-inner (so that stretchHeight works)
- bubble-pad
  - optional to provide padding
- bubble-main (the one that stretchHeight works on)

*/

/* chat box css and code taken from html5cards.com */
.bubble-outer {
	border: 1px solid #555;
	background: #555;
	-moz-border-radius: 3px;
	-webkit-border-radius: 3px;
	border-radius: 3px;
}
.bubble-title-bar {
	width: 100%;
	font-weight: bold;
	color: #ffffff;
	height: 16px;
	line-height: 13px;
}
.bubble-inner {
	width: 100%;
	height: 100%;
}
.bubble-padded {
	padding: 10px;
	background: #ffffff;
	-moz-border-radius: 3px;
	-webkit-border-radius: 3px;
	border-radius: 3px;
}
.bubble-draggable {
	cursor: move;
}
.bubble-outer:hover {
	background: #666;
}
/* chat */

#playersbox {
	background: #ffffff;
	border-bottom: 1px solid #cccccc;
}
#chat-window {
	width: 280px;
	height: 450px;
	z-index: 1;
}
.chat-area {
	width: 100%;
	color: #333333;
	background: #ffffff;
	font-size: 12px;
	line-height: 1.0em;
	font-family: Verdana, Helvetica, sans-serif;
}
#chat-input {
	height: 25px;
	border-bottom: none;
	border-left: none;
	border-right: none;
	border-top: 1px solid #cccccc;
	background: #ffffff;
	padding: 0px;
}
#chat-input:hover, #chat-input:focus {
	border-top: 1px solid #999999;
	background: #e0e0ff;
}
#chat-output {
	overflow:auto;
}
.chat-msg-others {
	color: #333333;
}
.chat-msg-self {
	color: #333366;
}
.chat-msg-player {
	color: #663333;
}



</style>
</head>
<body>
<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="gamemain.php">
        <img id="SGicon" alt="ASGG" src="http://104.130.213.200/img/icon.png">
      </a>
      <a class="navbar-brand" href="#">Awkward Seagull Games</a>
    </div>

    <ul class="nav navbar-nav">
      <li><a href="gameaccount.php"><?php echo "Welcome, ".$username.'!'; ?></a></li>
    </ul>

    <ul class="nav navbar-nav">
      <li><a href='gamemain.php'>Play War</a></li>
    </ul>

    <ul class="nav navbar-nav">
      <li><a href="blackjack.php">Play Blackjack</a></li>
    </ul>

    <ul class="nav navbar-nav navbar-right">
      <li><a href="gamelogout.php">Logout</a></li>
    </ul>
  </div>
</nav>
<div class=''>
<div class='col-xs-2'>
<!-- right sidebar -->
<div class="bubble-outer" id="chat-window">
	<div class="bubble-inner">
		<div class="bubble-title-bar bubble-draggable" id="chat-titlebar">
			Chat
			|
			<span id="playersnum"><?php echo $username ?></span>
		</div>
		<div id="playersbox">
		</div>
		<div class="chat-area" id="chat-output">
			<div>Welcome!</div>
		</div>
		<textarea class="chat-area" id="chat-input" rows="1"></textarea>
	</div>
</div>
</div>

<div class='col-xs-2'>
</div>
<div class='col-xs-8'>
<h2><b>Blackjack</b></h2>
<canvas id='can' width='800', height='500'>You are using a prehistoric browser</canvas>
<?php echo "<button class='btn btn-default btn-block' onclick='setUpBlackJack(\"$username\")'>Play</button>"?>
</div>
</div>
</body>
</html>
<?php
mysql_close($con);
?>
