export const saveGameToStorage = ({ board, turn }) => {
  // guardar aca partida
  window.localStorage.setItem("board", JSON.stringify(board));
  window.localStorage.setItem("turn", turn);
};

export const resetGameFromStorage = () => {
  // resetea el local storage
  window.localStorage.removeItem("board");
  window.localStorage.removeItem("turn");
};
