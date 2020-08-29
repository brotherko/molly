import { Modal, Card, CardContent, TextField, makeStyles, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core"
import React, { useState, FormEvent } from "react"
import { Avatar } from "./Avatar"
import { addPlayer } from '../redux/player/player.actions';

type Props = {
  isOpen: boolean,
  handleClose: any,
  addPlayer: typeof addPlayer, 
}
const useStyles = makeStyles(() => ({
  avatar: {
    margin: 'auto',
    width: '90%',
    height: '90%',
  }
}))
export const PlayerCreateModal = ({ isOpen, handleClose, addPlayer }: Props) => {
  const classes = useStyles();
  const [name, setName] = useState<string>("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addPlayer({ name });
    handleClose();
  }
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      maxWidth="sm"
    >
      <DialogTitle>Create new player</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Avatar seed={name} className={classes.avatar} />
          <TextField margin="dense" label="name" onChange={(e) => setName(e.target.value)} required autoFocus fullWidth />
        </DialogContent>
        <DialogActions>
          <Button type="submit">Create</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
