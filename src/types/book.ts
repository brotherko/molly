import { RxDocument } from "rxdb";
import { Player, PlayerDoc } from "./player";

export enum BookMode {
  BLACKJACK = 'blackjack',
  BIG2 = 'big2'
}

export type BookRecord = {
  playerId: string;
  score: number;
}

export type BookRecordRow = { 
  createdAt?: string;
  records: BookRecord[]
};

export interface Book {
  id?: string;
  playerIds: string[];
  records?: BookRecordRow[];
  bookMode: BookMode;
  createdAt?: string;
}

export type BookRxDoc = RxDocument<Required<Book>>

export type BookDoc = Required<Book> & {
  ref: BookRxDoc,
}

export type BookFullDoc = BookDoc & {
  players: PlayerDoc[];
}



export type BookSummary = {
  playerId: string;
  totalScore?: number;
  totalPnl?: number;
}[]