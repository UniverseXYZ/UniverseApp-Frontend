import { cssVar } from '@chakra-ui/theme-tools';

const $arrowBg = cssVar('popper-arrow-bg');

export const Popover = {
  baseStyle: {
  },
  variants: {
    dropdown: {
      popper: {
        zIndex: 12,
      },
      content: {
        border: 0,
        borderRadius: '12px',
        boxShadow: '0px 10px 36px rgba(136, 120, 172, 0.14) !important',
        overflow: 'hidden',
      }
    },
    tooltip: {
      body: {
        padding: '8px 12px',
      },
      content: {
        background: 'black',
        borderRadius: '12px',
        boxShadow: '0px 10px 20px rgba(136, 120, 172, 0.2)',
        color: 'white',
        fontFamily: 'Space Grotesk',
        fontSize: '12px',
        fontWeight: 400,
        [$arrowBg.variable]: 'black',
        _focus: {
          boxShadow: 'none',
        },
      },
    },
  }
};
