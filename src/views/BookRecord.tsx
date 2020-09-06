import React, { useState, useMemo } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Container, Box } from '@material-ui/core';
import { RootState } from '../redux/rootReducer';
import { fetchBookAction, addBookAction, removeBookAction } from '../redux/book/book.actions';
import { connect, ConnectedProps } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { FloatingButton } from '../components/FloatingButton';
import { Add } from '@material-ui/icons';
import BookRecordCreateModal from '../components/BookRecordCreateModal';
import { getAllBooksSelector } from '../redux/book/book.selectors';
import { PlayerAvatar } from '../components/PlayerAvatar';

const mapState = (state: RootState) => ({
  books: getAllBooksSelector(state),
  isLoading: state.book.loading
})

const mapDispatch = {
  fetchBook: fetchBookAction.request,
  addBook: addBookAction.request,
  removeBook: removeBookAction.request,
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector>

const BookRecordList = ({ fetchBook, books, isLoading }: Props) => {
  const { id } = useParams();
  const history = useHistory();
  const book = books.find((book) => book.id === id);
  const [isOpenCreateModal, setOpenCreateModal] = useState(false);

  const summary = useMemo(() => {
    console.log("calculating summary")
    if (!book || !id || isLoading) {
      return undefined;
    }
    const totalScores = book.players.map((player) => ({
      playerId: player.id,
      totalScore: book.records.reduce((sum, record) => {
        const recordHasPlayer = record.records.find(
          (r) => r.playerId === player.id
        );
        return recordHasPlayer ? sum + recordHasPlayer.score : sum;
      }, 0),
    }))

    const pnl = totalScores.map((totalScore) => {
      const otherScores = totalScores.filter((otherScore) => otherScore.playerId !== totalScore.playerId);
      return {
        playerId: totalScore.playerId,
        scores: totalScore.totalScore,
        pnl: otherScores.reduce((sum, otherScore) => {
          return sum + otherScore.totalScore - totalScore.totalScore
        }, 0)
      }
    })

    return pnl
  }, [book, isLoading]);
  return (
    <Container>
      {isLoading ? <Box>Loading</Box> : <TableContainer component={Paper}>
        <FloatingButton onClick={() => setOpenCreateModal(true)}>
          <Add />
        </FloatingButton>
        <BookRecordCreateModal
          book={book!}
          isOpen={isOpenCreateModal}
          handleClose={() => setOpenCreateModal(false)}
        />
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              {/* <TableCell></TableCell> */}
              {book!.players.map((player) => {
                return (
                  <TableCell align="center">
                    <Box textAlign="center">
                      <PlayerAvatar seed={player.name} />
                    </Box>
                    <Box>
                      {player.name}
                    </Box>
                  </TableCell>
                )
              })}
            </TableRow>
            <TableRow>
              {book!.players.map((player) => {
                const playerSummary = summary ? summary.find((s) => s.playerId === player.id) : undefined;
                return (
                  <TableCell align="center">
                    {playerSummary ? playerSummary.pnl : 'X'}
                  </TableCell>
                )
              })}
            </TableRow>
            <TableRow>
              {book!.players.map((player) => {
                const playerSummary = summary ? summary.find((s) => s.playerId === player.id) : undefined;
                return (
                  <TableCell align="center">
                    {playerSummary ? playerSummary.scores : 'X'}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {book!.records.map(({ records }, i) => {
              return (
                <TableRow>
                  {/* <TableCell>{i}</TableCell> */}
                  {book!.players.map((player) => {
                    const thisPlayerRecord = records.find((r) => r.playerId === player.id);
                    return (<TableCell align="center">{thisPlayerRecord!.score}</TableCell>)
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>}
    </Container>
  )
}

export default connector(BookRecordList);