const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const  random  = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');


const settings = {
  dimensions: [2048, 2048]
  // dimensions: 'A4',
  // orientation: 'landscape',
  // units: 'cm',
  // pixelsPerInch: 300
};

const sketch = () => {
  const colorCount = random.rangeFloor(2, 3);
  const palette = random.shuffle(random.pick(palettes))
    .slice(0, colorCount);
  

  const createGrid = () => {
    const points = []
    const count = 50;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push({
          color: random.pick(palette),
          // radius: random.value() * 0.005,
          radius: Math.abs(random.gaussian() * 0.002),

          position: [u, v]
        });
      }
    }
    return points;
  }

  random.setSeed(504);
  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 400;

  return ({ context, width, height }) => {
    context.fillStyle = '#784B84';
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const {
        position,
        radius,
        color
      } = data;

      const [ u, v ] = position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      // context.strokeStyle = "black";
      context.lineWidth = 5;
      context.fillStyle = color;
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);

// canvas-sketch sketch1.js --open