import React from "react";
import styled from "styled-components";
import { Key } from "../lib/input";

export default ActionButtonsPanel;

const BUTTON_DIAMETER = 40;
const BUTTON_MARGIN = 24;
const PANEL_WIDTH = 2 * BUTTON_MARGIN + 2 * BUTTON_DIAMETER;
const PANEL_HEIGHT = 2 * BUTTON_MARGIN + 2 * BUTTON_DIAMETER;

enum ButtonKind {
  a = "A",
  b = "B",
}

interface IActionButtons {
  ws: WebSocket | null;
}

function ActionButtonsPanel(props: IActionButtons) {
  const handler = (event: Key, up: boolean) => () => {
    if (props.ws) {
      if (up) {
        props.ws.send(`0${event}`);
      } else {
        props.ws.send(`1${event}`);
      }
    } else {
      console.log("Connection closed: can't send event");
    }
  };

  const touchHandler = (event: Key, up: boolean) => (e: React.TouchEvent) => {
    e.preventDefault();
    if (props.ws) {
      if (up) {
        props.ws.send(`0${event}`);
      } else {
        props.ws.send(`1${event}`);
      }
    } else {
      console.log("Connection closed: can't send event");
    }
  };

  return (
    <Container>
      <Button
        kind={ButtonKind.a}
        onUp={handler(Key.A, true)}
        onDown={handler(Key.A, false)}
        onTouchDown={touchHandler(Key.A, true)}
        onTouchUp={touchHandler(Key.A, false)}
      />
      <Button
        kind={ButtonKind.b}
        onUp={handler(Key.B, true)}
        onDown={handler(Key.B, false)}
        onTouchDown={touchHandler(Key.B, true)}
        onTouchUp={touchHandler(Key.B, false)}
      />
    </Container>
  );
}

const Container = styled.div`
  height: ${PANEL_HEIGHT}px;
  width: ${PANEL_WIDTH}px;
  position: relative;
`;

interface IButtonProps {
  kind: ButtonKind;
  onUp: () => void;
  onDown: () => void;
  onTouchUp: (e: React.TouchEvent) => void;
  onTouchDown: (e: React.TouchEvent) => void;
}

function Button(props: IButtonProps) {
  return (
    <ButtonContainer
      kind={props.kind}
      onMouseDown={props.onDown}
      onMouseUp={props.onUp}
      onTouchStart={props.onTouchDown}
      onTouchEnd={props.onTouchUp}
    >
      <span>{props.kind}</span>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div<{ kind: ButtonKind }>`
  background-color: #c8cad5;
  height: ${BUTTON_DIAMETER}px;
  width: ${BUTTON_DIAMETER}px;
  border-radius: ${BUTTON_DIAMETER}px;
  border: 0;
  display: flex;
  justify-content: center;
  position: absolute;
  top: ${(props) =>
    props.kind === ButtonKind.a
      ? `${BUTTON_MARGIN}px`
      : `${BUTTON_MARGIN + BUTTON_DIAMETER}px`};
  left: ${(props) =>
    props.kind === ButtonKind.a
      ? `${BUTTON_MARGIN + BUTTON_DIAMETER}px`
      : `${BUTTON_MARGIN}px`};

  span {
    margin: auto;
  }

  :active {
    filter: brightness(85%);
  }
`;
