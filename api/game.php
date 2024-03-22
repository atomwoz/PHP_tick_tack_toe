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
    //$memcached->set('debug', $json . " " . $body . " " . $status["turn"] . " " . $_SESSION['choice']);

    if($status["board"][intval($json["i"])][intval($json["j"])] != "_"){
        http_response_code(400);
        echo "Field is already taken";
        exit();
    }
    if(!isset($_SESSION["choice"])){
        http_response_code(400);
        echo "Invalid bearer";
        exit();
    }
    if($status["turn"] == $_SESSION["choice"]){
        //Set X,O to field specified in "i", "j" in json
        $status["board"][$json["i"]][$json["j"]] = $_SESSION['choice'];
        $status["turn"] = $_SESSION['choice'] == 'X' ? 'O' : 'X';
        
        $memcached->set('board', $status);
    }
    else{
        http_response_code(400);
        echo "It's not your turn";
        exit();
    }
    //Win check here,calc sums of rows,cols,diagonals
    $winner = null
    for($i = 0; $i < 3; $i++){
        $row_sum = 0;
        $col_sum = 0;
        for($j = 0; $j < 3; $j++){
            $row_sum += $status["board"][$i][$j] == $_SESSION['choice'] ? 1 : 0;
            $col_sum += $status["board"][$j][$i] == $_SESSION['choice'] ? 1 : 0;
        }
        if($row_sum == 3 || $col_sum == 3){
            $winner = $_SESSION['choice'];
            break;
        }
    }
    $memcached -> set('winner', $winner);
}

$status = $memcached->get('board');
header('Content-Type: application/json');
echo json_encode($status);
?>