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
      <li><a href="gamemenu.php">Play Games</a></li>
    </ul>

    <ul class="nav navbar-nav">
      <li><a href="blackjack.php">Play Blackjack</a></li>
    </ul>

    <ul class="nav navbar-nav">
      <li><a href="leaderboard.php">Leaderboards</a></li>
    </ul>

    <ul class="nav navbar-nav navbar-right">
      <li><a href="gamelogout.php">Logout</a></li>
    </ul>
  </div>
</nav>
