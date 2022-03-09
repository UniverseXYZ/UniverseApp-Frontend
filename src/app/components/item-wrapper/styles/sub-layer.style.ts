import { BoxProps } from '@chakra-ui/react';
import { getItemWrapperStyle } from './item-wrapper.style';

export const getSubLayerStyle: (isBundle: boolean) => BoxProps = (isBundle) => {
  const itemWrapperStyle = getItemWrapperStyle(isBundle);

  return {
    background: 'white',
    border: 'inherit',
    borderRadius: 'inherit',
    position: 'absolute',
    height: '100%',
    _before: itemWrapperStyle._before,
    _after: itemWrapperStyle._after,
    _selected: {
      _after: {
        background: 'white !important',
        boxShadow: '0px 0px 0px 2px #00eaea',
      }
    },
  };
};
