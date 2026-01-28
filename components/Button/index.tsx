import { Text, Pressable } from "react-native";

import { styles } from "./styles";

interface ButtonInterface {
  text: string;
  onPress: () => void;
}

const Button = ({ text, onPress }: ButtonInterface) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      onPress={() => onPress()}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

export default Button;
