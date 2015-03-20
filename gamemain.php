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
<!--jquery minified js-->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<!--external javascript-->
<script src='game.js'></script>
</head>
<body onload='setup_canvas()'>
<div class='container'>
<h2>You done did it!!</h2>
<canvas id='field' width='700' height='700'>You need to update your browser, bro</canvas><br>
<a href='gamelogout.php'>Logout</a>
</div>
</body>
</html>
