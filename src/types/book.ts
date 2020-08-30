import { DocMeta } from "./db";

export enum BookMode {
  BLACKJACK = 'Blackjack',
  BIG2 = 'Big2',
  POKER = 'Poker'
}
export type Book = {
  created: Date;
  bookMode: BookMode,
}

export type BookDoc = Book & DocMeta;