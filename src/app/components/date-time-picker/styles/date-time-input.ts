export const dateTimeInput = {
  background: 'white',
  border: '1px solid #D4D4D4',
  borderRadius: '12px',
  color: 'black',
  fontWeight: '400',
  height: 'auto',
  padding: 0,
  position: 'relative',
  textAlign: 'left',
  width: '100%',
  'span': {
    _first: {
      p: '14px',
      width: 'calc(100% - 50px)'
    },
    _last: {
      borderLeft: '1px solid #D4D4D4',
      padding: '16px',
      width: '50px'
    }
  },
  _before: {
    content: '" "',
    display: 'none',
    background: 'linear-gradient(135deg, #bceb00 15.57%, #00eaea 84.88%) border-box',
    borderRadius: 'inherit',
    filter: 'blur(4px)',
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: -1,
  },
  _hover: {
    background: 'white',
    _before: {
      display: 'block',
    },
  },
  _focus: {
    background: 'white',
  },
  _active: {
    background: 'white',
  },
};
