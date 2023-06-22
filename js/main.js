const gameBoardElement = document.getElementById("board")
const board = document.querySelectorAll("[data-tile]")
const infoElement = document.getElementById("info")

// GLOBAL
let isPlaying = "cross"
infoElement.innerText = `Cross goes first.`
let winner = ""

function changePlayerTurn() {
    if (isPlaying == "cross") {
        isPlaying = "circle"
        
    } else {
        isPlaying = "cross"
    }
}

function changePlayerInfo() {
    infoElement.innerText = isPlaying == "circle" ? "It's Circle's turn." : "It's Cross' turn."
}

// adiciona cor de fundo destacada pra cada celula especificada do tabuleiro
function higlightCells(cell) {
    board[cell].style.backgroundColor = "lightgrey"
}

function resetGameBoard() {
    setTimeout(() => {
        const boardArray = [...board]     

        // pra cada celula do tabuleiro
        boardArray.forEach((cell) => {

            // enquanto houver um elemento filho na cell, remover
            while (cell.firstChild) {
                cell.removeChild(cell.firstChild)
            }

            winner = ""
            infoElement.innerText = `Cross goes first.`
            cell.style.backgroundColor = "white"
            
            // cross sempre começa a jogada
            isPlaying = "cross"
        })
        
    }, 1500);
}

function checkWin() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]        
    ]

    winningCombos.forEach((array) => {
        
        const circleWins = array.every((cell) => board[cell].firstChild?.classList.contains("circle"))
        const crossWins = array.every((cell) => board[cell].firstChild?.classList.contains("cross"))
        
        // combinaçõ atual que está sendo verificada
        // winnerCombo = array

        if (circleWins) {
            infoElement.innerText = "🎉 Circle Wins! 🎉"
            winner = "circle"

            array.forEach((cell) => { higlightCells(cell) })     
            resetGameBoard()

        } else if (crossWins) {
            infoElement.innerText = "🎉 Cross Wins! 🎉"
            winner = "cross"

            array.forEach((cell) => { higlightCells(cell) })
            resetGameBoard()
        }
    })
}

function checkTie() {
    const boardArray = [...board]

    // checar se todos as celulas tem um firstChild indicando que o board está completo
    const isBoardFull = boardArray.every((cell) => cell.firstChild)

    // se o board estiver cheio/completo e não houver vencedor, é um empate
    if (isBoardFull && winner == "") {
        infoElement.innerText = "Tie!!"
        resetGameBoard()
    }
}

function handleClick(e) {    
    
    // se nao houver vencedor, pode fazer o click/jogar
    if (winner == "") {
        const target = e.target
        const cellIsEmpty = target.hasAttribute("data-tile") && target.firstChild == null
        
        if (cellIsEmpty) {
            const div = document.createElement("div")
            target.appendChild(div)
            div.classList.add(isPlaying)
            div.dataset.fill = ""
        
            changePlayerTurn() 
            changePlayerInfo()
        
            checkWin()
            checkTie()
        }
    }
}

board.forEach((tile) => {
    tile.addEventListener("click", handleClick)
}) 

// window.location.reload()