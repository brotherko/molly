import { Fab, makeStyles } from "@material-ui/core"
import React from "react";
import { Add } from "@material-ui/icons";

const useStyles = makeStyles({
  float: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 70,
    left: 'auto',
    position: 'fixed',
  }
})

type Props = {
  [key: string]: any;
  onClick?: () => void,
}

export const FloatingButton = ({ onClick, children, ...rest }: Props) => {
  const classes = useStyles();
  return (
    <div onClick={onClick} className={classes.float}>
      <Fab {...rest}>
        {children}
      </Fab>
    </div>
  )
}