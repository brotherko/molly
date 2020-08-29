import React from 'react';
import { Box, makeStyles, Fab } from '@material-ui/core';
import { PlayerCard } from '../components/PlayerCard';
import { Add } from '@material-ui/icons';
import { connect, ConnectedProps } from 'react-redux';
import { addPlayer, removePlayer } from '../redux/player/player.actions';
import { RootState } from '../redux/rootReducer';

const mapState = (state: RootState) => ({
  players: state.player.players
})

const mapDispatch = {
  addPlayer,
  removePlayer, 
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

const PlayersList = ({ players, addPlayer, removePlayer }: Props) => {
  const classes = useStyles();
  return (
    <Box display="flex" flexWrap="wrap">
      <Fab color="inherit" aria-label="add" className={classes.fab} size="medium">
        <div onClick={() => addPlayer({ name: 'hi' })}><Add /></div>
      </Fab>
      {
        players && players.map((player) => (
          <Box flex-basis="50%" className={classes.card}>
            <PlayerCard player={player} />
          </Box>
        ))
      }
    </Box>
  )
}

export default connector(PlayersList);