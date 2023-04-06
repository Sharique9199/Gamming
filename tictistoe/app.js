const boxs = document.querySelectorAll(".box");
const statusTxt = document.getElementById("status")
const btnRestart = document.getElementById("resetBtn")
let x = "<img src='../image/x.png' height='75px'>"
let o = "<img src='../image/o.png' height='90px'>"
const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

let options = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = x;
let player = "X";
let running = false;

initial()

function initial() {
    boxs.forEach(box => box.addEventListener('click', boxClick))

    running = true;

    btnRestart.addEventListener('click', restartGame);

    statusTxt.textContent = `${player} Your Turn`;


}

function boxClick() {
    const index = this.dataset.index; 
     if (options[index] != "" || !running) {
         return;
     }
     updateBox(this, index);
     checkWinner();
}

function updateBox(box, index) {
    options[index] = player;
    box.innerHTML = currentPlayer;

}


function changePlayer() {
    player = (player == "X") ? "O" : "X"
    currentPlayer = (currentPlayer == x) ? o : x;
    statusTxt.textContent = `${player} Your Turn`;
}

function checkWinner() {
    let isWon = false

    for (let i = 0; i < win.length; i++) {
        const condition = win[i];
        let box1 = options[condition[0]]
        let box2 = options[condition[1]]
        let box3 = options[condition[2]]
        if (box1 == "" || box2 == "" || box3 == "") {
            continue;
        }
        if (box1 == box2 && box2 == box3) {
            isWon = true;

         boxs[condition[0]].classList.add('win')
         boxs[condition[1]].classList.add('win')
         boxs[condition[2]].classList.add('win')
        }
    }
    if (isWon) {
        statusTxt.textContent = `${player} Won`
        running = false
    }
    else if (!options.includes("")) {
        statusTxt.textContent = `Game draw`
    }
    else {
        changePlayer();
    }
}

function restartGame() {

 options = ["", "", "", "", "", "", "", "", ""];

 currentPlayer = x;
 player = "X";
 running = true;
 statusTxt.textContent = `${player} Your Turn`;
 boxs.forEach(box=>{
    box.innerHTML="";
    box.classList.remove('win');
 })

}
