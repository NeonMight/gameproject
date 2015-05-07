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
<title><?php echo $username.": Account data" ?></title>
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
#SGicon {
    margin:0;
    padding:0;
    width:40px;
    max-width:100%;
    height:auto;
  }
body {background-color:#999999;}
</style>
</head>
<body>
<?php
include "navbar.php";
?>
<div class='container'>
<h2><b>Blackjack Leaderboard</b></h2>
<?php
$sql = "select * from accounts order by score desc limit 30";
$resultset = mysql_query($sql)or die('Could not fetch user data '.mysql_error());
$rank = 1;
while ($row = mysql_fetch_assoc($resultset))
{
  echo "<h2><b>".$rank."- ".$row['username']."</b></h2>";
  echo "<h4>Your blackjack rank: <b>".$row['rank']."</b></h4>";
  $rank++;
}
mysql_close($con);
?>
</div>
</body>
</html>
