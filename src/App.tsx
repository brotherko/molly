import './App.css';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { AddGameView } from './views/AddGameView';
import { ResultView } from './views/ResultView';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Icon, BottomNavigation, BottomNavigationAction, Container, Box, MuiThemeProvider, CssBaseline } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  }
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
          <Router>
            <div className="appContent">
              <Container>
                <Switch>
                  <Route path="/add">
                    <AddGameView />
                  </Route>
                  <Route path="/result">
                    <ResultView />
                  </Route>
                </Switch>
              </Container>
            </div>
            <BottomNavigation>
              <BottomNavigationAction
                component={Link}
                to="/add"
                label="Add"
                value="add"
                icon={<AddBoxIcon />}
              />
              <BottomNavigationAction
                component={Link}
                to="/result"
                label="Result"
                value="result"
                icon={<AddBoxIcon />}
              />
              <BottomNavigationAction
                component={Link}
                to="/add"
                label="Option"
                value="add"
                icon={<AddBoxIcon />}
              />
            </BottomNavigation>
          </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
