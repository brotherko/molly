import { DocMeta } from "./db";

export type Player = {
  name: string;
}

export type PlayerDoc = Player & DocMeta;