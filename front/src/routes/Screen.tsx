import React from "react";
import styled from "styled-components";

import ScreenComponent from "../components/Screen";

function Screen() {
  return (
    <Container>
      <ScreenComponent />
    </Container>
  );
}

export default Screen;

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
