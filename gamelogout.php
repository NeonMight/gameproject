<?php session_start();
session_destroy(); // Destroy session on logout
header("location:gameportal.php"); // reroute to login page
?>
