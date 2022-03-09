import { Box, BoxProps, Image, Text } from '@chakra-ui/react';
import React from 'react';

import CheckNftIcon from '../../../assets/images/check-nft.svg';

import * as styles from './styles';

interface IItemWrapperProps extends BoxProps {
  isBundle?: boolean;
  isSelected?: boolean;
  selectedLabel?: string;
}

export const ItemWrapper = React.forwardRef<HTMLDivElement, IItemWrapperProps>((props, ref) => {
  const {
    isBundle = false,
    isSelected = false,
    selectedLabel,
    children,
    ...rest
  } = props;

  return (
    <Box ref={ref} {...styles.getItemWrapperStyle(isBundle)} {...rest} data-selected={isSelected || null}>
      {children}
      <Box data-selected={isSelected || null} {...styles.SelectedBorderStyle} />
      {isBundle && (
        <>
          {/*<Box data-layer data-selected={isSelected || null} {...styles.subLayerStyles} top={`5px`} left={`2%`} width={`96%`} zIndex={-2} />*/}
          {/*<Box data-layer data-selected={isSelected || null} {...styles.subLayerStyles} top={`10px`} left={`4%`} width={`92%`} zIndex={-3} />*/}
          <Box data-layer data-selected={isSelected || null} {...styles.getSubLayerStyle(isBundle)} top={`5px`} left={`2%`} width={`96%`} zIndex={1} />
          <Box data-layer data-selected={isSelected || null} {...styles.getSubLayerStyle(isBundle)} top={`10px`} left={`4%`} width={`92%`} zIndex={0} />
        </>
      )}
      {isSelected && (
        <Box {...styles.SelectedLabelStyle}>
          {selectedLabel && (<Text px={'3px'}>{selectedLabel}</Text>)}
          <Image src={CheckNftIcon} w={'10px'} h={'8px'} />
        </Box>
      )}
    </Box>
  )
});

