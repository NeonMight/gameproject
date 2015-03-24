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

if ($action = 'getScore')
{
  $username = $_POST['text'];
  $sql = 'select score from accounts where username= "'.$username.'";';
  $results = mysql_query($sql)or die('Error fetching score'.mysql_error());
  while($row = mysql_fetch_assoc($results))
  {
    echo $row['score'];
  }
}
?>
