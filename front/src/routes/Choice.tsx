import React, { useState } from "react";
import styled from "styled-components";

import Connection from "../components/Connection";
import ChoicePanel from "../components/ChoicePanel";
import { State } from "../lib/state";

interface IChoice {
  choose: (
    screenWs: WebSocket | null,
    inputWs: WebSocket | null,
    state: State
  ) => void;
}

function Choice(props: IChoice) {
  const [choice, setChoice] = useState(State.full);
  return (
    <Container>
      <Connection
        onConnection={(screenWs, inputWs) =>
          props.choose(screenWs, inputWs, choice)
        }
        type="both"
      />
      <ChoicePanel choose={(c) => setChoice(c)} choice={choice} />
    </Container>
  );
}

export default Choice;

const Container = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  min-width: 100vw;
  max-width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ControlContainer = styled.div`
  margin-top: 20px;
  display: flex;
`;
