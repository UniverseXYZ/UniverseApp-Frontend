export const Tabs = {
  variants: {
    line: {
      tablist: {
        borderBottom: {
          base: 0,
          lg: '1px solid rgba(0, 0, 0, 0.1)',
        },
      },
      tab: {
        color: 'rgba(0, 0, 0, 0.4)',
        fontWeight: 500,
        mb: 0,
        px: 0,
        mx: '20px',

        _first: {
          ml: 0,
        },
        _last: {
          mr: 0,
        },

        _selected: {
          color: 'black',
        },
        _hover: {
          color: 'black',
        },
        _focus: {
          boxShadow: 'none',
        },
        _active: {
          bg: 'transition',
        },
      },
    },
    arrow: {
      tablist: {
        border: 0,
      },
      tab: {
        '--tab-height': {
          base: '70px',
          lg: '50px'
        },
        background: 'rgba(0, 0, 0, 0.03)',
        border: 0,
        fontFamily: '"Sharp Grotesk SemiBold", sans-serif',
        fontSize: '12px',
        flexDir: {
          base: 'column',
          lg: 'row',
        },
        padding: {
          base: '8px 16px',
          lg: '16px'
        },
        position: 'relative',
        margin: '0 3px',
        img: {
          h: '17px',
          m: {
            base: '0 0 1px 0',
            lg: '0 10px 0 0'
          },
        },
        _hover: {
          background: 'rgba(0, 0, 0, 0.1)',
          _after: {
            borderLeftColor: 'rgba(0, 0, 0, 0.1)',
          }
        },
        _focus: {
          boxShadow: 'none',
        },
        _selected: {
          background: 'black',
          color: 'white',
          _after: {
            borderLeft: '10px solid black',
          },
        },
        _disabled: {
          background: 'rgba(0, 0, 0, 0.03)',
          color: 'rgba(0, 0, 0, 0.2)',
          cursor: 'not-allowed',
          img: {
            opacity: 0.2,
          },
          _after: {
            borderLeft: '10px solid rgba(0, 0, 0, 0.03)',
          }
        },
        _before: {
          content: '" "',
          position: 'absolute',
          top: 0,
          width: 0,
          height: 0,
          borderTop: 'calc(var(--tab-height) / 2) solid transparent',
          borderBottom: 'calc(var(--tab-height) / 2) solid transparent',
          transition: 'border-color 0.2s ease',
          right: 'auto',
          left: 0,
          borderLeft: '10px solid #fff',
          zIndex: 0,
        },
        _after: {
          content: '" "',
          position: 'absolute',
          top: 0,
          right: '-10px',
          width: 0,
          height: 0,
          borderTop: 'calc(var(--tab-height) / 2) solid transparent',
          borderBottom: 'calc(var(--tab-height) / 2) solid transparent',
          borderLeft: '10px solid rgba(0, 0, 0, 0.03)',
          zIndex: 2,
          transition: 'border-color 0.2s ease',
        },
      }
    }
  }
};
