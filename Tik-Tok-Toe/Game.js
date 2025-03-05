let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let newbtn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-Container");
let msg = document.querySelector("#msg");

let turnO = true;
let moveHistory = { X: [], O: [] };
let faintedBox = { X: null, O: null };

const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    moveHistory = { X: [], O: [] };
    faintedBox = { X: null, O: null };
    enableBoxes();
    msgContainer.classList.add("hide");
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("faint");
    }
    moveHistory = { X: [], O: [] };
    faintedBox = { X: null, O: null };
};

const showWinner = (winner) => {
    msg.innerText = `Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        let currentPlayer = turnO ? "O" : "X";
        box.innerText = currentPlayer;
        box.disabled = true;
        moveHistory[currentPlayer].push(index);
        
        if (moveHistory[currentPlayer].length === 3) {
            if (faintedBox[currentPlayer] !== null) {
                boxes[faintedBox[currentPlayer]].classList.remove("faint"); // Restore previous fainted box
            }
            faintedBox[currentPlayer] = moveHistory[currentPlayer][0];
            boxes[faintedBox[currentPlayer]].classList.add("faint"); // Apply faint effect
        }

        if (moveHistory[currentPlayer].length >= 4) {
            let firstMove = moveHistory[currentPlayer].shift();
            boxes[firstMove].innerText = "";
            boxes[firstMove].disabled = false;
            boxes[firstMove].classList.remove("faint"); // Remove faint effect
            faintedBox[currentPlayer] = moveHistory[currentPlayer][0] || null; // Update fainted box reference
            if (faintedBox[currentPlayer] !== null) {
                boxes[faintedBox[currentPlayer]].classList.add("faint");
            }
        }
        
        checkWinner();
        turnO = !turnO;
    });
});

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return;
            }
        }
    }
};

newbtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
