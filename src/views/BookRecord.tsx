import React, { useEffect, useState } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Container } from '@material-ui/core';
import { RootState } from '../redux/rootReducer';
import { fetchBookAction, addBookAction, removeBookAction } from '../redux/book/book.actions';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FloatingButton } from '../components/FloatingButton';
import { Add } from '@material-ui/icons';
import { BookRecordCreateModal } from '../components/BookRecordCreateModal';

const mapState = (state: RootState) => ({
  books: state.book.books,
  players: state.player.players
})

const mapDispatch = {
  fetchBook: fetchBookAction.request,
  addBook: addBookAction.request,
  removeBook: removeBookAction.request,
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector>

const BookRecordList = ({ fetchBook, players }: Props) => {
  const { id } = useParams();
  const [isOpenCreateModal, setOpenCreateModal] = useState(false);
  useEffect(() => {
    fetchBook();
  }, [])
  return (
    <Container>
      <FloatingButton onClick={() => setOpenCreateModal(true)}>
        <Add />
      </FloatingButton>
      <BookRecordCreateModal isOpen={isOpenCreateModal} handleClose={() => setOpenCreateModal(false)} players={players} />
      
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default connector(BookRecordList);