# Tic Tac Toe (Expo + Expo Router)

A simple Tic Tac Toe game built with **Expo** and **React Native**, using **Expo Router** for navigation and **Jest** for unit/component tests.

## Features

- **Play vs Computer**: You are **X**, the computer is **O**
- **Choose who starts**: You or the computer
- **Game end modal**: Shows **win / loss / draw** and lets you restart
- **Computer AI**: Uses a minimax-style evaluation to choose the best move
- **Test suite**: Board utilities + UI components

## Tech Stack

- **Expo** (`expo`)
- **React Native** (`react-native`)
- **Expo Router** (`expo-router`)
- **Testing**: `jest`, `jest-expo`, `@testing-library/react-native`
- **Language**: TypeScript

## Code Quality

This project is configured with **ESLint** and **Prettier** to keep the codebase consistent and easy to maintain.

- **Linting** (ESLint):

```bash
npm run lint
```

- **Formatting** (Prettier):

Check formatting:

```bash
npx prettier . --check
```

Auto-format:

```bash
npx prettier . --write
```

## Tools Used

- **IDE**: Cursor
- **Icon generation**: ChatGPT

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- An iOS Simulator (Xcode) and/or Android Emulator (Android Studio), or a physical device with **Expo Go**

### Install

```bash
npm install
```

## Running the App

From the project root:

```bash
npm run start
```

Then choose a platform:

- **Android**:

```bash
npm run android
```

- **iOS**:

```bash
npm run ios
```

## How to Play

1. On the home screen, pick **Who starts?**
   - **You** (X) or **Computer** (O)
2. Tap a square to place your **X**
3. The computer responds immediately with an **O**
4. When there is a winner or the board is full, the app navigates to the **Result** screen (presented as a modal).

## Game Rules / Logic

### Board representation

- The board is a flat array of 9 cells (`PlayerType[]`), indexed left-to-right, top-to-bottom:

```
0 | 1 | 2
3 | 4 | 5
6 | 7 | 8
```

- Players:
  - `PlayerEnum.USER` = `"X"`
  - `PlayerEnum.COMPUTER` = `"O"`
  - `PlayerEnum.NONE` = `""`

### Winner detection

`util/board.ts` defines `winningCombos` and checks all lines in `getWinner(board)`.

### Computer move selection

`getComputerMove(board)`:

- Returns `null` if the game is already over (winner exists or board is full)
- Otherwise evaluates all available moves using a recursive scoring function:
  - **computer win** → `+1`
  - **user win** → `-1`
  - **draw** → `0`

## Project Structure

```
app/
  _layout.tsx        # Expo Router Stack config
  index.tsx          # Home screen (board + player selection)
  result.tsx         # Result modal screen

components/
  Board/             # Renders the 3x3 grid
  Button/            # Reusable button component
  PlayerSelector/    # "Who starts?" UI

styles/
  colors.ts           
  index.styles.ts
  result.styles.ts

util/
  board.ts           # Winner detection + board helpers + computer move logic

__tests__/
  *.test.ts(x)       # Jest tests (utilities + UI)
```

## Testing

Run tests in watch mode (default configured script):

```bash
npm test
```

Notes:

- The Jest preset is `jest-expo`.
- Coverage collection is enabled in `package.json`. After running tests you’ll see output under `coverage/`.

If you want a single non-watch run (useful for CI), you can run Jest directly:

```bash
npx jest
```

## Routing / Navigation

This project uses **Expo Router**:

- `app/index.tsx` is the home route (`/`)
- `app/result.tsx` is the result route (`/result`)
- `app/_layout.tsx` configures a `Stack` where `result` is presented as a **modal** and hides the header.

## Absolute Imports

TypeScript is configured with a path alias so you can import from the project root:

- `@/*` → `./*`

Example:

- `import { getWinner } from "@/util/board";`

## Styling / Colors

Color are centralized in `styles/colors.ts` and should be reused across style files instead of hardcoding hex/rgba values.

Example:

```ts
import { colors } from "@/styles/colors";

// ...
color: colors.slate900
```

## Troubleshooting

- **Metro bundler issues**: stop the dev server and restart with `npm run start`.
- **iOS won’t launch**: ensure Xcode and the simulator are installed/selected correctly.
- **Android won’t launch**: ensure an emulator is running or a device is connected with USB debugging enabled.
