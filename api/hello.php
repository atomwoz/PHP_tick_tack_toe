<?php
    $memcached-> delete('choice');
    $memcached -> delete('board');
session_destroy();
?>