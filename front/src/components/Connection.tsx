import React, { useState } from "react";
import styled from "styled-components";

interface IConnection {
  onConnection: (ws: WebSocket) => void;
}

function Connection(props: IConnection) {
  const [text, setText] = useState("");

  const handleConnection = (ip: string) => {
    const socket = new WebSocket(`ws://${ip}`);
    socket.onopen = () => {
      console.log("Conn open!");
      props.onConnection(socket);
    };
    socket.onerror = (e) => {
      console.log(e);
    };
  };

  return (
    <Container>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => handleConnection(text)}>Connect</button>
    </Container>
  );
}

export default Connection;

const Container = styled.div`
  margin: 32px;
`;
