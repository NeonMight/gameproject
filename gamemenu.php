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
<title>Awkward Seagull Games: Games Menu</title>
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
<link href="css/style.css" rel="stylesheet">
<style>
h1  {color:white; text-shadow: 0px 1px 4px black;}
h2	{color:white; text-shadow: 0px 2px 4px black;}
h6 {color:black;}
#SGicon {
    margin:0;
    padding:0;
    width:40px;
    max-width:100%;
    height:auto;
  }
body {background-color:#999999;}
.panel {background-color:#777777;}
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
      <li><a href="#">Play Games</a></li>
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
<div class='col-xs-3'>
</div>
<div class='col-xs-6'>
<div class='panel panel-default' align='center'>
<h4><a href='gamemain.php'>Play Irreconcilable Differences</a></h4>
<img src='img/idifferencesscreenshot.png' width='330' height='230'>
<h4>Level: Beginner</h4>
</div>

<div class='panel panel-default' align='center'>
<h4><a href='blackjack.php'>Play Blackjack: Standard Edition</a></h4>
<img src='img/bjstandardscreenshot.png' width='330' height='230'>
<h4>Level: Intermediate</h4>
</div>

<?php
$sql = "select rank from accounts where username = '".$username."';";
$results = mysql_query($sql)or die('Could not fetch data: '.mysql_error());
while($row = mysql_fetch_assoc($results))
{
  $myRank = $row['rank'];
}
if ($myRank == "champion") include "celink.php";
?>
</div>

</div>
</body>
</html>
