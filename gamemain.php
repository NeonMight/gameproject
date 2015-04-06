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
<link href="css/style.css" rel="stylesheet">
<style>
h1  {color:white; text-shadow: 0px 1px 4px black;}
h2	{color:white; text-shadow: 0px 2px 4px black;}
#SGicon {
    margin:0;
    padding:0;
    width:40px;
    max-width:100%;
    height:auto;
  }
</style>
<title>Irreconcilable Differences</title>
<!--bootstrap minified css-->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
<style>
canvas {background-color: black;}
</style>
<!--jquery minified js-->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src='http://paperjs.org/assets/js/paper.js'></script>
<script src="https://cdn.socket.io/socket.io-1.3.4.js"></script>
<!--external javascript-->
<script src='game.js' defer></script>
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
      <li><a href="gameaccount.php"><?php echo "Welcome ".$username; ?></a></li>
    </ul>

    <ul class="nav navbar-nav">
      <li><a href="#">Play Games</a></li>
    </ul>

    <ul class="nav navbar-nav navbar-right">
      <li><a href="gamelogout.php">Logout</a></li>
    </ul>
  </div>
</nav>
<div class='container'>
<h2>Irreconcilable Differences: A game of browser domination</h2>
<canvas id='field' width='1100' height='500'>You need to update your browser, bro</canvas><br>
<?php echo "<button class='btn btn-lg btn-primary btn-block' onclick='initialize_game(\"$username\")'>Play!</button>"; ?>
<p id='score' name='score' class='lead'>Your score: <b>0</b></p>
</div>
<?php mysql_close($con); ?>
</body>
</html>
