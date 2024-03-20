<?php
require_once 'memcached.php';
$i=0;
$i = $i + intval($memcached -> get('choice') != null);
echo $i;
?>