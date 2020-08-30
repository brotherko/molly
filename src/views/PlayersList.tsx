import React, { useState, useEffect } from 'react';
import { Box, makeStyles, Fab, Container } from '@material-ui/core';
import { PlayerCard } from '../components/PlayerCard';
import { Add } from '@material-ui/icons';
import { connect, ConnectedProps } from 'react-redux';
import { addPlayerAction, removePlayerAction, fetchPlayerAction } from '../redux/player/player.actions';
import { RootState } from '../redux/rootReducer';
import { PlayerCreateModal } from '../components/PlayerCreateModal';

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
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 70,
    left: 'auto',
    position: 'fixed',
  }
}));

const PlayersList = ({ players, addPlayer, fetchPlayer, removePlayer }: Props) => {
  const classes = useStyles();
  const [isOpenCreateModal, setOpenCreateModal] = useState(false);
  useEffect(() => {
    fetchPlayer();
  }, [])

  return (
    <Container>
    <PlayerCreateModal addPlayer={addPlayer} isOpen={isOpenCreateModal} handleClose={() => setOpenCreateModal(false)} />
    <Fab color="inherit" aria-label="add" className={classes.fab} size="medium">
      <div onClick={() => setOpenCreateModal(true)}><Add /></div>
    </Fab>
    <Box display="flex" flexWrap="wrap">
      {
        players && players.map((player) => (
          <Box flex-basis="50%" className={classes.card}>
            <PlayerCard player={player} removePlayer={() => removePlayer(player)} />
          </Box>
        ))
      }
    </Box>

    </Container>
  )
}

export default connector(PlayersList);