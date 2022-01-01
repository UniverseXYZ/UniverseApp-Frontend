import { useCallback, useState } from 'react';

export const useBuyNFTSection = (_maxValue: number) => {
  const [index, setIndex] = useState(0);
  const [maxValue] = useState(_maxValue);

  const handleNext = useCallback(() => {
    setIndex(index + 1 < maxValue ? index + 1 : 0)
  }, [index, maxValue]);

  return {
    index,
    changeBuyNFTSection: handleNext,
  };
};
