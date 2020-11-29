import React, { useState } from "react";
import styled from "styled-components";

import Full from "./routes/Full";
import Screen from "./routes/Screen";
import Choice from "./routes/Choice";
import Gamepad from "./routes/Gamepad";
import { State } from "./lib/state";

function App() {
  const [state, setState] = useState(State.choice);
  const [screenWs, setScreenWs] = useState<null | WebSocket>(null);
  const [inputWs, setInputWs] = useState<null | WebSocket>(null);

  const choose = (
    sws: null | WebSocket,
    iws: null | WebSocket,
    nextState: State
  ) => {
    setScreenWs(sws);
    setInputWs(iws);
    setState(nextState);
  };

  let component = null;
  switch (state) {
    case State.choice:
      component = <Choice choose={choose} />;
      break;
    case State.screen:
      component = <Screen ws={screenWs} />;
      break;
    case State.full:
      component = <Full inputWs={inputWs} screenWs={screenWs} />;
      break;
    case State.input:
      component = <Gamepad ws={inputWs} />;
      break;
  }
  return (
    <div className="App">
      <Body>{component}</Body>
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
