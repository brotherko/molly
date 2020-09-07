import { makeStyles, Dialog, DialogTitle, DialogContent, DialogActions, Button, ListItemAvatar, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, List } from "@material-ui/core"
import React, { useState, FormEvent } from "react"
import { PlayerAvatar } from "./PlayerAvatar"
import { addBookAction } from '../redux/book/book.actions';
import { BookMode } from "../types/book";
import { Player, PlayerDoc } from "../types/player";

type Props = {
  isOpen: boolean,
  handleClose: any,
  players: PlayerDoc[],
  addBook: typeof addBookAction.request,
}
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    margin: 'auto',
    width: '90%',
    height: '90%',
  }
}))
export const BookCreateModal = ({ isOpen, handleClose, players, addBook }: Props) => {
  const [] = useState<string>("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addBook({
      bookMode: BookMode.BIG2,
      playerIds: checkedPlayer,
      records: [],
      configs: {
        dollarPerScore: 1.5,
        doubleChaoThreshold: 10,
        tripleChaoThreshold: 13,
      }
    });
    handleClose();
  }
  const [checkedPlayer, setCheckedPlayer] = useState<string[]>([]);

  const handleToggle = (value: string) => () => {
    const currentIndex = checkedPlayer.indexOf(value);
    const newChecked = [...checkedPlayer];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedPlayer(newChecked);
  };


  const classes = useStyles();
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Create new book</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <List dense className={classes.root}>
            {players.map((player) => (
              <ListItem key={`create-book-player-${player.id}`} onClick={handleToggle(player.id)} button>
                <ListItemAvatar>
                  <PlayerAvatar seed={player.name} />
                </ListItemAvatar>
                <ListItemText id={player.id} primary={player.name} />
                <ListItemSecondaryAction>
                  <Checkbox
                    onChange={handleToggle(player.id)}
                    checked={checkedPlayer.indexOf(player.id) !== -1}
                    inputProps={{ 'aria-labelledby': player.id }}
                    edge="end"
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}

          </List>
        </DialogContent>
        <DialogActions>
          <Button type="submit">Create</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
