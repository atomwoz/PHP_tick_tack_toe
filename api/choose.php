<?php
require_once 'memcached.php';
$debug_info = $memcached->get('debug');
if ($debug_info == null) {
  $debug_info = "";
}
$debug_info .= "=====================================<br/>";

if (isset($_GET['choice']) && !empty($_GET['choice'])) {
  $choice = $_GET['choice'];
  $remaining_symbol = $memcached->get('choice');
  $debug_info .= "Choice: " . $choice . "<br/>";
  $debug_info .= "Remaining symbol: " . $remaining_symbol . "<br/>";
  if ($remaining_symbol == null) {
    $memcached->set('choice', $choice);
    $_SESSION['choice'] = $choice;
    $debug_info .= "Choice is set to " . $choice . "<br/>";
  } else {
    if($remaining_symbol != 'X' && $remaining_symbol != 'O'){
      http_response_code(500);
      exit();
    }
    $mysymbol = $remaining_symbol == 'X' ? 'O' : 'X';
    $memcached-> delete('choice');
    $memcached -> delete('board');
    $_SESSION['choice'] = $mysymbol;
    $debug_info .= "Choice is set to (snd) " . $mysymbol . "<br/>";
  }
  //$memcached->set('debug', $debug_info);
} else {
  $remaining_symbol = $memcached->get('choice');
  if($remaining_symbol != 'X' && $remaining_symbol != 'O'){
    exit("NO_CHOICE");
  }
  $mysymbol = $remaining_symbol == 'X' ? 'O' : 'X';
    $memcached-> delete('choice');
    $memcached -> delete('board');
    $_SESSION['choice'] = $mysymbol;
    $debug_info .= "Choice is set to (pooling)" . $mysymbol . "<br/>";
    //$memcached->set('debug', $debug_info);
}
echo $_SESSION['choice'];
?>
