export const fill = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, g: number, b: number) => {
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
  ctx.fillRect(x, y, 1,1);
};
