const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessage = document.querySelector("[data-winning-message]");
const winningTextElement = document.querySelector("[data-winning-text]");
const buttonRestart = document.querySelector("[data-restart]");

let isCircle = true;

const possiblesWinner = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const startGame = () => {
  winningMessage.classList.remove("show-winning-message");
  changePlayer();
  for (const cell of cellElements) {
    cell.classList.remove("x");
    cell.classList.remove("circle");
    cell.addEventListener("click", handleClick, { once: true });
  }
};
const checkPossibleWinner = (classToAdd) => {
  return possiblesWinner.some((item) => {
    return item.every((index) => {
      return cellElements[index].classList.contains(classToAdd);
    });
  });
};
const changePlayer = () => {
  board.classList.remove("x");
  board.classList.remove("circle");
  isCircle = !isCircle;
  board.classList.add(isCircle ? "circle" : "x");
};
const endGame = (isDraw) => {
  if (isDraw) {
    winningTextElement.innerText = "Empate!!";
  } else {
    winningTextElement.innerText = isCircle ? "X Venceu!!" : "O Venceu!!";
  }
  winningMessage.classList.add("show-winning-message");
};
const checkPossibleDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const handleClick = (e) => {
  //marcar a celula com X ou O
  const cell = e.target;
  const classToAdd = isCircle ? "circle" : "x";
  cell.classList.add(classToAdd);
  //trocar jogador
  changePlayer();
  //verificar vitoria
  const isWin = checkPossibleWinner(classToAdd);
  if (isWin) {
    endGame(false);
  }
  //verificar empate
  const isDraw = checkPossibleDraw();

  if (isDraw) {
    endGame(true);
  }
};
startGame();
buttonRestart.addEventListener("click", () => startGame());
