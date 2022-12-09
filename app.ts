import prompts from "prompts";

import { INITIAL_QUESTIONS } from "./config";
import { Player } from "./src/player";
import { Game } from "./src/game";

const main = async () => {
  console.clear();
  console.log("Welcome to Tic Tac Toe");

  const { name, symbol, size } = await prompts(INITIAL_QUESTIONS);

  console.log(`Welcome ${name}`);

  const player = new Player(name, 2, symbol);

  const game = new Game(size, player);

  await game.play();
};

main();
