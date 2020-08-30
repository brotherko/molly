import { DocMeta } from "./db";
import { Player } from "./player";

export enum BookMode {
  BLACKJACK = 'Blackjack',
  BIG2 = 'Big2',
  POKER = 'Poker'
}

type BookRecord = BookRecordEntity[]

type BookRecordEntity = {
  playerId: string;
  score: number;
}

export type Book = {
  created: Date;
  bookMode: BookMode;
  playerIds?: string[];
  records?: BookRecord[];
}



export type BookDoc = Book & DocMeta;