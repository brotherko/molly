import { makeStyles, Dialog, DialogTitle, DialogContent, DialogActions, Button, ListItemAvatar, ListItem, ListItemText, ListItemSecondaryAction, List, Divider, FormControl, NativeSelect } from "@material-ui/core"
import React, { useState, FormEvent } from "react"
import { PlayerAvatar } from "./PlayerAvatar"
import { addBookAction } from '../redux/book/book.actions';
import { RxDocument } from "rxdb";
import { Player, PlayerDoc } from "../types/player";

type Props = {
  isOpen: boolean,
  handleClose: any,
  players: PlayerDoc[],
  addBookRecord?: typeof addBookAction.request,
}
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  numberInput: {
    '& select': {
      paddingLeft: theme.spacing(2)
    }
  },
  avatar: {
    margin: 'auto',
    width: '90%',
    height: '90%',
  }
}))
export const BookRecordCreateModal = ({ isOpen, handleClose, players }: Props) => {
  const [] = useState<string>("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // addBookRecord({ created: new Date(), bookMode: BookMode.BIG2, playerIds: checkedPlayer });
    handleClose();
  }
  const [, setScores] = useState<Record<string, number>>({});

  const handleSelect = (value: number, id: string) => {
    setScores((scores) => ({
      ...scores,
      [id]: value
    }))
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
          <List className={classes.root}>
            {players.map((player) => (
              <React.Fragment>
                <ListItem key={player.id} button>
                  <ListItemAvatar>
                    <PlayerAvatar seed={player.name} />
                  </ListItemAvatar>
                  <ListItemText id={player.id} primary={player.name} />
                  <ListItemSecondaryAction>
                    <FormControl variant="filled">
                      <NativeSelect
                        name="age"
                        className={classes.numberInput}
                        inputProps={{ 'aria-label': 'age' }}
                        onChange={(e) => handleSelect(parseInt(e.target.value), player.id)}
                      >
                        {[...Array(13)].map((_, i) => (
                          <option value={i}>{i}</option>
                        ))}
                      </NativeSelect>
                    </FormControl>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
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
