import { Text, View } from "react-native";

import { PlayerEnum } from "@/util/board";
import Button from "@/components/Button";

import { styles } from "./styles";

interface PlayerSelectorInterface {
  handleNewGame: (player: PlayerEnum) => void;
}

const PlayerSelector = ({ handleNewGame }: PlayerSelectorInterface) => {
  const renderPlayerButton = (player: PlayerEnum) => {
    return (
      <Button
        text={player === PlayerEnum.USER ? "You" : "Computer"}
        onPress={() => handleNewGame(player)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Who starts?</Text>

      <View style={styles.buttons}>
        {renderPlayerButton(PlayerEnum.USER)}
        {renderPlayerButton(PlayerEnum.COMPUTER)}
      </View>
    </View>
  );
};

export default PlayerSelector;
