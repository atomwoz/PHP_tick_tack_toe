<?php
require_once 'memcached.php';
print_r($memcached->get('board'));
echo "<br/>You are: " . $_SESSION['choice'] . "<br/>";
echo "<br/>Debug info: " . $memcached->get('debug');
$memcached->delete('debug');
?>