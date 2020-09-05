import { RxDocument } from "rxdb";
import { Book } from "./book";

export interface Player {
  id?: string;
  name: string;
  createdAt?: string;
}

export type PlayerDoc = RxDocument<Required<Player>>