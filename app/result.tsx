import { Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { PlayerEnum } from "@/util/board";
import { styles } from "@/styles/result.styles";
import Button from "@/components/Button";

const Result = () => {
  const router = useRouter();

  const { winner } = useLocalSearchParams<{ winner?: PlayerEnum }>();

  const isDraw: boolean = !winner;
  const isUserWin: boolean = winner === PlayerEnum.USER;

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.textBase,
          isDraw && styles.textDraw,
          !isDraw && (isUserWin ? styles.textWin : styles.textLoss),
        ]}
      >
        {isDraw
          ? "It's a draw"
          : `You ${isUserWin ? "won" : "lost"} this match!`}
      </Text>

      <Button text="Restart" onPress={() => router.back()} />
    </View>
  );
};

export default Result;
