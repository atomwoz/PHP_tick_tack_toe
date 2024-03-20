$("#game").style.display = "none"
$("#init").style.display = "none"

const API_URL = "/api/game.php"

let myPlayer = ""
let gameState = {
    game: {
        board: [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ],
        winner: null,
        myTurn: false
    }
}

function choose(X) {
    commitGameState({ choose: X })
}

function hello() {
    fetch(API_URL).then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status)
        }
        return response.text() 
        }).then(data => {
        if (data == "CHOOSE") {
            $("#init").style.display = "block"
        }
        else {
            myPlayer = data
        }
        renderGame()
    }).catch(err => {
        console.error(err)
        setTimeout( () => alert("Nie udało się połączyć z serwerem"), 30)
    })
}

function renderGame() {
    const game = gameState.game

    if (game.winner) {
        $("#game h1").innerHTML = `Winner: ${game.winner}`
        $("#game").style.display = "none"
    } else {
        $("#game h1").innerHTML = ""
    }

    $("$game h1").innerHTML = "Ty jesteś: " + myPlayer


    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = $("#cell-" + i + "-" + j)
            cell.innerHTML = game.board[i][j]
        }
    }

    if (game.myTurn) {
        $("#game").style.pointerEvents = "auto"
    } else {
        $("#game").style.pointerEvents = "none"
    }

    $("#game").style.display = "block"

}

function commitGameState(X) {
    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(X)
    }).then(response => response.json()).then(data => {
        gameState = data
        renderGame()
    })
}

setInterval(() => {
    if (myPlayer != "") {
        fetch(API_URL).then(response => response.json()).then(data => {
            gameState = data
            renderGame()
        })
    }

}, 100)
hello()