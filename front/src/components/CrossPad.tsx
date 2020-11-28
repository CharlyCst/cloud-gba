import React from "react";
import styled from "styled-components";
import { Key } from "../lib/input";

const PAD_BRANCH_WIDTH = 32;
const PAD_BRANCH_LENGTH = 48;
const PAD_RADIUS = 8;

interface ICrossPad {
  ws: WebSocket | null;
}

function CrossPad(props: ICrossPad) {
  const handler = (event: Key, up: boolean) => () => {
    if (props.ws) {
      if (up) {
        props.ws.send(`0${event}`);
      } else {
        props.ws.send(`1${event}`);
      }
    }
  };

  return (
    <Container>
      <VerticalBranch
        isTop={true}
        onMouseUp={handler(Key.up, true)}
        onMouseDown={handler(Key.up, false)}
      />
      <VerticalBranch
        isTop={false}
        onMouseUp={handler(Key.down, true)}
        onMouseDown={handler(Key.down, false)}
      />
      <HorizontalBranch
        isLeft={true}
        onMouseUp={handler(Key.left, true)}
        onMouseDown={handler(Key.left, false)}
      />
      <HorizontalBranch
        isLeft={false}
        onMouseUp={handler(Key.right, true)}
        onMouseDown={handler(Key.right, false)}
      />
      <CenterNode />
    </Container>
  );
}

export default CrossPad;

const Container = styled.div`
  height: ${2 * PAD_BRANCH_LENGTH + PAD_BRANCH_WIDTH}px;
  width: ${2 * PAD_BRANCH_LENGTH + PAD_BRANCH_WIDTH}px;
  position: relative;
`;

const Pad = styled.div`
  background-color: #c8cad5;
`;

const CenterNode = styled(Pad)`
  height: ${PAD_BRANCH_WIDTH}px;
  width: ${PAD_BRANCH_WIDTH}px;
  position: absolute;
  top: ${PAD_BRANCH_LENGTH}px;
  left: ${PAD_BRANCH_LENGTH}px;
`;

const Branch = styled(Pad)`
  :active {
    filter: brightness(85%);
  }
`;

const VerticalBranch = styled(Branch)<{ isTop: boolean }>`
  height: ${PAD_BRANCH_LENGTH}px;
  width: ${PAD_BRANCH_WIDTH}px;
  position: absolute;
  ${(props) =>
    props.isTop
      ? `
      top: O;
      border-radius: ${PAD_RADIUS}px ${PAD_RADIUS}px 0 0;
      `
      : `
      bottom: 0;
      border-radius: 0 0 ${PAD_RADIUS}px ${PAD_RADIUS}px;
      `}
  left: ${PAD_BRANCH_LENGTH}px;
`;

const HorizontalBranch = styled(Branch)<{ isLeft: boolean }>`
  height: ${PAD_BRANCH_WIDTH}px;
  width: ${PAD_BRANCH_LENGTH}px;
  position: absolute;
  ${(props) =>
    props.isLeft
      ? `
        left: O;
        border-radius:  ${PAD_RADIUS}px 0 0 ${PAD_RADIUS}px;
        `
      : `
      right: 0;
      border-radius: 0 ${PAD_RADIUS}px ${PAD_RADIUS}px 0;
      `}
  top: ${PAD_BRANCH_LENGTH}px;
`;
