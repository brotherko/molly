import React, { useEffect, useState, useMemo } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Divider } from '@material-ui/core';
import { AttachMoney, Add } from '@material-ui/icons'
import { FloatingButton } from '../components/FloatingButton';
import { RootState } from '../redux/rootReducer';
import { fetchBookAction, addBookAction, removeBookAction } from '../redux/book/book.actions';
import { connect, ConnectedProps } from 'react-redux';
import { BookCreateModal } from '../components/BookCreateModal';
import { fetchPlayerAction } from '../redux/player/player.actions';
import { createSelector } from '@reduxjs/toolkit'
import { AvatarGroup } from '@material-ui/lab';
import { PlayerAvatar } from '../components/PlayerAvatar';
import { useHistory } from 'react-router-dom';
import { Player, PlayerDoc } from '../types/player';
import { Book, BookDoc } from '../types/book';
import { RxDocument } from 'rxdb';

const getPlayers = (state: RootState) => state.player.players
const getBooks = (state: RootState) => state.book.books

const getBookDetails = createSelector([getPlayers, getBooks],
  (players: PlayerDoc[], books: BookDoc[]) => {
    return books.map((book) => {
      const bookPlayers = players.filter((player) => book.players ? (book.players).includes(player.id) : undefined);
      return {
        ...book,
        players: bookPlayers
      }
    })
  })


const mapState = (state: RootState) => ({
  books: getBookDetails(state),
  players: state.player.players
})

const mapDispatch = {
  fetchPlayer: fetchPlayerAction.request,
  fetchBook: fetchBookAction.request,
  addBook: addBookAction.request,
  removeBook: removeBookAction.request,
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector>

const BookList = ({ books, players, fetchPlayer, fetchBook, addBook, removeBook }: Props) => {
  const [isOpenCreateModal, setOpenCreateModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
  }, [])
  return (
    <div>
      <FloatingButton onClick={() => setOpenCreateModal(true)}>
        <Add />
      </FloatingButton>
      <BookCreateModal players={players} addBook={addBook} isOpen={isOpenCreateModal} handleClose={() => setOpenCreateModal(false)} />
      <List>
        {books.map((book) => (
          <React.Fragment>
            <ListItem button onClick={() => history.push(`/book/`)}>
              <ListItemAvatar>
                <Avatar>
                  <AttachMoney />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Big 2" secondary={book.createdAt} />
              <ListItemSecondaryAction>
                <AvatarGroup max={4}>
                  {book.players.map((player) => (
                    <PlayerAvatar seed={player.name} />
                  ))}
                </AvatarGroup>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </div>
  )
}

export default connector(BookList);