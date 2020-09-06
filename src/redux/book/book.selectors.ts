import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import { PlayerDoc } from "../../types/player";
import { BookDoc, BookFullDoc, BookSummary } from "../../types/book";

const getPlayers = (state: RootState) => state.player.players;
const getBooks = (state: RootState) => {
  return state.book.books;
};
const getAllBooksSelector = createSelector<any, any, BookFullDoc[]>(
  [getPlayers, getBooks],
  (players: PlayerDoc[], books: BookDoc[]) => {
    return books.map((book) => {
      const bookPlayers = players.filter((player) =>
        book.playerIds ? book.playerIds.includes(player.id) : undefined
      );
      return {
        ...book,
        players: bookPlayers,
      };
    });
  }
);

export { getAllBooksSelector };
