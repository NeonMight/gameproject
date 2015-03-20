<?php
include 'gameconnect.php';
session_start();
?>
<html>
<head>
<title>Game Portal</title>
<!--bootstrap minified css-->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
<!--jquery minified js-->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<!--external javascript-->
<script src='game.js'></script>
</head>
<body>
<div class='container'>
<?php
if (!empty($_SESSION['error']))
{
  echo "<div class='alert alert-danger'><p>Wrong username and password combination!</p></div>";
  $_SESSION['error'] = '';
}
if (!empty($_SESSION['account']))
{
  echo "<div class='alert alert-success'><p>Your account has been created!</p></div>";
  $_SESSION['account'] = '';
}
?>
<div class='form-group'>
<h3>Log In</h3>
<form method='post' action='gameverify.php' onsubmit='return validateLogin();'>
<div class='form-group'><input name='username' id='username' placeholder='Username' class='form-control'></div>
<input name='password' id='password' placeholder='password' type='password' class='form-control'>
<button type='submit' class='btn btn-default'>Log in</button>
</form>
</div>
<div class='form-group'>
<h3>Sign Up</h3>
<form method='post' action='gameregister.php' onsubmit='return validateRegister();'>
<div id='userfield' class='form-group'><label for='user' class='control-label'>Enter your information</label><input name='user' id='user' placeholder='Username' onchange='userAvail();' class='form-control'></div>
<input name='pass' id='pass' placeholder='Password' type='password' class='form-control'>
<input name='pass2' id='pass2' placeholder='Repeat Password' type='password' class='form-control'>
<button type='submit' class='btn btn-default'>Sign up</button>
</form>
</div>
</div>
</body>
</html>
<?php
?>
