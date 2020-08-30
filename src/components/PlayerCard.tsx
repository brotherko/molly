import React from 'react';
import { Card, CardContent, Typography, Box, IconButton, makeStyles, CardActions, TextField } from '@material-ui/core';
import { Delete, Favorite, Edit } from '@material-ui/icons';
import { Avatar } from './Avatar';
import { Player } from '../types/player';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  title: {
    marginTop: '10px',
  },
  avatar: {
    width: '80%',
    height: '80%',
    margin: 'auto',
    backgroundColor: theme.palette.background.default,
  },
  actions: {
    marginTop: 10,
    backgroundColor: theme.palette.action.selected,
    '& button': {
      margin: 'auto'
    }
  }
}));

type Props = {
  player: Player,
  removePlayer: () => void
}

export const PlayerCard = ({ player: { name }, removePlayer }: Props) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Avatar seed={name} className={classes.avatar} />
        <Typography variant="h6" component="h2" className={classes.title}>
          {name}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <IconButton aria-label="favorite" size='small'>
          <Favorite />
        </IconButton>
        <IconButton aria-label="edit" size='small'>
          <Edit />
        </IconButton>
        <IconButton aria-label="delete" size='small' onClick={() => removePlayer()} >
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  )
}
