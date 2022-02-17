import { useCallback, useEffect, useState } from 'react';
import { useRafLoop } from 'react-use';

export const R = (x: number, y: number, t: number) => {
  return (Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + t )));
}

export const G = (x: number, y: number, t: number) => {
  return (Math.floor(192 + 64 * Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300 )));
}

export const B = (x: number, y: number, t: number) => {
  return (Math.floor(192 + 64 * Math.sin(5 * Math.sin(t / 9) + ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100)));
}

export const fill = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, g: number, b: number) => {
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
  ctx.fillRect(x, y, 1,1);
};

export const useAudioAnimation = (context: CanvasRenderingContext2D | null, running: boolean) => {
  const [t, setT] = useState(0);

  const run = useCallback(() => {
    if (context) {
      for (let x = 0; x <= 35; x++) {
        for (let y = 0; y <= 35; y++) {
          fill(context, x, y, R(x, y, t), G(x, y, t), B(x, y, t));
        }
      }
      setT(t + 0.04);
    }
  }, [context, t]);

  const [loopStop, loopStart] = useRafLoop(() => {
    run();
  });

  useEffect(() => {
    run();
  }, [context]);

  useEffect(() => {
    running ? loopStart() : loopStop();
  }, [running]);
}
