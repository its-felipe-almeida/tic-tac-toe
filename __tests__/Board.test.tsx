import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import Board from "@/components/Board/index";
import { PlayerEnum, PlayerType } from "@/util/board";

describe("Board", () => {
  it("renders all 9 cells", () => {
    const board: PlayerType[] = Array(9).fill(PlayerEnum.NONE);
    const handlePress = jest.fn();

    const { getAllByTestId } = render(
      <Board board={board} handlePress={handlePress} />,
    );

    const cells = getAllByTestId("cell");
    expect(cells).toHaveLength(9);
  });

  it("displays empty cells correctly", () => {
    const board: PlayerType[] = Array(9).fill(PlayerEnum.NONE);
    const handlePress = jest.fn();

    const { getAllByTestId, getAllByText } = render(
      <Board board={board} handlePress={handlePress} />,
    );

    const cells = getAllByTestId("cell");
    expect(cells).toHaveLength(9);

    // Check that empty cells display empty string
    const emptyTexts = getAllByText("");
    expect(emptyTexts.length).toBeGreaterThanOrEqual(9);
  });

  it("displays X and O values correctly", () => {
    const board: PlayerType[] = [
      PlayerEnum.USER,
      PlayerEnum.COMPUTER,
      PlayerEnum.NONE,
      PlayerEnum.COMPUTER,
      PlayerEnum.USER,
      PlayerEnum.NONE,
      PlayerEnum.NONE,
      PlayerEnum.NONE,
      PlayerEnum.USER,
    ];
    const handlePress = jest.fn();

    const { getAllByText } = render(
      <Board board={board} handlePress={handlePress} />,
    );

    const userCells = getAllByText(PlayerEnum.USER);
    const computerCells = getAllByText(PlayerEnum.COMPUTER);

    expect(userCells.length).toBe(3);
    expect(computerCells.length).toBe(2);
  });

  it("calls handlePress with correct index when a cell is pressed", () => {
    const board: PlayerType[] = Array(9).fill(PlayerEnum.NONE);
    const handlePress = jest.fn();

    const { getAllByTestId } = render(
      <Board board={board} handlePress={handlePress} />,
    );

    const cells = getAllByTestId("cell");
    fireEvent.press(cells[0]);

    expect(handlePress).toHaveBeenCalledTimes(1);
    expect(handlePress).toHaveBeenCalledWith(0);
  });

  it("calls handlePress with correct index for different cells", () => {
    const board: PlayerType[] = Array(9).fill(PlayerEnum.NONE);
    const handlePress = jest.fn();

    const { getAllByTestId } = render(
      <Board board={board} handlePress={handlePress} />,
    );

    const cells = getAllByTestId("cell");

    fireEvent.press(cells[4]);
    expect(handlePress).toHaveBeenCalledWith(4);

    fireEvent.press(cells[7]);
    expect(handlePress).toHaveBeenCalledWith(7);

    expect(handlePress).toHaveBeenCalledTimes(2);
  });

  it("handles multiple presses on the same cell", () => {
    const board: PlayerType[] = Array(9).fill(PlayerEnum.NONE);
    const handlePress = jest.fn();

    const { getAllByTestId } = render(
      <Board board={board} handlePress={handlePress} />,
    );

    const cells = getAllByTestId("cell");
    fireEvent.press(cells[2]);
    fireEvent.press(cells[2]);
    fireEvent.press(cells[2]);

    expect(handlePress).toHaveBeenCalledTimes(3);
    expect(handlePress).toHaveBeenCalledWith(2);
  });

  it("displays board state correctly with mixed values", () => {
    const board: PlayerType[] = [
      PlayerEnum.USER,
      PlayerEnum.COMPUTER,
      PlayerEnum.USER,
      PlayerEnum.COMPUTER,
      PlayerEnum.USER,
      PlayerEnum.COMPUTER,
      PlayerEnum.NONE,
      PlayerEnum.NONE,
      PlayerEnum.NONE,
    ];
    const handlePress = jest.fn();

    const { getAllByText } = render(
      <Board board={board} handlePress={handlePress} />,
    );

    const userCells = getAllByText(PlayerEnum.USER);
    const computerCells = getAllByText(PlayerEnum.COMPUTER);
    const emptyCells = getAllByText(PlayerEnum.NONE);

    expect(userCells.length).toBe(3);
    expect(computerCells.length).toBe(3);
    expect(emptyCells.length).toBe(3);
  });

  it("calls handlePress for cells with existing values", () => {
    const board: PlayerType[] = [
      PlayerEnum.USER,
      PlayerEnum.COMPUTER,
      PlayerEnum.NONE,
      PlayerEnum.NONE,
      PlayerEnum.NONE,
      PlayerEnum.NONE,
      PlayerEnum.NONE,
      PlayerEnum.NONE,
      PlayerEnum.NONE,
    ];
    const handlePress = jest.fn();

    const { getAllByTestId } = render(
      <Board board={board} handlePress={handlePress} />,
    );

    const cells = getAllByTestId("cell");

    // Press a cell with X
    fireEvent.press(cells[0]);
    expect(handlePress).toHaveBeenCalledWith(0);

    // Press a cell with O
    fireEvent.press(cells[1]);
    expect(handlePress).toHaveBeenCalledWith(1);

    // Press an empty cell
    fireEvent.press(cells[2]);
    expect(handlePress).toHaveBeenCalledWith(2);

    expect(handlePress).toHaveBeenCalledTimes(3);
  });
});
