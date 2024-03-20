<?php
// Create a new instance of Memcached
require_once 'memcached.php';

$DEFAULT_BOARD = '{
    "board": [
        ["_", "_", "_"],
        ["_", "_", "_"],
        ["_", "_", "_"]
    ],
    "turn": "X"
}';

//Get body


$status = $memcached->get('board');
if ($status == null) {
    $memcached->set('board', json_decode($DEFAULT_BOARD, true));
    $status = $memcached->get('board');
}

$body = file_get_contents('php://input');
if ($body != null) {
    $json = json_decode($body, true);
    if($status["turn"] == $_SESSION['choice']){
        //Set X,O to field specified in "i", "j" in json
        $status["board"][$json["i"]][$json["j"]] = $_SESSION['choice'];
        $status["turn"] = $_SESSION['choice'] == 'X' ? 'O' : 'X';
        
        $memcached->set('board', json_encode($status));
    }
    else{
        http_response_code(400);
        echo "It's not your turn";
        exit();
    }
}

$status = $memcached->get('board');
header('Content-Type: application/json');
echo json_encode($status);
?>