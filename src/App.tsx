import { Face, AccountBalanceWallet, Assessment } from '@material-ui/icons';
import PlayersList from './views/PlayersList';
import { ResultView } from './views/ResultView';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import React, { useEffect } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction, MuiThemeProvider, CssBaseline, AppBar, Toolbar, makeStyles, Box } from '@material-ui/core';
import BookRecordList from './views/BookRecord';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from './redux/rootReducer';
import BookList from './views/BookList';
import { initAppDataAction } from './redux/app/app.actions';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  }
})

const useStyles = makeStyles(() => ({
  content: {
    height: 'calc(100vh - 104px)',
    overflow: 'auto',
  }
}));

const mapState = (state: RootState) => ({
})

const mapDispatch = {
  initAppData: initAppDataAction()
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector>

function App( { initAppData }: Props ) {
  const classes = useStyles();
  useEffect(() => {
    console.log("hi")
    initAppData();
  })
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
            <Route path="/book/:id">
              <BookRecordList />
            </Route>
            <Route path="/book">
              <BookList />
            </Route>
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
            to="/book"
            label="Option"
            value="add"
          icon={<AccountBalanceWallet />}
          />
          <BottomNavigationAction
            component={Link}
            to="/result"
            label="Result"
            value="result"
            icon={<Assessment />}
          />
        </BottomNavigation>
      </Router>
    </MuiThemeProvider>
  );
}

export default connector(App);
