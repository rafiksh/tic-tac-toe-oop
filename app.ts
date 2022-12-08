import prompts from "prompts";

import { GAME_COMFIG } from "./config";
import { Player } from "./src/player";
import { Game } from "./src/game";

const start = async () => {
  const { name, symbol, size } = await prompts([
    {
      type: "text",
      name: "name",
      message: "What is your name?",
    },
    {
      type: "text",
      name: "symbol",
      message: "X/O? X will always start the game.",
      validate: (symbol) =>
        !["X", "O"].includes(symbol.toUpperCase())
          ? `Only X or O are allowed!`
          : true,
      format: (symbol) => symbol.toUpperCase(),
    },
    {
      type: "number",
      name: "size",
      message: `What do you wnat the size of the board to be?\nSize is between ${GAME_COMFIG.MIN} and ${GAME_COMFIG.MAX}`,
      validate: (size) =>
        size < GAME_COMFIG.MIN || size > GAME_COMFIG.MAX
          ? `Size is between ${GAME_COMFIG.MIN} and ${GAME_COMFIG.MAX}`
          : true,
    },
  ]);

  console.log(`Welcome ${name}`);

  const player = new Player(name, 2, symbol);

  const game = new Game(size, player);

  await game.play();
};

const main = async () => {
  console.clear();
  console.log("Welcome to Tic Tac Toe");

  await start();
};

main();
