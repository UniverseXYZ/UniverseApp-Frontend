import { Box, BoxProps, Image, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';

import checkNftIcon from '../../../assets/images/check-nft.svg';

const useStyles: (isBundle: boolean) => Record<
  'itemWrapperStyles' | 'subLayerStyles' | 'selectedLabel' | 'selectedBorder', BoxProps
  > = (isBundle) => {
  const itemWrapperStyles = useMemo<BoxProps>(() => ({
    borderRadius: '12px',
    cursor: 'pointer',
    position: 'relative',

    _after: {
      background: 'rgba(0, 0, 0, 0.1)',
      backgroundOrigin: 'border-box',
      border: '1px solid transparent',
      borderRadius: 'inherit',
      boxShadow: 'inset 2px 1000px 1px #fff',
      content: '""',
      h: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      w: '100%',
      zIndex: -1,
    },

    _selected: {
      _after: {
        background: 'white !important',
      },
    },

    sx: {
      '&:hover, &:hover [data-layer]': {
        boxShadow: `0px 0px 30px rgba(0, 0, 0, ${isBundle ? 0.1 : 0.2})`,
        _after: {
          background: 'transparent',
          border: 0,
        }
      },
    }
  }), [isBundle]);

  const subLayerStyles = useMemo<BoxProps>(() => ({
    background: 'white',
    border: 'inherit',
    borderRadius: 'inherit',
    position: 'absolute',
    height: '100%',
    _after: itemWrapperStyles._after,
    _selected: {
      _after: {
        background: 'white !important',
        boxShadow: '0px 0px 0px 2px #00eaea',
      }
    },
  }), [itemWrapperStyles]);

  const selectedLabel = useMemo<BoxProps>(() => ({
    alignItems: 'center',
    background: 'linear-gradient(135deg, #BCEB00 15.57%, #00EAEA 84.88%)',
    borderRadius: '10px',
    display: 'flex',
    fontSize: '10px',
    fontWeight: 600,
    height: '20px',
    justifyContent: 'center',
    minWidth: '20px',
    p: '6px 5px',
    position: 'absolute',
    right: '-10px',
    top: '-10px',
    zIndex: 2,
  }), []);

  const selectedBorder = useMemo<BoxProps>(() => ({
    bg: 'linear-gradient(170deg, #bceb00 15.57%, #00eaea 84.88%)',
    borderRadius: '14px',
    boxShadow: 'none !important',
    display: 'none',
    height: `calc(100% + 4px)`,
    left: `-2px`,
    position: 'absolute',
    top: `-2px`,
    width: `calc(100% + 4px)`,
    zIndex: -1,
    _selected: {
      display: 'block',
    }
  }), []);

  return { itemWrapperStyles, subLayerStyles, selectedLabel, selectedBorder };
}

interface IItemWrapperProps extends BoxProps {
  isBundle?: boolean;
  isSelected?: boolean;
  selectedLabel?: string;
}

export const ItemWrapper = (
  {
    isBundle = false,
    isSelected = false,
    selectedLabel,
    children,
    ...rest
  }: IItemWrapperProps
) => {
  const styles = useStyles(isBundle);

  return (
    <Box {...styles.itemWrapperStyles} {...rest} data-selected={isSelected || null}>
      {children}
      <Box data-selected={isSelected || null} {...styles.selectedBorder} />
      {isBundle && (
        <>
          <Box data-layer data-selected={isSelected || null} {...styles.subLayerStyles} top={`5px`} left={`2%`} width={`96%`} zIndex={-2} />
          <Box data-layer data-selected={isSelected || null} {...styles.subLayerStyles} top={`10px`} left={`4%`} width={`92%`} zIndex={-3} />
        </>
      )}
      {isSelected && (
        <Box {...styles.selectedLabel}>
          {selectedLabel && (<Text px={'3px'}>{selectedLabel}</Text>)}
          <Image src={checkNftIcon} w={'10px'} h={'8px'} />
        </Box>
      )}
    </Box>
  )
};

