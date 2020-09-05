import { Book } from '../types/book';
import { Player } from './../types/player';
import {
  createRxDatabase,
  RxDatabase,
  RxCollection,
  addRxPlugin
} from "rxdb";
// import { Player } from "../types/player";
// import { Book } from "../types/book";

addRxPlugin(require('pouchdb-adapter-idb'));


type PlayerCollection = RxCollection<Player>;
type BookCollection = RxCollection<Book>;

type DbCollections = {
  players: PlayerCollection;
  books: BookCollection;
};
type Db = RxDatabase<DbCollections>;

const collections = [
  {
    name: 'players',
    schema: require('./schemas/player.json')
  },
  {
    name: 'books',
    schema: require('./schemas/book.json')
  },
]

class Database {
  private static instance: Db | null = null;
  public static async get() {
    if(!this.instance) {
      this.instance = await this.create();
    }
    return this.instance;
  }
  private static async create(): Promise<Db> {
    console.log("creating DB")
    const db: Db = await createRxDatabase<DbCollections>({
      name: "db",
      adapter: "idb",
      ignoreDuplicate: true,
    });
    await Promise.all(collections.map((collection) => db.collection(collection)))
    return db
  }
}
export default Database;