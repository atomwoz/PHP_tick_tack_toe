<?php
// Create a new instance of Memcached
$memcached = new Memcached();

// Add Memcached server(s) to the pool
$memcached->addServer('localhost', 41164);

// Set a value in Memcached
//$memcached->set('my_key', 'Hello, Memcached!');

// Retrieve a value from Memcached
$value = $memcached->get('my_key');

// Check if the value exists
if ($value !== false) {
    echo "Value from Memcached: " . $value;
} else {
    echo "Value not found in Memcached.";
}

// Delete a key from Memcached
//$memcached->delete('my_key');

// Close the connection
$memcached->quit();
?>
