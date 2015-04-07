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
<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="gamemain.php">
        <img id="SGicon" alt="ASGG" src="http://104.130.213.200/img/icon.png">
      </a>
      <a class="navbar-brand" href="#">Awkward Seagull Games</a>
    </div>
    <?php //echo "<form method='post' action='gameaccount.php' id='viewaccount' name='viewaccount'><input type='hidden' value='".$username."' name = 'user'></form>"?>
    <ul class="nav navbar-nav">
      <li><a href="gameaccount.php"><?php echo "Welcome ".$username; ?></a></li>
    </ul>

    <ul class="nav navbar-nav">
      <li><a href="gamemain.php">Play Games</a></li>
    </ul>

    <ul class="nav navbar-nav navbar-right">
      <li><a href="gamelogout.php">Logout</a></li>
    </ul>
  </div>
</nav>
<div class='container'>
<?php
$sql = "select score from accounts where username = '".$username."';";
$resultset = mysql_query($sql)or die('Could not fetch user data '.mysql_error());
while ($row = mysql_fetch_assoc($resultset))
{
  echo "<h2><b>".$username."</b></h2>";
  echo "<h4>Your total score: <b>".$row['score']."</b></h4>";
}
mysql_close($con);
?>
</div>
</body>
</html>
