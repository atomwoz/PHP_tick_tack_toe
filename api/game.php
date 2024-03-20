<?php
// Create a new instance of Memcached
require_once 'memcached.php';

//$memcached->set('my_key', 'Hello, Memcached!');
//$memcached->delete('my_key');
//$value = $memcached->get('my_key');

echo "CHOOSE";
// Close the connection
$memcached->quit();

?>