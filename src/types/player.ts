import { RxDocument } from "rxdb";
import { Book } from "./book";

export interface Player {
  id?: string;
  name: string;
  createdAt?: string;
}

export type PlayerRxdoc = RxDocument<Required<Player>>

export type PlayerDoc = Required<Player> & {
  ref: PlayerRxdoc;
}