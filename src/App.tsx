import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import HostRoom from './pages/HostRoom';
import HostRound from './pages/HostRound';
import HostQuestion from './pages/HostQuestion';
import PlayerJoin from './pages/PlayerJoin';
import SocketProvider from './components/SocketContext/Provider';
import PlayerRoom from './pages/PlayerRoom';

const App: React.FunctionComponent = () => {
  return (
    <SocketProvider>
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/host-room/:id" component={HostRoom} />
        <Route path="/host-round/:id" component={HostRound} />
        <Route path="/host-question/:id" component={HostQuestion} />
        <Route path="/player-join/:id" component={PlayerJoin} />
        <Route
          path="/player-room/:roomName/:playerName"
          component={PlayerRoom}
        />
      </Router>
    </SocketProvider>
  );
};

export default App;
