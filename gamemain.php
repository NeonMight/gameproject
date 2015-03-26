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
<title>Welcome!</title>
<!--bootstrap minified css-->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
<style>
canvas {border: 2px solid black;}
</style>
<!--jquery minified js-->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src='http://paperjs.org/assets/js/paper.js'></script>
<!--external javascript-->
<script src='game.js'></script>
</head>
<body>
<div class='container'>
<?php echo "<img src='http://a.rgbimg.com/cache1pG5f6/users/g/gr/groningen/300/mOaMyty.jpg' onload='initialize_game(\"$username\")'>"; ?>
<h2>HTML5 War Game</h2>
<canvas id='field' width='1000' height='1000'>You need to update your browser, bro</canvas><br>
<p id='score' name='score'></p>
<a href='gamelogout.php'>Logout</a>
</div>
<img class='hidden' id='card' src='http://upload.wikimedia.org/wikipedia/commons/9/9b/Poker-sm-212-Ks.png' height='200' width='150'>
<?php mysql_close($con); ?>
</body>
</html>
