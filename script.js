$("#game").style.display = "none"
$("#init").style.display = "none"

const API_URL = "/api/game.php"
const INITIAL_URL = "/api/choose.php"
const STATUS_URL = "/api/game_state.php"

let myPlayer = ""
let gameState = {
    game: {
        board: [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ],
        winner: null,
        turn: false
    }
}

function choose(X) {
    fetch(INITIAL_URL + "?choice=" + X, {
        method: "GET",
        headers: {
            "Content-Type": "text/plain"
        }
    }).then(response => response.text()).then(data => {
        myPlayer = data
        renderGame()
    })
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
        setTimeout(() => alert("Nie udało się połączyć z serwerem"), 30)
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

    $("#game h1").innerHTML = "Ty jesteś: " + myPlayer


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

    if (myPlayer == "") {
        $("#game").style.display = "none"
        $("#init").style.display = "block"
    }
    else {
        $("#init").style.display = "none"
        $("#game").style.display = "block"
    }


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
setInterval(() => {
    if (myPlayer == "") {
        fetch(STATUS_URL).then(response => response.text()).then(data => {
            if (parseInt(data) > 0) {
                fetch(INITIAL_URL + "?choice=O").then(response => response.text()).then(data => {
                    if (myPlayer == "") {
                        myPlayer = data
                        renderGame()
                    }
                })
            }

        })
    }

}, 100)
hello()