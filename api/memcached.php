<?php
session_start();
$memcached = new Memcached();
$memcached->addServer('localhost', 41164);
?>