<?php
require_once 'memcached.php';
$status = $memcached->get('winner');
if ($status == null) {
    $status = "NO_WIN";
}
echo $status;
?>