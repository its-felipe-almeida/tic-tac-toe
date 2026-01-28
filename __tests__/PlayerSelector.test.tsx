import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import PlayerSelector from "@/components/PlayerSelector/index";
import { PlayerEnum } from "@/util/board";

describe("PlayerSelector", () => {
  it("renders title and You and Computer buttons", () => {
    const handleNewGame = jest.fn();

    const { getByText } = render(
      <PlayerSelector handleNewGame={handleNewGame} />,
    );

    expect(getByText("Who starts?")).toBeTruthy();
    expect(getByText("You")).toBeTruthy();
    expect(getByText("Computer")).toBeTruthy();
  });

  it("calls handleNewGame with USER when 'You' is pressed", () => {
    const handleNewGame = jest.fn();

    const { getByText } = render(
      <PlayerSelector handleNewGame={handleNewGame} />,
    );

    fireEvent.press(getByText("You"));

    expect(handleNewGame).toHaveBeenCalledTimes(1);
    expect(handleNewGame).toHaveBeenCalledWith(PlayerEnum.USER);
  });

  it("calls handleNewGame with COMPUTER when 'Computer' is pressed", () => {
    const handleNewGame = jest.fn();

    const { getByText } = render(
      <PlayerSelector handleNewGame={handleNewGame} />,
    );

    fireEvent.press(getByText("Computer"));

    expect(handleNewGame).toHaveBeenCalledTimes(1);
    expect(handleNewGame).toHaveBeenCalledWith(PlayerEnum.COMPUTER);
  });
});
