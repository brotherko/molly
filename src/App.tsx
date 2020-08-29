import { Face, Assessment } from '@material-ui/icons';
import PlayersList from './views/PlayersList';
import { ResultView } from './views/ResultView';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction, Container, MuiThemeProvider, CssBaseline, AppBar, Toolbar, IconButton, Typography, createStyles, makeStyles, Box } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  }
})

const useStyles = makeStyles((theme) => ({
  content: {
    height: 'calc(100vh - 104px)',
    overflow: 'auto',
  }
}));

function App() {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" color="inherit">
        <Toolbar variant="dense">
        </Toolbar>
      </AppBar>
      <Router>
        <Box className={classes.content}>
          <Switch>
            <Route path="/add">
              <PlayersList />
            </Route>
            <Route path="/result">
              <ResultView />
            </Route>
          </Switch>
        </Box>
        <BottomNavigation>
          <BottomNavigationAction
            component={Link}
            to="/add"
            label="Add"
            value="add"
            icon={<Face />}
          />
          <BottomNavigationAction
            component={Link}
            to="/result"
            label="Result"
            value="result"
            icon={<Assessment />}
          />
          <BottomNavigationAction
            component={Link}
            to="/add"
            label="Option"
            value="add"
          // icon={<AddBoxIcon />}
          />
        </BottomNavigation>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
