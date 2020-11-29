import React from "react";
import styled from "styled-components";

import ActionButtonsPanel from "../components/ActionButtons";
import CrossPad from "../components/CrossPad";

interface IGamepad {
  ws: null | WebSocket;
}

function Gamepad(props: IGamepad) {
  return (
    <Container>
      <HorizontalContainer>
        <CrossPad ws={props.ws} />
        <ActionButtonsPanel ws={props.ws} />
      </HorizontalContainer>
    </Container>
  );
}

export default Gamepad;

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

const HorizontalContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
