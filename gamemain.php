<?php
session_start();
if (empty($_SESSION['username']))
{
  header('location:gameportal.php');
}
include 'gameconnect.php';
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
<!--external javascript-->
<script src='game.js'></script>
</head>
<body onload='initialize_game()'>
<div class='container'>
<h2>You done did it!!</h2>
<canvas id='field' width='1000' height='1000'>You need to update your browser, bro</canvas><br>
<div id='cardbank' name='cardbank'></div>
<a href='gamelogout.php'>Logout</a>
</div>
</body>
</html>
