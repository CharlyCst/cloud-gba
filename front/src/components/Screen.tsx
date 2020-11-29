import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const SCREEN_WIDTH = 240;
const SCREEN_HEIGHT = 160;
const SCREEN_BORDER = 32;

interface IScreen {
  ws: WebSocket | null;
  fullScreen: boolean;
}

function Screen(props: IScreen) {
  const canvas = useRef<null | HTMLCanvasElement>(null);
  const container = useRef<null | HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (props.ws) {
      props.ws.onmessage = (e) => {
        if (canvas && canvas.current) {
          const data = new Blob([e.data], { type: "image/jpeg" });
          const img = document.createElement("img");
          const urlCreator = window.URL || window.webkitURL;
          const url = urlCreator.createObjectURL(data);
          const ctx = canvas.current.getContext("2d");
          if (ctx) {
            ctx.imageSmoothingEnabled = false;
            img.onload = () => {
              ctx?.drawImage(
                img,
                0,
                0,
                SCREEN_WIDTH * zoom,
                SCREEN_HEIGHT * zoom
              );
            };
            img.src = url;
          }
        }
      };
    } else if (canvas.current) {
      const ctx = canvas.current.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#c8cad5";
        ctx.fillRect(0, 0, SCREEN_WIDTH * zoom, SCREEN_HEIGHT * zoom);
      }
    }
  }, [canvas, zoom, props.ws]);

  useEffect(() => {
    if (container && container.current) {
      const w = container.current.offsetWidth;
      const h = container.current.offsetHeight;
      console.log(h, w);
      if (
        w >= 4 * SCREEN_WIDTH + SCREEN_BORDER &&
        h >= 4 * SCREEN_HEIGHT + SCREEN_BORDER
      ) {
        setZoom(4);
      } else if (
        w >= 2 * SCREEN_WIDTH + SCREEN_BORDER &&
        h >= 2 * SCREEN_HEIGHT + SCREEN_BORDER
      ) {
        setZoom(2);
      }
    }
  }, [container]);

  return (
    <Container ref={container} fullScreen={props.fullScreen}>
      <ScreenBorders zoom={zoom}>
        <Canvas
          width={SCREEN_WIDTH * zoom}
          height={SCREEN_HEIGHT * zoom}
          ref={canvas}
        />
      </ScreenBorders>
    </Container>
  );
}

export default Screen;

const Container = styled.div<{ fullScreen: boolean }>`
  ${(props) =>
    props.fullScreen
      ? `width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;`
      : ""}
`;

const ScreenBorders = styled.div<{ zoom: number }>`
  max-width: ${(props) => props.zoom * SCREEN_WIDTH + SCREEN_BORDER}px;
  min-width: ${(props) => props.zoom * SCREEN_WIDTH + SCREEN_BORDER}px;
  max-height: ${(props) => props.zoom * SCREEN_HEIGHT + SCREEN_BORDER}px;
  min-height: ${(props) => props.zoom * SCREEN_HEIGHT + SCREEN_BORDER}px;
  background-color: #1c1c24;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Canvas = styled.canvas`
  image-rendering: optimizeSpeed;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: optimize-contrast;
  -ms-interpolation-mode: nearest-neighbor;
`;
