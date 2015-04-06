<?php
$action = $_POST['action'];
include 'gameconnect.php';
$con = connect_to_db();
if ($action = 'checkAvailUsers')
{
  $text = $_POST['text'];
  $query = 'select username from accounts where username = "'.$text.'";';
  $results = mysql_query($query)or die("Error fetching data".mysql_error());
  $count = mysql_num_rows($results);
  echo $count;
}

else if ($action = 'updateScore')
{
  $username = $_POST['text'];
  $sql = 'select score from accounts where username= "'.$username.'";';
  $results = mysql_query($sql)or die('Error fetching score'.mysql_error());
  while($row = mysql_fetch_assoc($results))
  {
    $score = $row['score'];
  }
  $score += 10;
  $update = 'update accounts set score = '.$score.'where username = "'.$username.'";';
  mysql_query($update)or die('Could not update score'.mysql_error());
}
?>
