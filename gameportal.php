<?php
include 'gameconnect.php';
session_start();
if (!empty($_SESSION['username']))
{
  header('location:gamemain.php');
}
?>
<html>
<head>
<title>Awkward Portal</title>
<!--jquery minified js-->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<!--bootstrap minified css and js files-->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
<script src="js/bootstrap.min.js" defer></script>
<!--external javascript-->
<script src='game.js'></script>
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
</head>
<body>
 <div class="navbar navbar-inverse">

      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
    <a class="navbar-brand" href="index.html">
          <img id="SGicon" alt="ASGG" src="http://104.130.213.200/img/icon.png">
        </a>
        <a class="navbar-brand" href="index.html">Awkward Seagull Games</a>
      </div>
      <div class="navbar-collapse collapse">
        <ul class="nav navbar-nav navbar-right">
        </ul>
      </div><!--/.nav-collapse -->
  </div>

<div class='container'>
<div class='col-xs-6'>
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
<h1>Awkward Portal</h1>
<div class='form-group'>
<h3>Log In</h3>
<form method='post' action='gameverify.php' onsubmit='return validateLogin();'>
<div class='form-group'><input name='username' id='username' placeholder='Username' class='form-control'></div>
<div class='form-group'><input name='password' id='password' placeholder='password' type='password' class='form-control'></div>
<button type='submit' class='btn btn-default'>Log in</button>
</form>
</div>
<div class='form-group'>
<h3>Sign Up</h3>
<form method='post' action='gameregister.php' onsubmit='return validateRegister();'>
<div id='userfield' class='form-group'><label for='user' class='control-label'>Enter your information</label><input name='user' id='user' placeholder='Username' onchange='userAvail();' class='form-control'></div>
<div class='form-group'><input name='pass' id='pass' placeholder='Password' type='password' class='form-control'></div>
<div class='form-group'><input name='pass2' id='pass2' placeholder='Repeat Password' type='password' class='form-control'></div>
<button type='submit' class='btn btn-default'>Sign up</button>
</form>
</div>
</div>

<div class='col-xs-6'>
<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
<ol class="carousel-indicators">
<li data-target="#carousel-example-generic" data-slide-to="0" class=""></li>
<li data-target="#carousel-example-generic" data-slide-to="1" class="active"></li>
<li data-target="#carousel-example-generic" data-slide-to="2" class=""></li>
<li data-target="#carousel-example-generic" data-slide-to="3" class=""></li>
<li data-target="#carousel-example-generic" data-slide-to="4" class=""></li>
<li data-target="#carousel-example-generic" data-slide-to="5" class=""></li>
<li data-target="#carousel-example-generic" data-slide-to="6" class=""></li>
<li data-target="#carousel-example-generic" data-slide-to="7" class=""></li>
<li data-target="#carousel-example-generic" data-slide-to="8" class=""></li>

</ol>
<div class="carousel-inner">
<div class="item">
  <img src="http://104.130.213.200/img/card2.png" alt="">
</div>
<div class="item active">
  <img src="http://104.130.213.200/img/card3.png" alt="">
</div>
<div class="item">
  <img src="http://104.130.213.200/img/card4.png" alt="">
</div>
<div class="item">
  <img src="http://104.130.213.200/img/card5.png" alt="">
</div>
<div class="item">
  <img src="http://104.130.213.200/img/card6.png" alt="">
</div>
<div class="item">
  <img src="http://104.130.213.200/img/card7.png" alt="">
</div>
<div class="item">
  <img src="http://104.130.213.200/img/card8.png" alt="">
</div>
<div class="item">
  <img src="http://104.130.213.200/img/card9.png" alt="">
</div>
<div class="item">
  <img src="http://104.130.213.200/img/card10.png" alt="">
</div>
</div>
</div>
</div>
</div>

<div id="footer">
	<div class="container">
		<div class="row">
			<div class="col-lg-6 col-lg-offset-3">
					<!--Copyright © 2014 - Bootstraptaste.com-->
			</div>
		</div>
	</div>
	</div>
</body>
</html>
<?php
?>
