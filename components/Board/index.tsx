import { Text, View, TouchableOpacity } from "react-native";

import { PlayerType } from "@/util/board";

import { styles } from "./styles";

interface BoardInterface {
  board: PlayerType[];
  handlePress: (index: number) => void;
}

const Board = ({ board, handlePress }: BoardInterface) => {
  return (
    <View style={styles.board}>
      {Array.from({ length: 9 }, (_, index) => (
        <TouchableOpacity
          key={index}
          testID="cell"
          style={styles.cell}
          onPress={() => handlePress(index)}
        >
          <Text style={styles.cellText}>{board[index]}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Board;
