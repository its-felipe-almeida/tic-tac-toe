import { StyleSheet } from "react-native";

import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  board: {
    height: "50%",
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 1,
    borderColor: colors.black,
  },
  cell: {
    width: "33.33%",
    height: "33.33%",
    borderWidth: 1,
    borderColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  cellText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
