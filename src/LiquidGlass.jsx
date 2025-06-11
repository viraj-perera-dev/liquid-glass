import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { Application } from 'pixi.js';
import { DisplacementFilter } from "@pixi/filter-displacement";
import "./liquid-glass.css";

const LiquidGlass = ({
  children,
  width = 400,
  height = 300,
  texture = "/waves.png", // relative to public folder
  style = {},
}) => {
  const containerRef = useRef(null);
  const appRef = useRef(null);

  console.log("React version:", React.version);
  console.log("Ref created:", containerRef);

  async function initApplication() {
    const app = new Application();
        await app.init({
          width,
          height,
          transparent: true,
        });
  }


  useEffect(() => {
    let app;
  
    const setup = async () => {
      app = await initApplication();
      if (!app?.canvas) return;
  
      const container = containerRef.current.appendChild(app.canvas);
      if (!container) return;
  
      container.appendChild(app.canvas);
      appRef.current = app;
  
      const background = PIXI.Sprite.from(app.renderer.generateTexture(new PIXI.Graphics()));
      background.width = width;
      background.height = height;
  
      const displacementSprite = PIXI.Sprite.from(texture);
      displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
      displacementSprite.scale.set(2);
      displacementSprite.anchor.set(0.5);
      displacementSprite.x = width / 2;
      displacementSprite.y = height / 2;
  
      const filter = new DisplacementFilter(displacementSprite);
      filter.scale.x = 30;
      filter.scale.y = 30;
  
      app.stage.addChild(displacementSprite);
      app.stage.filters = [filter];
  
      app.ticker.add(() => {
        displacementSprite.x += 1;
        displacementSprite.y += 0.5;
      });
    };
  
    setup();
  
    return () => {
      if (app) {
        app.destroy(true, true);
      }
    };
  }, [width, height, texture]);

  return (
    <div style={{ position: "relative", ...style }}>
      <div
        ref={containerRef}
        style={{
          width,
          height,
          borderRadius: "24px",
          overflow: "hidden",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          backgroundColor: "#fff",
        }}
      />
      <div style={{ position: "relative", zIndex: 1, padding: "24px", color: "#fff" }}>
        {children}
      </div>
    </div>
  );
};

export default LiquidGlass;
