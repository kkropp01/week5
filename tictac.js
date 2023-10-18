const gameBoard = document.getElementById("board");
const spaces = [];
const winningCombos = [[0,1,2],[0,3,6],[0,4,8],[2,4,6],[3,4,5],[6,7,8],[1,4,7],[2,5,8]];
document.getElementById("turn-message").innerText = "It is X's turn";

for (let i = 1; i <= 9; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.onclick = () => makeMove(tile);
    spaces.push(tile);
    gameBoard.appendChild(tile);
}

let currentMove = "X";
let game_end = false; 

function makeMove(tile) {
    if (tile.innerText == "" && !game_end) {
        tile.innerText = currentMove;
        
        if (winCondition()) {
            document.getElementById("winMessage").innerText = currentMove + " wins!";
            game_end = true;
        } else if (drawCheck()) {
            document.getElementById("winMessage").innerText = "The game ends in a draw";
            game_end = true;
        } else {
            if(currentMove == "X") {
                currentMove = "O";
                document.getElementById("turn-message").innerText = "It is " + currentMove + "'s turn";
            } else {
                currentMove = "X";
                document.getElementById("turn-message").innerText = "It is " + currentMove + "'s turn";
            }
        }
    }
}

function winCondition() {
    for (const option of winningCombos) {
        const [x, y, z] = option;
        if (spaces[x].innerText && spaces[x].innerText == spaces[y].innerText && spaces[y].innerText == spaces[z].innerText) {
            document.getElementById("turn-message").innerText = "A winner has been decided";
            return true;
        }
    }
    return false;
}

function resetGame() {
    for (const tile of spaces) {
        tile.innerText = "";
    }
    document.getElementById("winMessage").innerText = "";
    document.getElementById("turn-message").innerText = "It is X's turn";
    currentMove = "X";
    game_end = false;
}

function drawCheck() {
    for (const tile of spaces) {
        if (tile.innerText === "") {
            return false;
        }
    }
    document.getElementById("turn-message").innerText = "Nobody can win!";
    return true;
}


