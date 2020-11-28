import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Full from "./routes/Full";
import Screen from "./routes/Screen";

const PREFIX = "cloud-gba";

function App() {
  return (
    <div className="App">
      <Body>
        <Router>
          <Switch>
            <Route path="/full">
              <Full />
            </Route>
            <Route path={`${PREFIX}/full`}>
              <Full />
            </Route>
            <Route path="/screen">
              <Screen />
            </Route>
            <Route path={`${PREFIX}/screen`}>
              <Screen />
            </Route>
            <Route path="/">
              <Full />
            </Route>
          </Switch>
        </Router>
      </Body>
    </div>
  );
}

export default App;

const Body = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  min-width: 100vw;
  max-width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #675ea7;
`;
