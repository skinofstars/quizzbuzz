import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import HostRoom from "./pages/HostRoom";
import HostRound from "./pages/HostRound";
import HostQuestion from "./pages/HostQuestion";

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/host-room/:id" component={HostRoom} />
      <Route path="/host-round/:id" component={HostRound} />
      <Route path="/host-question/:id" component={HostQuestion} />
    </Router>
  );
};

export default App;
