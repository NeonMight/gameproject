<?php
session_start();
include 'gameconnect.php';
$username = $_POST['user'];
$password = $_POST['pass'];
//echo "<p>".$username." ".$password."</p>";
$password = md5($password);
//echo $password;
$con = connect_to_db();
$newuser = "insert into accounts(username,password,score) values('$username','$password',0);";
mysql_query($newuser)or die('Could not submit data: '.mysql_error());
mysql_close($con);
$_SESSION['account'] = 1;
header('location:gameportal.php');
?>
