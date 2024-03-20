<?php
require_once 'memcached.php';

if (isset($_GET['choice']) && !empty($_GET['choice'])) {
  $choice = $_GET['choice'];

  if ($memcached->get('choice')) {
    if ($memcached->get('choice') == "X") {
      $_SESSION['choice'] = "O";
    } else {
      $_SESSION['choice'] = "X";
    }
    $memcached->delete('choice');
  }
  else
  {
    $memcached->set('choice', $choice);
    $_SESSION['choice'] = $choice;
  }
  echo $_SESSION['choice'];
} else {
  echo "No choice provided";
}
?>