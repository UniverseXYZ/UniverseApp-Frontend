export const Tabs = {
  variants: {
    arrow: {
      tablist: {
        border: 0,
      },
      tab: {
        background: 'white',
        border: 0,
        fontFamily: '"Sharp Grotesk", sans-serif',
        fontSize: '12px',
        padding: '16px',
        position: 'relative',
        margin: '0 3px',
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
          borderTop: '25px solid transparent',
          borderBottom: '25px solid transparent',
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
          borderTop: '25px solid transparent',
          borderBottom: '25px solid transparent',
          borderLeft: '10px solid white',
          zIndex: 2,
          transition: 'border-color 0.2s ease',
        },
      }
    }
  }
};
