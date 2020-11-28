import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const SCREEN_WIDTH = 240;
const SCREEN_HEIGHT = 160;
const SCREEN_BORDER = 32;

interface IScreen {
  ws: WebSocket | null;
}

function Screen(props: IScreen) {
  const canvas = useRef<null | HTMLCanvasElement>(null);

  useEffect(() => {
    if (props.ws) {
      props.ws.onmessage = (e) => {
        if (canvas && canvas.current) {
          const data = new Blob([e.data], { type: "image/jpeg" });
          const img = document.createElement("img");
          const urlCreator = window.URL || window.webkitURL;
          const url = urlCreator.createObjectURL(data);
          const ctx = canvas.current.getContext("2d");
          img.onload = () => {
            ctx?.drawImage(img, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
          };
          img.src = url;
        }
      };
    } else if (canvas.current) {
      const ctx = canvas.current.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#c8cad5";
        ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
      }
    }
  }, [canvas, props.ws]);

  return (
    <Container>
      <ScreenBorders>
        <canvas width={SCREEN_WIDTH} height={SCREEN_HEIGHT} ref={canvas} />
      </ScreenBorders>
    </Container>
  );
}

export default Screen;

const Container = styled.div``;

const ScreenBorders = styled.div`
  max-width: ${SCREEN_WIDTH + SCREEN_BORDER}px;
  min-width: ${SCREEN_WIDTH + SCREEN_BORDER}px;
  max-height: ${SCREEN_HEIGHT + SCREEN_BORDER}px;
  min-height: ${SCREEN_HEIGHT + SCREEN_BORDER}px;
  background-color: #1c1c24;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const DisplayPlaceholder = styled.div`
  max-width: ${SCREEN_WIDTH}px;
  min-width: ${SCREEN_WIDTH}px;
  max-height: ${SCREEN_HEIGHT}px;
  min-height: ${SCREEN_HEIGHT}px;
  background-color: #c8cad5;
`;
