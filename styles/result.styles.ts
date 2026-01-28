import { StyleSheet } from "react-native";

import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textBase: {
    fontSize: 24,
    marginBottom: 28,
    fontWeight: "700",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  textDraw: {
    color: colors.gray500,
  },
  textWin: {
    color: colors.green600,
  },
  textLoss: {
    color: colors.red600,
  },
});
