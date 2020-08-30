import { DocMeta } from "./db";

export enum GameMode {
  BLACKJACK = 'Blackjack',
  BIG2 = 'Big2',
  POKER = 'Poker'
}
export type Game = {
  created: Date;
  gameMode: GameMode,
}

export type GameDoc = Game & DocMeta;