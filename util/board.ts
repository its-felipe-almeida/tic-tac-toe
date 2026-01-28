export enum PlayerEnum {
  USER = "X",
  COMPUTER = "O",
  NONE = "",
}

export type PlayerType =
  | PlayerEnum.USER
  | PlayerEnum.COMPUTER
  | PlayerEnum.NONE;

export const winningCombos: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const getWinner = (board: PlayerType[]): PlayerEnum => {
  for (const [a, b, c] of winningCombos) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return PlayerEnum.NONE;
};

export const isBoardFull = (board: PlayerType[]): boolean => {
  return board.every((cell) => cell !== PlayerEnum.NONE);
};

export const getComputerMove = (board: PlayerType[]): number | null => {
  const winner: PlayerEnum = getWinner(board);
  // skip function either if there is a winner or the board is full
  if (winner !== PlayerEnum.NONE || isBoardFull(board)) {
    return null;
  }

  const evaluateBestComputerMove = (
    board: PlayerType[],
    isComputerTurn: boolean,
  ): number => {
    const currentWinner: PlayerEnum = getWinner(board);
    if (currentWinner === PlayerEnum.COMPUTER) return 1;
    if (currentWinner === PlayerEnum.USER) return -1;
    if (isBoardFull(board)) return 0;

    if (isComputerTurn) {
      let bestScore = -Infinity;

      for (let i = 0; i < 9; i++) {
        if (board[i] === PlayerEnum.NONE) {
          board[i] = PlayerEnum.COMPUTER;
          const score = evaluateBestComputerMove(board, false);
          board[i] = PlayerEnum.NONE;
          bestScore = Math.max(bestScore, score);
        }
      }

      return bestScore;
    } else {
      let bestScore = Infinity;

      for (let i = 0; i < 9; i++) {
        if (board[i] === PlayerEnum.NONE) {
          board[i] = PlayerEnum.USER;
          const score: number = evaluateBestComputerMove(board, true);
          board[i] = PlayerEnum.NONE;
          bestScore = Math.min(bestScore, score);
        }
      }

      return bestScore;
    }
  };

  let bestMove: number | null = null;
  let bestScore = -Infinity;

  for (let i = 0; i < 9; i++) {
    if (board[i] === PlayerEnum.NONE) {
      const newBoard = [...board];
      newBoard[i] = PlayerEnum.COMPUTER;
      const score: number = evaluateBestComputerMove(newBoard, false);

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
};
