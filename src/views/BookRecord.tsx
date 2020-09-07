import React, { useState, useMemo } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Container, Box } from '@material-ui/core';
import { RootState } from '../redux/rootReducer';
import { fetchBookAction, addBookAction, removeBookAction } from '../redux/book/book.actions';
import { connect, ConnectedProps } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { FloatingButton } from '../components/FloatingButton';
import { Add } from '@material-ui/icons';
import BookRecordCreateModal from '../components/BookRecordCreateModal';
import { getBookByPathId, getBookSummarySelector } from '../redux/book/book.selectors';
import { PlayerAvatar } from '../components/PlayerAvatar';

const mapState = (state: RootState, props: PropsFromParent) => {
  return {
  book: getBookByPathId(state, props),
  bookSummary: getBookSummarySelector(state, props),
  isLoading: state.book.loading
}}

const mapDispatch = {
  fetchBook: fetchBookAction.request,
  addBook: addBookAction.request,
  removeBook: removeBookAction.request,
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsFromParent = {
  bookId: string;
}
type Props = PropsFromParent & PropsFromRedux;
const BookRecordList = ({ book, bookSummary, isLoading }: Props) => {
  const [isOpenCreateModal, setOpenCreateModal] = useState(false);
  return (
    <Container>
      {(isLoading || !book) ? <Box>Loading</Box> : <TableContainer component={Paper}>
        <FloatingButton onClick={() => setOpenCreateModal(true)}>
          <Add />
        </FloatingButton>
        <BookRecordCreateModal
          book={book}
          isOpen={isOpenCreateModal}
          handleClose={() => setOpenCreateModal(false)}
        />
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {book.players.map((player) => {
                return (
                  <TableCell key={`book-${book.id}-header-${player.id}`} align="center">
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
              <TableCell>PNL</TableCell>
              {book.players.map((player) => {
                const playerSummary = bookSummary ? bookSummary.find((s) => s.playerId === player.id) : undefined;
                return (
                  <TableCell key={`book-${book.id}-score-${player.id}`} align="center">
                    {playerSummary ? playerSummary.pnl : 'X'}
                  </TableCell>
                )
              })}
            </TableRow>
            <TableRow>
              <TableCell>Score</TableCell>
              {book.players.map((player) => {
                const playerSummary = bookSummary ? bookSummary.find((s) => s.playerId === player.id) : undefined;
                return (
                  <TableCell key={`book-${book.id}-pnl-${player.id}`} align="center">
                    {playerSummary ? playerSummary.score : 'X'}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {book.records.map(({ records }, i) => {
              return (
                <TableRow key={`book-record-${book.id}-row-${i}`}>
                  <TableCell>{i}</TableCell>
                  {book.players.map((player) => {
                    const thisPlayerRecord = records.find((r) => r.playerId === player.id);
                    return (
                    <TableCell key={`book-record-${book.id}-row-${i}-player-${player.id}`} align="center">
                      {thisPlayerRecord!.score === 0 ? '🥳' : thisPlayerRecord!.score}
                      </TableCell>)
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