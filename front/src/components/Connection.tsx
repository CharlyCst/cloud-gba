import React, { useState } from "react";
import styled from "styled-components";

interface IConnection {
  onConnection: (screenWs: WebSocket | null, inputWs: WebSocket | null) => void;
  type: "screen" | "input" | "both";
}

function Connection(props: IConnection) {
  const [text, setText] = useState("206.189.62.12:8100");

  const openWebSocket = (ip: string, type: "screen" | "input") => {
    const socket = new WebSocket(`ws://${ip}`);
    socket.binaryType = "arraybuffer";
    socket.onopen = () => {
      console.log("Conn open");
      socket.send(type);
    };
    socket.onerror = (e) => {
      console.log(e);
    };
    socket.onclose = () => {
      console.log("Conn closed");
    };
    return socket;
  };

  const handleConnection = (ip: string) => {
    let screenWs = null;
    let inputWs = null;
    if (props.type === "screen" || props.type === "both") {
      screenWs = openWebSocket(ip, "screen");
    }
    if (props.type === "input" || props.type === "both") {
      inputWs = openWebSocket(ip, "input");
    }
    props.onConnection(screenWs, inputWs);
  };

  return (
    <Container>
      <Input
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

const Input = styled.input`
  margin: 8px;
`;
