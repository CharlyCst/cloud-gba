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

  const drawPlaceholder = async () => {
    if (canvas.current === null) return;

    const ctx = canvas.current.getContext("2d");
    if (ctx === null) return;
    if (Math.random() > 0.5) {
      ctx.fillStyle = "#6b6b8c";
    } else {
      ctx.fillStyle = "#c8cad5";
    }

    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    setTimeout(drawPlaceholder, 200);
  };

  useEffect(() => {
    if (props.ws === null) {
      drawPlaceholder();
    } else {
      props.ws.onmessage = (e) => {
        console.log(e);
      };
    }
  }, [canvas, props.ws]);

  return (
    <Container>
      <ScreenBorders>
        {canvas ? (
          <canvas width={SCREEN_WIDTH} height={SCREEN_HEIGHT} ref={canvas} />
        ) : (
          <>
            <canvas width={0} height={0} ref={canvas} />
            <DisplayPlaceholder />
          </>
        )}
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
