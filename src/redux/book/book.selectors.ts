import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import { PlayerDoc } from "../../types/player";
import { BookDoc, BookFullDoc, BookSummary } from "../../types/book";

const getLoading = (state: RootState) =>
  state.player.loading && state.book.loading;
const getPlayers = (state: RootState) => state.player.players;
const getBooks = (state: RootState) => state.book.books;

const getAllBooksSelector = createSelector(
  [getPlayers, getBooks, getLoading],
  (players, books, isLoading) => {
    return isLoading
      ? undefined
      : books.map((book) => {
          const records = book.records.map((recordRow) => ({
            ...recordRow,
            records: recordRow.records.map((record) => ({
              ...record,
              score:
                book.configs.tripleChaoThreshold &&
                record.score >= book.configs.tripleChaoThreshold
                  ? record.score * 3
                  : book.configs.doubleChaoThreshold &&
                    record.score >= book.configs.doubleChaoThreshold
                  ? record.score * 2
                  : record.score,
            })),
          }));
          const bookPlayers = players.filter((player) =>
            book.playerIds ? book.playerIds.includes(player.id) : undefined
          );
          return {
            ...book,
            records,
            players: bookPlayers,
          };
        });
  }
);

const getBookId = (_, { bookId }: { bookId: string }): string => bookId;

const getBookByPathId = createSelector(
  [getAllBooksSelector, getBookId, getLoading],
  (books, id) => {
    if (books === undefined) return undefined;
    const book = books.find((book) => book.id === id);
    return book;
  }
);

const getBookSummarySelector = createSelector(getBookByPathId, (book) => {
  if (book === undefined) return undefined;
  const totalScores = book.players.map((player) => ({
    playerId: player.id,
    score: book.records.reduce((sum, record) => {
      const recordHasPlayer = record.records.find(
        (r) => r.playerId === player.id
      );
      return recordHasPlayer ? sum + recordHasPlayer.score : sum;
    }, 0),
  }));

  return totalScores.map((totalScore) => {
    const otherScores = totalScores.filter(
      (otherScore) => otherScore.playerId !== totalScore.playerId
    );
    return {
      ...totalScore,
      pnl: otherScores.reduce((sum, otherScore) => {
        return sum + otherScore.score - totalScore.score;
      }, 0),
    };
  });
});

export { getAllBooksSelector, getBookByPathId, getBookSummarySelector };
