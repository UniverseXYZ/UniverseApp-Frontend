import { BoxProps } from '@chakra-ui/react';

export const NFTAssetContainerStyle: BoxProps = {
  alignItems: 'center',
  display: {
    base: 'block',
    xl: 'flex',
  },
  float: {
    xl: 'left',
  },
  justifyContent: 'center',
  minH: {
    base: 'auto',
    xl: 'calc(100vh - 80px)',
  },
  position: {
    base: 'relative',
    xl: 'sticky',
  },
  padding: {
    base: '24px 20px',
    xl: '40px 122px',
  },
  top: {
    base: 0,
    xl: '84px',
  },
  w: {
    xl: 'calc(100% - 550px)',
  },
}
