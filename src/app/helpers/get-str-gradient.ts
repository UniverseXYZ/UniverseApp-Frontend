import ColorHash from 'color-hash';

const colorHash = new ColorHash({ saturation: 1.0 });

const stringToColour = (s: string): string => colorHash.hex(s);

export const getStrGradient = (s: string) => {
  const s1 = s.substring(0, s.length / 2);
  const s2 = s.substring(s.length / 2);
  const c1 = stringToColour(s1);
  const c2 = stringToColour(s2);

  return [c1, c2];
};
