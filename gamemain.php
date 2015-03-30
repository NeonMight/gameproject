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
<script src="https://cdn.socket.io/socket.io-1.3.4.js"></script>
<!--external javascript-->
<script src='game.js' defer></script>
</head>
<body>
<div class='container'>
<img src='http://a.rgbimg.com/cache1pG5f6/users/g/gr/groningen/300/mOaMyty.jpg'>
<h2>HTML5 War Game</h2>
<canvas id='field' width='1100' height='500'>You need to update your browser, bro</canvas><br>
<?php echo "<button class='btn btn-lg btn-primary btn-block' onclick='initialize_game(\"$username\")'>Play!</button>"; ?>
<p id='score' name='score'></p>
<a href='gamelogout.php'>Logout</a>
</div>
<?php mysql_close($con); ?>
</body>
</html>
