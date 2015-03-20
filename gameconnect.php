<?php
function connect_to_db()
{
  //global $con;
  //if ($con) return $con;
  $con = mysql_connect('localhost','root','');
  if (!$con)
  {
    die('Error: Could not connect to database: '.mysql_error());
  }
  mysql_select_db('game', $con)or die('Cannot select database game');
  return $con;
}
?>
