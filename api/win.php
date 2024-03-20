<?php
require_once 'memcached.php';
$status = $memcached->get('winner');
echo $status;
?>