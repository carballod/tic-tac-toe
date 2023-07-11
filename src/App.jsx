import { useState } from "react";

const TURNS = {
  X: "x",
  O: "o",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};


const WINNER_COMBOS = [
  // horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal
  [0, 4, 8],
  [2, 4, 6],
]


function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
    // recorre las combinaciones ganadoras y verifica si hay un ganador
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if(
        boardToCheck[a] // si existe
        && boardToCheck[a] === boardToCheck[b] // si son iguales
        && boardToCheck[a] === boardToCheck[c] // si son iguales
        ) {
        return boardToCheck[a]; // setea el ganador -> X u O
      }
    }
    return null; // no hay ganador
  }

  const updateBoard = (index) => {
    if(board[index] || winner) return;

    // actualiza el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // cambia el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn);

    // verifica si hay un ganador
    const newWinner = checkWinner(newBoard);
    if(newWinner) {
      setWinner(newWinner);
    }
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>

      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false ? "Empate" : "Gano:"
                }
              </h2>

              <header className="win">
                {
                  winner && <Square>{winner}</Square>
                }
              </header>

              <footer>
                <button>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  );
}

export default App;
