import { Box, BoxProps, Image, Text } from '@chakra-ui/react';
import React, { useMemo, useRef } from 'react';
import { useHoverDirty } from 'react-use';

import checkNftIcon from '../../../assets/images/check-nft.svg';

const useStyles: (isBundle: boolean) => Record<
  'itemWrapperStyles' | 'subLayerStyles' | 'selectedLabel', BoxProps
  > = (isBundle) => {
  const itemWrapperStyles = useMemo<BoxProps>(() => {
    return {
      borderRadius: '12px',
      cursor: 'pointer',
      position: 'relative',
      p: '12px',

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
          background: 'linear-gradient(135deg, #bceb00, #00eaea) !important',
          backgroundOrigin: 'border-box !important',
          border: '2px solid transparent !important',
        },
      },

      _hover: {
        boxShadow: `0px 0px 30px rgba(0, 0, 0, ${isBundle ? 0.1 : 0.2})`,
        _after: {
          background: 'transparent',
          border: 0,
        }
      },
    };
  }, [isBundle]);

  const subLayerStyles = useMemo<BoxProps>(() => {
    return {
      background: 'white',
      border: 'inherit',
      borderRadius: 'inherit',
      position: 'absolute',
      height: '100%',
      _after: itemWrapperStyles._after,
      _selected: itemWrapperStyles?._selected,
      _hover: itemWrapperStyles?._hover,
    };
  }, [itemWrapperStyles]);

  const selectedLabel = useMemo<BoxProps>(() => {
    return {
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
    };
  }, []);

  return { itemWrapperStyles, subLayerStyles, selectedLabel };
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
  const itemWrapperRef = useRef(null);
  const isHovering = useHoverDirty(itemWrapperRef);

  const styles = useStyles(isBundle);

  return (
    <Box ref={itemWrapperRef} {...styles.itemWrapperStyles} {...rest} data-selected={isSelected || null}>
      {children}
      {isBundle && (
        <>
          <Box data-hover={isHovering || null} data-selected={isSelected || null} {...styles.subLayerStyles} top={`5px`} left={`2%`} width={`96%`} zIndex={-1} />
          <Box data-hover={isHovering || null} data-selected={isSelected || null} {...styles.subLayerStyles} top={`10px`} left={`4%`} width={`92%`} zIndex={-2} />
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

