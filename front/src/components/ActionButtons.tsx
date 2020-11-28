import React from "react";
import styled from "styled-components";

export default ActionButtonsPanel;

const BUTTON_DIAMETER = 40;
const BUTTON_MARGIN = 24;
const PANEL_WIDTH = 2 * BUTTON_MARGIN + 2 * BUTTON_DIAMETER;
const PANEL_HEIGHT = 2 * BUTTON_MARGIN + 2 * BUTTON_DIAMETER;

enum ButtonKind {
  a = "A",
  b = "B",
}

interface IActionButtons {}

function ActionButtonsPanel(props: IActionButtons) {
  return (
    <Container>
      <Button kind={ButtonKind.a} onClick={() => console.log("A")} />
      <Button kind={ButtonKind.b} onClick={() => console.log("B")} />
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
  onClick: () => void;
}

function Button(props: IButtonProps) {
  return (
    <ButtonContainer kind={props.kind} onClick={props.onClick}>
      <span>{props.kind}</span>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.button<{ kind: ButtonKind }>`
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
