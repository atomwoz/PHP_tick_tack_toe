$("#game").style.display = "none"
$("#init").style.display = "none"

const API_URL = "/api/game.php"
const INITIAL_URL = "/api/choose.php"
const STATUS_URL = "/api/game_state.php"
const HELLO_URL = "/api/hello.php"
const WIN_URL = "/api/win.php"

let myPlayer = ""
let winner = ""
let gameState = {
    board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ],
    turn: false

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
    fetch(HELLO_URL).then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status)
        }
        return response.text()
    }).then(data => {
        renderGame()
    }).catch(err => {
        console.error(err)
        setTimeout(() => alert("Nie udało się połączyć z serwerem"), 30)
    })
}

function clickCell(i, j) {
    if (gameState.board[i][j] != "_") return
    if (gameState.turn != myPlayer) return
    commitGameState({ i: parseInt(i), j: parseInt(j) })
}

function showWin() {
    $("#end").style.display = "block"
    if (winner == "DRAW") {
        $("#end h1").innerHTML = "Remis"
    }
    else {
        $("#end h1").innerHTML = "Wygrał: " + winner
    }
}

function renderGame() {
    const game = gameState
    console.log(myPlayer, JSON.stringify(game, null, 5))

    if (winner) {
        $("#game h1").innerHTML = `Winner: ${winner}`
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

    if (game.turn == myPlayer) {
        //$("#game").style.pointerEvents = "auto"
        $("#game h2").innerHTML = "Twój ruch"
        $(".field").style.cursor = "pointer"
    } else {
        //$("#game").style.pointerEvents = "none"
        $("#game h2").innerHTML = "Ruch przeciwnika"
        $(".field").style.cursor = "not-allowed"
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
    console.log("commitGameState: ", X)
    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(X)
    }).then(response => response.json()).then(data => {
        gameState.game = data
        renderGame()
    })
}

setInterval(() => {
    if (myPlayer != "") {
        //Decode json from slashes to normal json ex. \" -> "
        fetch(API_URL).then(response => response.text()).then(data => {
            data = data.trim()
            if (data.startsWith("\"")) {
                data = data.substring(1, data.length - 1)
            }
            if (data.endsWith("\"")) {
                data = data.substring(0, data.length - 1)
            }
            if (!data.startsWith("{")) data = "{" + data
            if (!data.endsWith("}")) data += "}"

            data = data.replace(/\\/g, "")
            data = JSON.parse(data)
            gameState = data
            renderGame()
        })
    }

}, 1000)
setInterval(() => {
    if (myPlayer == "") {
        fetch(INITIAL_URL).then(response => response.text()).then(data => {
            if (data == "NO_CHOICE") return
            myPlayer = data
            renderGame()
        })
    }



}, 1000)
setInterval(() => {
    fetch(WIN_URL).then(response => response.text()).then(data => {
        if (data == "NO_WIN") {
            winner = ""
            return
        }
        if (data == "DRAW") {
            winner = "DRAW"
        }
        else {
            winner = data
        }
        showWin()


    })
}, 1000)
hello()
