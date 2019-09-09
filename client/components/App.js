import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SongList from './SongList';
import SongCreate from './SongCreate';
import SongDetail from './SongDetail';

const App = () => (
  <div className="container">
    <Switch>
      <Route
        exact
        path="/"
        render={routerProps => <SongList {...routerProps} />}
      />
      <Route
        exact
        path="/songs/new"
        render={routerProps => <SongCreate {...routerProps} />}
      />
      <Route
        exact
        path="/songs/:id"
        render={routerProps => <SongDetail {...routerProps} />}
      />
    </Switch>
  </div>
);

export default App;
