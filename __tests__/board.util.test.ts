import {
  PlayerEnum,
  PlayerType,
  getWinner,
  isBoardFull,
  getComputerMove,
} from "@/util/board";

describe("board utilities", () => {
  describe("getWinner", () => {
    it("returns NONE for an empty board", () => {
      const board: PlayerType[] = Array(9).fill(PlayerEnum.NONE);
      expect(getWinner(board)).toBe(PlayerEnum.NONE);
    });

    const createBoardWithWin = (
      indices: number[],
      player: PlayerEnum,
    ): PlayerType[] => {
      const board: PlayerType[] = Array(9).fill(PlayerEnum.NONE);
      indices.forEach((i) => {
        board[i] = player;
      });
      return board;
    };

    const horizontalCombos: [string, number[]][] = [
      ["top row", [0, 1, 2]],
      ["middle row", [3, 4, 5]],
      ["bottom row", [6, 7, 8]],
    ];

    const verticalCombos: [string, number[]][] = [
      ["left column", [0, 3, 6]],
      ["middle column", [1, 4, 7]],
      ["right column", [2, 5, 8]],
    ];

    const diagonalCombos: [string, number[]][] = [
      ["main diagonal", [0, 4, 8]],
      ["anti-diagonal", [2, 4, 6]],
    ];

    [PlayerEnum.USER, PlayerEnum.COMPUTER].forEach((player) => {
      describe(`wins for player ${player}`, () => {
        it.each(horizontalCombos)(
          "detects %s horizontal win",
          (_name, indices) => {
            const board = createBoardWithWin(indices, player);
            expect(getWinner(board)).toBe(player);
          },
        );

        it.each(verticalCombos)("detects %s vertical win", (_name, indices) => {
          const board = createBoardWithWin(indices, player);
          expect(getWinner(board)).toBe(player);
        });

        it.each(diagonalCombos)("detects %s diagonal win", (_name, indices) => {
          const board = createBoardWithWin(indices, player);
          expect(getWinner(board)).toBe(player);
        });
      });
    });

    it("does not report a win for almost-complete lines", () => {
      const boards: PlayerType[][] = [
        // Horizontal almost-wins
        [
          PlayerEnum.USER,
          PlayerEnum.USER,
          PlayerEnum.NONE,
          PlayerEnum.NONE,
          PlayerEnum.NONE,
          PlayerEnum.NONE,
          PlayerEnum.NONE,
          PlayerEnum.NONE,
          PlayerEnum.NONE,
        ],
        [
          PlayerEnum.NONE,
          PlayerEnum.NONE,
          PlayerEnum.NONE,
          PlayerEnum.USER,
          PlayerEnum.USER,
          PlayerEnum.NONE,
          PlayerEnum.NONE,
          PlayerEnum.NONE,
          PlayerEnum.NONE,
        ],
        // Vertical almost-wins
        [
          PlayerEnum.USER,
          PlayerEnum.NONE,
          PlayerEnum.NONE,
          PlayerEnum.USER,
          PlayerEnum.NONE,
          PlayerEnum.NONE,
          PlayerEnum.NONE,
          PlayerEnum.NONE,
          PlayerEnum.NONE,
        ],
        [
          PlayerEnum.NONE,
          PlayerEnum.NONE,
          PlayerEnum.NONE,
          PlayerEnum.USER,
          PlayerEnum.NONE,
          PlayerEnum.NONE,
          PlayerEnum.USER,
          PlayerEnum.NONE,
          PlayerEnum.NONE,
        ],
        // Diagonal almost-wins
        [
          PlayerEnum.USER,
          PlayerEnum.NONE,
          PlayerEnum.NONE,
          PlayerEnum.NONE,
          PlayerEnum.USER,
          PlayerEnum.NONE,
          PlayerEnum.NONE,
          PlayerEnum.NONE,
          PlayerEnum.NONE,
        ],
        [
          PlayerEnum.NONE,
          PlayerEnum.NONE,
          PlayerEnum.USER,
          PlayerEnum.NONE,
          PlayerEnum.USER,
          PlayerEnum.NONE,
          PlayerEnum.NONE,
          PlayerEnum.NONE,
          PlayerEnum.NONE,
        ],
      ];

      boards.forEach((board) => {
        expect(getWinner(board)).toBe(PlayerEnum.NONE);
      });
    });

    it("returns NONE when there is no winner", () => {
      const board: PlayerType[] = [
        PlayerEnum.USER,
        PlayerEnum.COMPUTER,
        PlayerEnum.USER,
        PlayerEnum.USER,
        PlayerEnum.COMPUTER,
        PlayerEnum.COMPUTER,
        PlayerEnum.COMPUTER,
        PlayerEnum.USER,
        PlayerEnum.USER,
      ];
      expect(getWinner(board)).toBe(PlayerEnum.NONE);
    });
  });

  describe("isBoardFull", () => {
    it("returns false for an empty board", () => {
      const board: PlayerType[] = Array(9).fill(PlayerEnum.NONE);
      expect(isBoardFull(board)).toBe(false);
    });

    it("returns false when at least one cell is empty", () => {
      const board: PlayerType[] = [
        PlayerEnum.USER,
        PlayerEnum.COMPUTER,
        PlayerEnum.USER,
        PlayerEnum.COMPUTER,
        PlayerEnum.USER,
        PlayerEnum.NONE,
        PlayerEnum.COMPUTER,
        PlayerEnum.USER,
        PlayerEnum.COMPUTER,
      ];
      expect(isBoardFull(board)).toBe(false);
    });

    it("returns true when all cells are filled", () => {
      const board: PlayerType[] = [
        PlayerEnum.USER,
        PlayerEnum.COMPUTER,
        PlayerEnum.USER,
        PlayerEnum.COMPUTER,
        PlayerEnum.USER,
        PlayerEnum.COMPUTER,
        PlayerEnum.COMPUTER,
        PlayerEnum.USER,
        PlayerEnum.COMPUTER,
      ];
      expect(isBoardFull(board)).toBe(true);
    });
  });

  describe("getComputerMove", () => {
    it("returns null when there is already a winner", () => {
      const board: PlayerType[] = [
        PlayerEnum.USER,
        PlayerEnum.USER,
        PlayerEnum.USER,
        PlayerEnum.NONE,
        PlayerEnum.NONE,
        PlayerEnum.NONE,
        PlayerEnum.NONE,
        PlayerEnum.NONE,
        PlayerEnum.NONE,
      ];
      expect(getComputerMove(board)).toBeNull();
    });

    it("returns null when the board is full", () => {
      const board: PlayerType[] = [
        PlayerEnum.USER,
        PlayerEnum.COMPUTER,
        PlayerEnum.USER,
        PlayerEnum.COMPUTER,
        PlayerEnum.USER,
        PlayerEnum.COMPUTER,
        PlayerEnum.COMPUTER,
        PlayerEnum.USER,
        PlayerEnum.COMPUTER,
      ];
      expect(getComputerMove(board)).toBeNull();
    });

    it("returns a valid index for an empty board", () => {
      const board: PlayerType[] = Array(9).fill(PlayerEnum.NONE);
      const move = getComputerMove(board);

      expect(move).not.toBeNull();
      if (move !== null) {
        expect(move).toBeGreaterThanOrEqual(0);
        expect(move).toBeLessThan(9);
      }
    });

    it("chooses a move that does not overwrite existing cells", () => {
      const board: PlayerType[] = [
        PlayerEnum.USER,
        PlayerEnum.NONE,
        PlayerEnum.NONE,
        PlayerEnum.NONE,
        PlayerEnum.COMPUTER,
        PlayerEnum.NONE,
        PlayerEnum.NONE,
        PlayerEnum.NONE,
        PlayerEnum.NONE,
      ];

      const move = getComputerMove(board);

      expect(move).not.toBeNull();
      if (move !== null) {
        expect(board[move]).toBe(PlayerEnum.NONE);
      }
    });
  });
});
