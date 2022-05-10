import { useMemo } from 'react';

type IUseFluidGridFunc = (containerWidth: number, minItemWidth: number, spacingX: number) => {
  columns: number;
  spacingX: number;
};

export const useFluidGrid: IUseFluidGridFunc = (containerWidth, minItemWidth, spacingX) => {
  const columns =  useMemo(() => {
    return Math.floor(containerWidth / (minItemWidth + spacingX));
  }, [containerWidth, minItemWidth, spacingX]);

  return { columns, spacingX };
};
