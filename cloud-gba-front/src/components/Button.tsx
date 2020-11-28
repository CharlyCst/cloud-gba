import React from "react";
import styled from "styled-components";

const BUTTON_DIAMETER = 40;

interface IButtonProps {
  text: String;
}

function Button(props: IButtonProps) {
  return (
    <Container>
      <span>{props.text}</span>
    </Container>
  );
}

export default Button;

const Container = styled.div`
  background-color: #c8cad5;
  height: ${BUTTON_DIAMETER}px;
  width: ${BUTTON_DIAMETER}px;
  border-radius: ${BUTTON_DIAMETER}px;
  display: flex;
  justify-content: center;

  span {
    margin: auto;
  }
`;
