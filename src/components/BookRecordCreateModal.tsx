import { makeStyles, Dialog, DialogTitle, DialogContent, DialogActions, Button, ListItemAvatar, ListItem, ListItemText, ListItemSecondaryAction, List, Divider, FormControl, NativeSelect } from "@material-ui/core"
import React, { useState, FormEvent } from "react"
import { PlayerAvatar } from "./PlayerAvatar"
import { addBookRecordAction } from '../redux/book/book.actions';
import { PlayerDoc } from "../types/player";
import { BookRecord, BookDoc, BookRecordRow, BookFullDoc } from "../types/book";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { getAllBooksSelector } from "../redux/book/book.selectors";

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


const mapState = (state: RootState) => ({
  books: getAllBooksSelector(state)
})

const mapDispatch = {
  addBookRecord: addBookRecordAction.request,
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props =  PropsFromRedux & {
  book: BookFullDoc,
  isOpen: boolean,
  handleClose: any,
}

const BookRecordCreateModal = ({ isOpen, handleClose, book, addBookRecord }: Props) => {
  const [scores, setScores] = useState<BookRecord[]>(book.players.map((player) => ({
    playerId: player.id,
    score: 0
  })));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if(book && scores){
      addBookRecord({ book, record: scores });
    }
    handleClose();
  }

  const handleSelect = (score: number, playerId: string) => {
    setScores((scores) => {
      return [
        ...scores.filter((score) => score.playerId != playerId),
        {
          playerId,
          score,
        }
      ]
    })
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
      <DialogTitle>Create new record</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <List className={classes.root}>
            {book.players.map((player) => {
              return (
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
              )
            })}
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
export default connector(BookRecordCreateModal)