import './App.css';
import { Face, Assessment } from '@material-ui/icons';
import { PlayersList } from './views/PlayersList';
import { ResultView } from './views/ResultView';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction, Container, MuiThemeProvider, CssBaseline } from '@material-ui/core';

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
                    <PlayersList />
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
      </div>
    </MuiThemeProvider>
  );
}

export default App;
