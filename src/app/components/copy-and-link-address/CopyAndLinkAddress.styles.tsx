import { BoxProps } from '@chakra-ui/react';

export const AddressWrapperStyle: BoxProps = {
  display: 'flex',
  alignItems: 'center',
  margin: '6px 0',
  sx: {
    '.c-address__link': {
      background: 'rgba(77, 102, 235, 0.15)',
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
      padding: '3px 6px',
      outline: 'none',
      boxShadow: 'none',
      _hover: {
        background: 'rgba(77, 102, 235, 0.3)',
      }
    }
  }
}

export const AddressCopyStyle: BoxProps = {
  background: 'rgba(77, 102, 235, 0.1)',
  borderTopLeftRadius: '8px',
  borderBottomLeftRadius: '8px',
  position: 'relative',
  width: 'fit-content',
  cursor: 'pointer',
}

export const AddressCopiedStyle: BoxProps = {
  position: 'absolute',
  minWidth: 'fit-content',
  height: '27px',
  background: '#000',
  borderRadius: '100px',
  fontWeight: 'bold',
  fontSize: '12px',
  textAlign: 'center',
  color: '#ffffff',
  top: '-115%',
  left: '25%',
  padding: '4px 12px',
  _active: {
    background: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
  },
  sx: {
    'span': {
      position: 'absolute',
      width: '7.6px',
      height: '7.6px',
      left: '25px',
      top: '23px',
      background: '#000',
      transform: 'matrix(0.71, 0.7, -0.71, 0.71, 0, 0)',
    }
  }
}
