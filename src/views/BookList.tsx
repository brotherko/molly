import React, { useEffect } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import { AttachMoney, Add } from '@material-ui/icons'
import { FloatingButton } from '../components/FloatingButton';
import { RootState } from '../redux/rootReducer';
import { fetchGameAction, addGameAction, removeGameAction } from '../redux/game/game.actions';
import { connect, ConnectedProps } from 'react-redux';
import { GameMode } from '../types/game';

const mapState = (state: RootState) => ({
  games: state.game.games
})

const mapDispatch = {
  fetchGame: fetchGameAction.request,
  addGame: addGameAction.request,
  removeGame: removeGameAction.request,
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector>

const BookList = ({ games, fetchGame, addGame, removeGame }: Props) => {
  useEffect(() => {
    fetchGame();
  }, [])
  return (
    <div>
      <FloatingButton onClick={() => addGame({ gameMode: GameMode.BIG2, created: new Date()})}>
        <Add />
      </FloatingButton>
      <List>
        {games.map((game) => (
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AttachMoney />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={game.gameMode} secondary={game.created} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default connector(BookList);