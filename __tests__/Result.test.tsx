import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import Result from "@/app/result";
import { PlayerEnum } from "@/util/board";

const mockBack = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    back: mockBack,
  }),
  useLocalSearchParams: jest.fn(),
}));

describe("Result", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows draw message when there is no winner", () => {
    const { useLocalSearchParams } = jest.requireMock("expo-router") as {
      useLocalSearchParams: jest.Mock;
    };

    useLocalSearchParams.mockReturnValue({ winner: "" });

    const { getByText } = render(<Result />);

    expect(getByText("It's a draw")).toBeTruthy();
  });

  it("shows win message when USER is the winner", () => {
    const { useLocalSearchParams } = jest.requireMock("expo-router") as {
      useLocalSearchParams: jest.Mock;
    };

    useLocalSearchParams.mockReturnValue({ winner: PlayerEnum.USER });

    const { getByText } = render(<Result />);

    expect(getByText("You won this match!")).toBeTruthy();
  });

  it("shows loss message when COMPUTER is the winner", () => {
    const { useLocalSearchParams } = jest.requireMock("expo-router") as {
      useLocalSearchParams: jest.Mock;
    };

    useLocalSearchParams.mockReturnValue({ winner: PlayerEnum.COMPUTER });

    const { getByText } = render(<Result />);

    expect(getByText("You lost this match!")).toBeTruthy();
  });

  it("calls router.back when Restart button is pressed", () => {
    const { useLocalSearchParams } = jest.requireMock("expo-router") as {
      useLocalSearchParams: jest.Mock;
    };

    useLocalSearchParams.mockReturnValue({ winner: PlayerEnum.USER });

    const { getByText } = render(<Result />);

    fireEvent.press(getByText("Restart"));

    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
