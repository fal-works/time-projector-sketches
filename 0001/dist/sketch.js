/**
 * Time Projector / sketch no. 1
 *
 * src: https://github.com/fal-works/time-projector-sketches
 *
 * @copyright 2020 FAL ( https://www.fal-works.com/ )
 * @license MIT
 * @version 0.1.0
 */

(function (p5) {
  "use strict";

  /**
   * p5-scaler
   * --------------------------------------------------------------------------
   * Small library for scaling p5.js sketches.
   * https://fal-works.github.io/p5-scaler/
   * @module p5-scaler
   * @copyright 2020 FAL
   * @author FAL <contact@fal-works.com>
   * @license MIT
   * @version 0.2.0
   */

  /** @returns `true` if `a` equals `b`. */
  const equalScaledCanvasSize = (a, b) => {
    if (a.scaleFactor !== b.scaleFactor) return false;
    const sizeA = a.logical;
    const sizeB = b.logical;
    return sizeA.width === sizeB.width && sizeB.height === sizeB.height;
  };

  /**
   * Creates a function that checks the change in required canvas size
   * and resizes the actual canvas if needed.
   */
  const createAutoCanvasResizer = (scaler) => {
    let lastSize = scaler.getSize();
    const { updateRequiredSize } = scaler;
    return (onResizeCanvas, noRedraw = false) => {
      const newSize = updateRequiredSize();
      if (equalScaledCanvasSize(lastSize, newSize)) return;
      scaler.resizeCanvas(noRedraw);
      if (onResizeCanvas) onResizeCanvas(newSize);
      lastSize = newSize;
    };
  };

  /**
   * Creates a `Scaler` instance with a fixed size without scaling.
   * This is just for compatibility with other scaling modes of `p5-scaler`.
   */
  const fixedSize = (params) => {
    const { width, height } = params;
    const logical = { width, height };
    const size = { logical, physical: logical, scaleFactor: 1.0 };
    let p = window;
    return {
      createCanvas: (renderer = "p2d") =>
        p.createCanvas(width, height, renderer),
      resizeCanvas: () => {},
      drawOnCanvas: (drawCallback) => drawCallback(p),
      getSize: () => size,
      updateRequiredSize: () => size,
      setP5Instance: (p5Instance) => (p = p5Instance),
    };
  };

  /**
   * ---- Main ----------------------------------------------------------------
   */
  let p;
  // const scaler = p5s.variableRatio({ height: 540 });
  const scaler = fixedSize({ width: 960, height: 540 });
  const autoResize = createAutoCanvasResizer(scaler);
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
})(p5);
