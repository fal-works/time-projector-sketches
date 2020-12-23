/**
 * ---- Main ----------------------------------------------------------------
 */

import * as p5s from "@fal-works/p5-scaler";
import p5 from "p5";

let p: p5;
// const scaler = p5s.variableRatio({ height: 540 });
const scaler = p5s.fixedSize({ width: 960, height: 540 });
const autoResize = p5s.createAutoCanvasResizer(scaler);

const setup = () => {
  scaler.createCanvas();

  p.noFill();
  p.stroke(0);
  p.strokeWeight(6);
};

const drawSketch = () => {
  const size = 400;
  p.circle(0, 0.1 * p.frameCount, size);
};

const draw = () => {
  autoResize();

  p.background(224);
  p.translate(p.width / 2, p.height / 2);
  scaler.drawOnCanvas(drawSketch);
};

const sketch = { setup, draw };

// ---- start sketch ----

new p5((p5Inst) => {
  p = p5Inst;
  Object.assign(p, sketch);
  scaler.setP5Instance(p);
}, document.getElementById("Sketch") || undefined);
