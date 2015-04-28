<?php
session_start();
include 'gameconnect.php';
$username = $_POST['username'];
$password = $_POST['password'];
$password = md5($password);
$con = connect_to_db();
$finduser = "select username from accounts where username='".$username."' and password = '".$password."';";
//echo $finduser."<br>";
$results = mysql_query($finduser);
$count = mysql_num_rows($results);
mysql_close($con);
//echo $count;
if ($count >= 1)
{
  $_SESSION['username'] = $username;
  header('location:gamemenu.php');
}
else
{
  $_SESSION['error'] = 1;
  header('location:gameportal.php');
}
?>
