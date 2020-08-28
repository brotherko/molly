import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { PlayerCard } from '../components/PlayerCard';

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
const players = ['Marty', 'Sally', 'Coby', 'Ming']
export const PlayersList = () => {
  const classes = useStyles();
  return (
    <Box display="flex" flexWrap="wrap">
      {
        players.map((player) => (
          <Box flex-basis="50%" className={classes.card}>
            <PlayerCard name={player} />
          </Box>
        ))
      }
    </Box>
  )
}