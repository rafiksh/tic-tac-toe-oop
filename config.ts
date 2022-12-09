import { PromptObject } from "prompts";

const GAME_COMFIG = { MIN: 3, MAX: 10 };

const INITIAL_QUESTIONS: PromptObject[] = [
  {
    type: "text",
    name: "name",
    message: "What is your name?",
  },
  {
    type: "text",
    name: "symbol",
    message: "X/O? X will always start the game.",
    validate: (symbol: string) =>
      !["X", "O"].includes(symbol.toUpperCase())
        ? `Only X or O are allowed!`
        : true,
    format: (symbol: string) => symbol.toUpperCase(),
  },
  {
    type: "number",
    name: "size",
    message: `What do you wnat the size of the board to be?\nSize is between ${GAME_COMFIG.MIN} and ${GAME_COMFIG.MAX}`,
    validate: (size: string) =>
      Number(size) < GAME_COMFIG.MIN || Number(size) > GAME_COMFIG.MAX
        ? `Size is between ${GAME_COMFIG.MIN} and ${GAME_COMFIG.MAX}`
        : true,
  },
];

export { GAME_COMFIG, INITIAL_QUESTIONS };
