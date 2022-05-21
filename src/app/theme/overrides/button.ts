import { SystemStyleFunction } from '@chakra-ui/theme-tools';

const variantPrimary: SystemStyleFunction = () => {
  return {
    background: 'linear-gradient(135deg, #BCEB00 15.57%, #00EAEA 84.88%)',
    color: 'black',
    boxShadow: 'lg',

    _hover: {
      background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), linear-gradient(135deg, #BCEB00 15.57%, #00EAEA 84.88%)',
    },

    _focus: {
      background: 'linear-gradient(135deg, #BCEB00 15.57%, #00EAEA 84.88%)',
      boxShadow: 'lg',
    },

    _active: {
      background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), linear-gradient(135deg, #BCEB00 15.57%, #00EAEA 84.88%)',
      boxShadow: 'lg',
      transform: 'scale(0.95)',
    },

    _disabled: {
      background: 'rgba(0, 0, 0, 0.1) !important',
      boxShadow: 'none !important',
      color: 'rgba(0, 0, 0, 0.6) !important',
      transform: 'scale(1) !important',
    },

    '.chakra-button__icon': {
      m: 0,
    },
  }
};
const variantGhost: SystemStyleFunction = (props) => {
  const { colorScheme: cs } = props;

  return {
    border: 0,
    borderRadius: '12px',
    boxShadow: 'none',
    color: 'black',
    transition: '50ms ease-in',
    position: 'relative',

    _before: {
      backgroundImage: 'none',
      boxShadow: 'none',
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: 'inherit',
      padding: '1px',
      background: 'linear-gradient(101deg,#bceb00,#00eaea)',
      WebkitMask: 'linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)',
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
    },

    _hover: {
      background: 'linear-gradient(135deg, rgba(188, 235, 0, 0.1) 15.57%, rgba(0, 234, 234, 0.1) 84.88%)',
    },

    _focus: {
      boxShadow: 'none',
    },

    _active: {
      background: 'linear-gradient(135deg, rgba(188, 235, 0, 0.1) 15.57%, rgba(0, 234, 234, 0.1) 84.88%)',
      transform: 'scale(0.95)',
    },

    _disabled: {
      background: 'transparent !important',
      border: '1px solid rgba(0, 0, 0, 0.2)',
      boxShadow: 'none !important',
      color: 'rgba(0, 0, 0, 0.6) !important',
      transform: 'scale(1) !important',
      _before: {
        display: 'none',
      }
    },

    '.chakra-button__icon': {
      m: 0,
    },
  }
};
const variantGhostAlt: SystemStyleFunction = (props) => {
  const { colorScheme: cs } = props;

  type IColorScheme = 'red' | 'default';
  type IColorSchemeStyles = {
    bg: string;
    borderColor: string;
    color: string;

    _hover: {
      bg: string;
      borderColor: string;
      color: string;
    },
  };

  const colorSchemeStyles: Record<IColorScheme, IColorSchemeStyles> = {
    default: {
      bg: 'none',
      borderColor: 'rgba(0, 0, 0, 0.1)',
      color: 'black',
      _hover: {
        bg: 'rgba(0, 0, 0, 0.05)',
        borderColor: 'rgba(0, 0, 0, 0.2)',
        color: 'inherit',
      }
    },
    red: {
      bg: 'none',
      borderColor: '#FF4949',
      color: '#FF4949',
      _hover: {
        bg: 'rgba(255, 73, 73, 0.05)',
        borderColor: '#E90000',
        color: '#E90000',
      }
    },
  }

  const s = colorSchemeStyles[cs as IColorScheme] || colorSchemeStyles.default;

  return {
    bg: s.bg,
    border: '1px solid',
    borderColor: s.borderColor,
    borderRadius: '12px',
    color: s.color,
    _hover: {
      bg: s._hover.bg,
      borderColor: s._hover.borderColor,
      color: s._hover.color,
    },
    _focus: {
      boxShadow: 'none',
    },
    _active: {
      transform: 'scale(0.95)',
    },
    _disabled: {
      borderColor: 'rgba(0, 0, 0, 0.1)',
      color: 'rgba(0 0 0 / 20%)',
      opacity: 1,
      _hover: {
        borderColor: 'rgba(0, 0, 0, 0.1)',
        color: 'rgba(0 0 0 / 20%)',
      },
      _active: {
        transform: 'scale(1)',
      },
    },
    '.chakra-button__icon': {
      ml: 0,
    },
  }
};

