import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Divider } from '@material-ui/core';
import { AttachMoney, Add } from '@material-ui/icons'
import { FloatingButton } from '../components/FloatingButton';
import { RootState } from '../redux/rootReducer';
import { fetchBookAction, addBookAction, removeBookAction } from '../redux/book/book.actions';
import { connect, ConnectedProps } from 'react-redux';
import { BookCreateModal } from '../components/BookCreateModal';
import { fetchPlayerAction } from '../redux/player/player.actions';
import { AvatarGroup } from '@material-ui/lab';
import { PlayerAvatar } from '../components/PlayerAvatar';
import { useHistory } from 'react-router-dom';
import { getAllBooksSelector } from '../redux/book/book.selectors';


const mapState = (state: RootState) => ({
  books: getAllBooksSelector(state),
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

const BookList = ({ books, players, addBook }: Props) => {
  const [isOpenCreateModal, setOpenCreateModal] = useState(false);
  const history = useHistory();

  return (
    <div>
      <FloatingButton onClick={() => setOpenCreateModal(true)}>
        <Add />
      </FloatingButton>
      <BookCreateModal players={players} addBook={addBook} isOpen={isOpenCreateModal} handleClose={() => setOpenCreateModal(false)} />
      <List>
        {books === undefined ? 'Loading' : books.map((book) => (
          <React.Fragment key={`book-list-item-${book.id}`}>
            <ListItem button onClick={() => history.push(`/book/${book.id}`)}>
              <ListItemAvatar>
                <Avatar>
                  <AttachMoney />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Big 2" secondary={book.createdAt} />
              <ListItemSecondaryAction>
                <AvatarGroup max={4}>
                  {book.players.map((player) => (
                    <PlayerAvatar key={`book-list-item-avatar-${book.id}-${player.id}`} seed={player.name} />
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