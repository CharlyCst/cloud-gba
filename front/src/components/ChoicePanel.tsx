import React, { useState } from "react";
import styled from "styled-components";

import { State } from "../lib/state";

interface IChoice {
  choose: (state: State) => void;
  choice: State;
}

function ChoicePanel(props: IChoice) {
  const onChoice = (state: State) => () => {
    props.choose(state);
  };

  return (
    <Container>
      <Item
        text="Screen + gamepad"
        selected={props.choice === State.full}
        onSelect={onChoice(State.full)}
      />
      <Item
        text="Screen only"
        selected={props.choice === State.screen}
        onSelect={onChoice(State.screen)}
      />
      <Item
        text="Gamepad only"
        selected={props.choice === State.input}
        onSelect={onChoice(State.input)}
      />
    </Container>
  );
}

export default ChoicePanel;

interface IItem {
  text: string;
  selected: boolean;
  onSelect: () => void;
}

function Item(props: IItem) {
  return (
    <ItemContainer>
      <Led selected={props.selected} />
      <ItemTextContainer onClick={props.onSelect}>
        {props.text}
      </ItemTextContainer>
    </ItemContainer>
  );
}

const Container = styled.div``;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Led = styled.div<{ selected: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background-color: ${(props) => (props.selected ? "#32b532" : "#d0d3db")};
  margin: auto;
  ${(props) => (props.selected ? "box-shadow: 0 0 16px #32b532;" : "")}
`;

const ItemTextContainer = styled.div`
  text-align: center;
  width: 160px;
  background-color: #423c6c;
  margin: 1rem;
  padding: 0.5rem 2rem;
  border-radius: 16px;
  color: #bbbdcb;
  cursor: pointer;
`;
