import React from "react";
import styled from "styled-components";

import Screen from "../components/Screen";
import ActionButtonsPanel from "../components/ActionButtons";
import CrossPad from "../components/CrossPad";

function Full() {
  return (
    <Container>
      <Screen />
      <ControlContainer>
        <CrossPad />
        <ActionButtonsPanel />
      </ControlContainer>
    </Container>
  );
}

export default Full;

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
