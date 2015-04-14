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
#SGicon {
    margin:0;
    padding:0;
    width:40px;
    max-width:100%;
    height:auto;
  }
body {background-image:url('http://104.130.213.200/img/main-bg.jpg');
      background-size:100% auto;
      background-repeat: no-repeat;
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
<div class='container'>
<h2><b>Blackjack</b></h2>
<canvas id='can' width ='1100' height='500'>You are using a prehistoric browser</canvas>
<?php echo "<button class='btn btn-default btn-block' onclick='setUpBlackJack(\"$username\")'>Play?</button>"?>
</div>
</body>
</html>
<?php
mysql_close($con);
?>
