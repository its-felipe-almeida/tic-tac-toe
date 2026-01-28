import { useFocusEffect } from "@react-navigation/native";
import { View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "expo-router";

import { styles } from "@/styles/index.styles";
import Board from "@/components/Board";
import PlayerSelector from "@/components/PlayerSelector";
import {
  getWinner,
  PlayerEnum,
  PlayerType,
  isBoardFull,
  getComputerMove,
} from "@/util/board";

const Home = () => {
  const router = useRouter();

  const [board, setBoard] = useState<PlayerType[]>(
    Array(9).fill(PlayerEnum.NONE),
  );
  const [startingPlayer, setStartingPlayer] = useState<PlayerEnum>(
    PlayerEnum.NONE,
  );

  const winner: PlayerEnum = getWinner(board);
  const isBoardFullFlag: boolean = isBoardFull(board);

  const startNewGame = (firstPlayer: PlayerEnum) => {
    let newBoard: PlayerType[] = Array(9).fill(PlayerEnum.NONE);

    if (firstPlayer === PlayerEnum.COMPUTER) {
      const computerMoveIndex: number | null = getComputerMove(newBoard);
      if (computerMoveIndex !== null) {
        newBoard[computerMoveIndex] = PlayerEnum.COMPUTER;
      }
    }

    setBoard(newBoard);
  };

  const handlePress = (index: number) => {
    // skip function either if starting player is none, or the square is already occupied, or there is a winner
    if (
      startingPlayer === PlayerEnum.NONE ||
      board[index] !== PlayerEnum.NONE ||
      getWinner(board)
    )
      return;

    const newBoard: PlayerType[] = [...board];
    newBoard[index] = PlayerEnum.USER;

    // skip computer move either if the player has won or the board is full
    if (getWinner(newBoard) !== PlayerEnum.NONE || isBoardFullFlag) {
      setBoard(newBoard);
      return;
    }

    const computerMoveIndex: number | null = getComputerMove(newBoard);
    if (computerMoveIndex !== null) {
      newBoard[computerMoveIndex] = PlayerEnum.COMPUTER;
    }

    setBoard(newBoard);
  };

  const handleNewGame = (player: PlayerEnum) => {
    setStartingPlayer(player);
    startNewGame(player);
  };

  useFocusEffect(
    useCallback(() => {
      handleNewGame(PlayerEnum.NONE);
    }, []),
  );

  useEffect(() => {
    if (winner !== PlayerEnum.NONE || isBoardFullFlag) {
      router.push({
        pathname: "/result",
        params: { winner: winner },
      });
    }
  }, [router, winner, isBoardFullFlag]);

  return (
    <View style={styles.container}>
      {startingPlayer === PlayerEnum.NONE ? (
        <PlayerSelector handleNewGame={handleNewGame} />
      ) : (
        <Board board={board} handlePress={handlePress} />
      )}
    </View>
  );
};

export default Home;
