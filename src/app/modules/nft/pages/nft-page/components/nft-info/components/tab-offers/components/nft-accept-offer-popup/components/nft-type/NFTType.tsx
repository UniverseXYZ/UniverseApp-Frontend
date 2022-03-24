import { Box, BoxProps, Tooltip } from '@chakra-ui/react';
import React from 'react';

import BundleSVGIcon from '../../../../../../../../../../../../../assets/images/v2/bundle-white.svg';
import CompositionSVGIcon from '../../../../../../../../../../../../../assets/images/v2/composition-white.svg';

type IType = 'bundle' | 'composition';

const labels: Record<IType, (count: number) => string> = {
  bundle: (count) => `Bundle: ${count} NFTs`,
  composition: (count) => `Composition: ${count} assets`,
}

const icons: Record<IType, string> = {
  bundle: BundleSVGIcon,
  composition: CompositionSVGIcon,
}

const getIconStyle: (Icon: string) => BoxProps = (Icon) => ({
  alignItems: 'center',
  bg: `url(${Icon}) center no-repeat, rgba(0, 0, 0, 0.4)`,
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'center',
  h: '32px',
  left: '5px',
  position: 'absolute',
  top: '5px',
  w: '32px',
});

interface INFTTypeProps {
  type: IType;
  count: number;
}

export const NFTType = ({ type, count }: INFTTypeProps) => {
  return (
    <Tooltip label={labels[type](count)} hasArrow variant={'black'} placement={'top'}>
      <Box {...getIconStyle(icons[type])}  />
    </Tooltip>
  );
}
