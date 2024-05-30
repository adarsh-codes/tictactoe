import {React,useState} from 'react'

const Gameboard = () => {
    const [board, setBoard] = useState(Array(9).fill(null)); // array of size 9 to represent the board
    const [isXNext, setIsXNext] = useState(true); // indicates whether X is next move
    const [winner, setWinner] = useState(null); // indicates the winner if any at the moment
    

    // Function to create the gameboard by rendering squares as buttons
    const rendersquare = (index)=>(
        <button
        className="w-20 h-20 bg-blue-500 text-white text-2xl font-bold flex items-center justify-center"
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );

    const handleClick = (index) => {
        const newBoard = [...board];
        if (winner || newBoard[index]) {
          return;
        }

        newBoard[index] = isXNext? 'X' : 'O';

        setWinner(calculateWinner(newBoard));
        setBoard(newBoard);
        setIsXNext(!isXNext);
      };
      const calculateWinner = (board) => {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let line of lines) {
          const [a, b, c] = line;
          if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
          }
        }
        return null;
      };
      const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
      };
  return (
    <div className="w-screen h-screen bg-black flex flex-col justify-center items-center">
      <h1 className="text-white text-4xl mb-4">Tic Tac Toe</h1>
      <div className="grid grid-cols-3 gap-2">
        {board.map((_, index) => rendersquare(index))}
      </div>
      {winner && (
        <div className="text-white text-2xl mt-4">
          Winner: {winner}
        </div>
      )}
      <button
        className="mt-4 p-2 bg-green-500 text-white rounded"
        onClick={resetGame}
      >
        Restart Game
      </button>
    </div>
  )
}

export default Gameboard
