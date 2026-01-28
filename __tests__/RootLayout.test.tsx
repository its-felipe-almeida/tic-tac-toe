import React from "react";
import { render } from "@testing-library/react-native";

import RootLayout from "@/app/_layout";

const screens: any[] = [];

jest.mock("expo-router", () => {
  const Screen = (props: any) => {
    screens.push(props);
    return null;
  };

  const Stack: any = ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  );

  Stack.Screen = Screen;

  return {
    __esModule: true,
    Stack,
  };
});

describe("RootLayout", () => {
  beforeEach(() => {
    screens.length = 0;
  });

  it("renders a Stack navigator with index and result screens", () => {
    render(<RootLayout />);

    expect(screens).toHaveLength(2);

    const [indexScreen, resultScreen] = screens;

    expect(indexScreen.name).toBe("index");
    expect(indexScreen.options).toMatchObject({ title: "Tic Tac Toe" });

    expect(resultScreen.name).toBe("result");
    expect(resultScreen.options).toMatchObject({
      presentation: "modal",
      headerShown: false,
    });
  });
});
