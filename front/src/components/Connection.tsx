import React, { useState } from "react";
import styled from "styled-components";

interface IConnection {
  onConnection: (ws: WebSocket) => void;
  type: "screen" | "input";
}

function Connection(props: IConnection) {
  const [text, setText] = useState("");

  const handleConnection = (ip: string) => {
    const socket = new WebSocket(`ws://${ip}`);
    socket.binaryType = "arraybuffer";
    socket.onopen = () => {
      console.log("Conn open");
      socket.send(props.type);
    };
    socket.onerror = (e) => {
      console.log(e);
    };
    socket.onclose = () => {
      console.log("Conn closed");
    };
    props.onConnection(socket);
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