export const Button = {
  baseStyle: {
    borderRadius: '12px',
    fontFamily: 'Space Grotesk',
    fontSize: '16px',
  },
  variants: {
    solid: {
      background: 'linear-gradient(170deg, #bceb00 15.57%, #00eaea 84.88%)',
      borderRadius: '12px',
      color: 'black',
      padding: '11px 26px',
      _hover: {
        background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), linear-gradient(170deg, #bceb00 15.57%, #00eaea 84.88%) !important',
      },
      _focus: {
        background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), linear-gradient(170deg, #bceb00 15.57%, #00eaea 84.88%) !important',
        boxShadow: 'none',
      },
      _active: {
        background: 'linear-gradient(170deg, #bceb00 15.57%, #00eaea 84.88%) !important',
        transform: 'scale(0.95)',
      },
      _disabled: {
        background: 'rgba(0, 0, 0, 0.1)',
        color: 'rgba(0, 0, 0, 0.4)',

        _hover: {
          background: 'rgba(0, 0, 0, 0.1) !important',
          color: 'rgba(0, 0, 0, 0.4) !important',
          cursor: 'not-allowed'
        },
        _active: {
          transform: 'scale(1)',
        }
      },
    },
    outline: {
      backgroundImage: 'linear-gradient(175deg,#bceb00,#00eaea)',
      backgroundOrigin: 'border-box !important',
      borderColor: 'transparent',
      borderRadius: '12px',
      boxShadow: 'inset 2px 1000px 1px #fff',
      padding: '11px 26px',
      _hover: {
        backgroundImage: 'linear-gradient(175deg,#bceb00,#00eaea)',
        backgroundOrigin: 'border-box',
        borderColor: 'transparent',
        boxShadow: 'inset 2px 1000px 1px hsla(0,0%,100%,.9)',
      },
      _focus: {
        backgroundImage: 'linear-gradient(175deg,#bceb00,#00eaea)',
        backgroundOrigin: 'border-box',
        borderColor: 'transparent',
        boxShadow: 'inset 2px 1000px 1px hsla(0,0%,100%,.9)',
      },
      _active: {
        backgroundImage: 'linear-gradient(175deg,#bceb00,#00eaea)',
        borderColor: 'transparent',
        boxShadow: 'inset 2px 1000px 1px hsla(0,0%,100%,.9)',
        transform: 'scale(0.95)',
      }
    },
    dropdown: {
      bg: 'white',
      borderRadius: '12px',
      padding: '11px 26px',
      position: 'relative',
      _before: {
        border: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 'inherit',
        position: 'absolute',
        content: '" "',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: -1,
      },
      _hover: {
        _before: {
          backgroundImage: 'linear-gradient(175deg,#bceb00,#00eaea)',
          backgroundOrigin: 'border-box',
          borderColor: 'transparent',
          boxShadow: 'inset 2px 1000px 1px white',
        },
      },
      _focus: {
        boxShadow: 'none',
        _before: {
          backgroundImage: 'linear-gradient(175deg,#bceb00,#00eaea)',
          backgroundOrigin: 'border-box',
          borderColor: 'transparent',
          boxShadow: 'inset 2px 1000px 1px white',
        },
      },
      _active: {
        boxShadow: 'none',
        _before: {
          backgroundImage: 'linear-gradient(175deg,#bceb00,#00eaea)',
          backgroundOrigin: 'border-box',
          borderWidth: '2px',
          borderColor: 'transparent',
          boxShadow: 'inset 2px 1000px 1px white',
        },
      }
    },
    simpleOutline: {
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      padding: '10px 12px',
      '.chakra-button__icon': {
        _first: {
          mr: '6px',
        },
      },
      _focus: {
        boxShadow: 'none',
      },
      _disabled: {
        color: 'rgba(0 0 0 / 20%)',
        opacity: 1,
      },
    },
    black: {
      background: 'black',
      borderRadius: '12px',
      color: 'white',
      padding: '11px 26px',
      lineHeight: '21px',
      _hover: {
        background: '#242424',
      },
      _focus: {
        background: '#242424',
        boxShadow: 'none',
      },
      _active: {
        transform: 'scale(0.95)',
      },
      _disabled: {
        background: 'rgba(0, 0, 0, 0.1)',
        color: 'rgba(0, 0, 0, 0.4)',

        _hover: {
          background: 'rgba(0, 0, 0, 0.1) !important',
          color: 'rgba(0, 0, 0, 0.4) !important',
        }
      },
    },

    // v2
    primary: variantPrimary,
    ghostAlt: variantGhostAlt,
    ghost: variantGhost,
  },
  sizes: {
    lg: {
      gap: '10px',
      padding: '14px 24px',
    },
    md: {
      gap: '8px',
      padding: '11px 16px',
    },
    sm: {
      borderRadius: '10px',
      fontSize: '14px',
      gap: '8px',
      padding: '6px 14px',
    },
  },
};

