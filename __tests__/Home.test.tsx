import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import {
  PlayerEnum,
  getWinner,
  isBoardFull,
  getComputerMove,
} from "@/util/board";
import Home from "@/app/index";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("@react-navigation/native", () => ({
  useFocusEffect: jest.fn(),
}));

jest.mock("@/util/board", () => {
  const actual = jest.requireActual("@/util/board");

  return {
    ...actual,
    getWinner: jest.fn(actual.getWinner),
    isBoardFull: jest.fn(actual.isBoardFull),
    getComputerMove: jest.fn(actual.getComputerMove),
  };
});

describe("Home", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders PlayerSelector when starting player is NONE", () => {
    const { getByText, queryAllByTestId } = render(<Home />);

    expect(getByText("Who starts?")).toBeTruthy();
    expect(getByText("You")).toBeTruthy();
    expect(getByText("Computer")).toBeTruthy();
    expect(queryAllByTestId("cell")).toHaveLength(0);
  });

  it("starts a new game with USER and renders the board", () => {
    const { getByText, getAllByTestId, queryByText } = render(<Home />);

    fireEvent.press(getByText("You"));

    expect(queryByText("Who starts?")).toBeNull();
    const cells = getAllByTestId("cell");
    expect(cells).toHaveLength(9);
  });

  it("starts a new game with COMPUTER and makes the first move", () => {
    (getComputerMove as jest.Mock).mockReturnValue(4);

    const { getByText, getAllByText } = render(<Home />);

    fireEvent.press(getByText("Computer"));

    const computerCells = getAllByText(PlayerEnum.COMPUTER);
    expect(computerCells.length).toBe(1);
  });

  it("handles user move and then computer move when game continues", () => {
    (getComputerMove as jest.Mock).mockReturnValue(1);

    const { getByText, getAllByTestId, getAllByText } = render(<Home />);

    fireEvent.press(getByText("You"));

    const cells = getAllByTestId("cell");
    fireEvent.press(cells[0]);

    const userCells = getAllByText(PlayerEnum.USER);
    const computerCells = getAllByText(PlayerEnum.COMPUTER);

    expect(userCells.length).toBe(1);
    expect(computerCells.length).toBe(1);
  });

  it("does not allow moves on an occupied cell", () => {
    (getComputerMove as jest.Mock).mockReturnValue(1);

    const { getByText, getAllByTestId, getAllByText } = render(<Home />);

    fireEvent.press(getByText("You"));

    const cells = getAllByTestId("cell");
    fireEvent.press(cells[0]);
    fireEvent.press(cells[0]);

    const userCells = getAllByText(PlayerEnum.USER);
    expect(userCells.length).toBe(1);
  });

  it("navigates to result screen when there is a winner", () => {
    (getWinner as jest.Mock).mockReturnValue(PlayerEnum.COMPUTER);
    (isBoardFull as jest.Mock).mockReturnValue(false);

    render(<Home />);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/result",
      params: { winner: PlayerEnum.COMPUTER },
    });
  });
});
