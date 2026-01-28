import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import Button from "@/components/Button/index";

describe("Button", () => {
  it("renders the button with the provided text", () => {
    const handlePress = jest.fn();

    const { getByText } = render(
      <Button text="Click me" onPress={handlePress} />,
    );

    expect(getByText("Click me")).toBeTruthy();
  });

  it("calls onPress when the button is pressed", () => {
    const handlePress = jest.fn();

    const { getByText } = render(
      <Button text="Test Button" onPress={handlePress} />,
    );

    fireEvent.press(getByText("Test Button"));

    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it("calls onPress multiple times when pressed multiple times", () => {
    const handlePress = jest.fn();

    const { getByText } = render(
      <Button text="Multi Press" onPress={handlePress} />,
    );

    fireEvent.press(getByText("Multi Press"));
    fireEvent.press(getByText("Multi Press"));
    fireEvent.press(getByText("Multi Press"));

    expect(handlePress).toHaveBeenCalledTimes(3);
  });

  it("renders button with empty text", () => {
    const handlePress = jest.fn();

    const { getByText } = render(<Button text="" onPress={handlePress} />);

    expect(getByText("")).toBeTruthy();
  });
});
