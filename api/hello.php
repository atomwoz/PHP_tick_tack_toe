<?php
require_once 'memcached.php';
    $memcached-> delete('choice');
    $memcached -> delete('board');
    $memcached -> delete('winner');
session_destroy();
?>