import { WINNER_COMBOS } from "../constants";

export const checkWinnerFrom = (boardToCheck) => {
  // recorre las combinaciones ganadoras y verifica si hay un ganador
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] && // si existe
      boardToCheck[a] === boardToCheck[b] && // si son iguales
      boardToCheck[a] === boardToCheck[c] // si son iguales
    ) {
      return boardToCheck[a]; // setea el ganador -> X u O
    }
  }
  return null; // no hay ganador
};

export const checkEndGame = (newBoard) => {
  // revisa si hay empate verificando si todos los cuadros estan llenos
  return newBoard.every((square) => square !== null);
};
