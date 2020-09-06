import React, { useState, useEffect } from 'react';
import { Box, makeStyles, Fab, Container } from '@material-ui/core';
import { PlayerCard } from '../components/PlayerCard';
import { Add } from '@material-ui/icons';
import { connect, ConnectedProps } from 'react-redux';
import { addPlayerAction, removePlayerAction, fetchPlayerAction } from '../redux/player/player.actions';
import { RootState } from '../redux/rootReducer';
import { PlayerCreateModal } from '../components/PlayerCreateModal';
import { FloatingButton } from '../components/FloatingButton';

const mapState = (state: RootState) => ({
  players: state.player.players
})

const mapDispatch = {
  fetchPlayer: fetchPlayerAction.request,
  addPlayer: addPlayerAction.request,
  removePlayer: removePlayerAction.request, 
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector>

const useStyles = makeStyles((theme) => ({
  root: {
  },
  title: {
    marginBottom: '5px',
  },
  card: {
    flex: '0 0 50%',
    padding: 10,
  },

}));

const PlayersList = ({ players, addPlayer, fetchPlayer, removePlayer }: Props) => {
  const classes = useStyles();
  const [isOpenCreateModal, setOpenCreateModal] = useState(false);

  return (
    <Container>
      <FloatingButton onClick={() => setOpenCreateModal(true)}>
        <Add />
      </FloatingButton>
      <PlayerCreateModal addPlayer={addPlayer} isOpen={isOpenCreateModal} handleClose={() => setOpenCreateModal(false)} />
      <Box display="flex" flexWrap="wrap">
        {
          players && players.map((player) => (
            <Box key={`player-card-${player.id}`} flex-basis="50%" className={classes.card}>
              <PlayerCard player={player} removePlayer={() => removePlayer(player)} />
            </Box>
          ))
        }
      </Box>
    </Container>
  )
}

export default connector(PlayersList);