import { useBreakpointValue } from '@chakra-ui/react';
import { useState } from 'react';

import { useFluidGrid } from '@app/hooks/useFluidGrid';

export enum NFTCardSize {
  LG = 'LG',
  SM = 'SM',
}

export const useNFTFluidGrid = (containerWidth: number, spacing: number) => {
  const sizes: Record<NFTCardSize, number> = {
    [NFTCardSize.SM]: useBreakpointValue({ base: 150, md: 200 }) ?? 200,
    [NFTCardSize.LG]: useBreakpointValue({ base: 300 }) ?? 300,
  };

  const [size, setSize] = useState<NFTCardSize>(NFTCardSize.LG);

  const { columns } = useFluidGrid(containerWidth, sizes[size], spacing);

  return { columns, spacing, size, setSize };
};
