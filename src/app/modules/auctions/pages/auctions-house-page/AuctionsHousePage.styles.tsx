import { TabListProps, TabPanelProps, TabProps } from '@chakra-ui/react';

export const TabList: TabListProps = {
  borderBottom: 0,
  justifyContent: 'center',
  m: 'auto',
};

export const Tab: TabProps = {
  bg: '#252525',
  border: 0,
  borderRadius: '12px 12px 0 0',
  color: 'white',
  fontFamily: '"Sharp Grotesk SemiBold"',
  fontSize: '12px',
  fontWeight: 600,
  margin: 0,
  padding: '16px 37px',
  pos: 'relative',

  sx: {
    '[data-selected-corner]': {
      bottom: 0,
      boxSize: '12px',
      color: 'transparent',
      display: 'block',
      pos: 'absolute',
      transition: '0.2s',
    },
    '[data-selected-corner="left"]': {
      left: '-12px',
    },
    '[data-selected-corner="right"]': {
      right: '-12px',
      transform: 'scaleX(-100%)',
    },
  },

  _hover: {
    bg: '#393939',
    color: 'white',
  },

  _selected: {
    bg: 'white !important',
    color: 'black !important',
    zIndex: 10,

    '[data-selected-corner]': {
      color: 'white',
    },
  },
};

export const TabPanel: TabPanelProps = {
  paddingTop: '60px',
};
