let boxes = document.querySelectorAll(".box");
let restart = document.querySelector("#restart-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let hideGame = document.querySelector(".hide-game");

let turnO = true; //playerX, playerO
let checkDraw = 0;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 8],
  [0, 4, 8],
  [2, 4, 6],
  [2, 5, 8],
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  hideGame.style.display = "block";
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    checkDraw++;
    if (turnO) {
      //playerX
      box.innerHTML = "X";
      turnO = false;
    } else {
      //playerO
      box.innerHTML = "O";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const draw = () => {
  msg.innerText = "Its Drew";
  msgContainer.classList.remove("hide");
  hideGame.style.display = "none";
};

const showWinner = (winner) => {
  msg.innerText = `Congratulation, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  hideGame.style.display = "none";
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        checkDraw = 0;
        showWinner(pos1Val);
      } else {
        if (checkDraw === 9) {
          checkDraw = 0;
          draw();
        }
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
restart.addEventListener("click", resetGame);
