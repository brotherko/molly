import React, { useEffect } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import { AttachMoney, Add } from '@material-ui/icons'
import { FloatingButton } from '../components/FloatingButton';
import { RootState } from '../redux/rootReducer';
import { fetchBookAction, addBookAction, removeBookAction } from '../redux/book/book.actions';
import { connect, ConnectedProps } from 'react-redux';
import { BookMode } from '../types/book';

const mapState = (state: RootState) => ({
  books: state.book.books
})

const mapDispatch = {
  fetchBook: fetchBookAction.request,
  addBook: addBookAction.request,
  removeBook: removeBookAction.request,
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector>

const BookList = ({ books, fetchBook, addBook, removeBook }: Props) => {
  useEffect(() => {
    fetchBook();
  }, [])
  return (
    <div>
      <FloatingButton onClick={() => addBook({ bookMode: BookMode.BIG2, created: new Date()})}>
        <Add />
      </FloatingButton>
      <List>
        {books.map((book) => (
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AttachMoney />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={book.bookMode} secondary={book.created} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default connector(BookList);