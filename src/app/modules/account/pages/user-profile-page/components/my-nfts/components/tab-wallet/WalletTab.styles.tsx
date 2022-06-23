import { BoxProps } from '@chakra-ui/react';

export const FiltersWrapper: BoxProps = {
  padding: ['0px 20px', null, null, null, 0],
  pos: 'sticky',
  top: '-1px',
  mb: '20px',
  zIndex: 20,

  sx: {
    '.search--sort--filters--section': {
      mb: 0,
    },
  },
}
