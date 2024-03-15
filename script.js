$("#game").style.display = "none"

let gameState = {
    game: {
        board: [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ],
        currentPlayer: "X",
        winner: null,
        myTurn: false
    }
}


function commitGameState()
{
    fetch("/game", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            game: game
        })
    }).then(response => response.json()).
}