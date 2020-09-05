import { RxDocument } from "rxdb";

export enum BookMode {
  BLACKJACK = 'blackjack',
  BIG2 = 'big2'
}
export interface Book {
  id?: string;
  players: string[];
  bookMode: BookMode;
  createdAt?: string;
}

export type BookDoc = RxDocument<Required<Book>>