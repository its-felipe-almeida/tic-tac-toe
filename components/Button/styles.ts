import { StyleSheet } from "react-native";

import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "700",
    letterSpacing: 0.5,
    color: colors.slate900,
  },
  buttons: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    backgroundColor: colors.blue600,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
