export const Button = {
  baseStyle: {
    fontFamily: 'Space Grotesk',
    fontSize: '16px',
  },
  variants: {
    solid: {
      background: 'linear-gradient(170deg, #bceb00 15.57%, #00eaea 84.88%)',
      borderRadius: '12px',
      padding: '11px 26px',
      _hover: {
        background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), linear-gradient(170deg, #bceb00 15.57%, #00eaea 84.88%) !important',
      },
      _focus: {
        background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), linear-gradient(170deg, #bceb00 15.57%, #00eaea 84.88%) !important',
        boxShadow: 'xl',
      },
      _active: {
        boxShadow: 'lg',
      }
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
        boxShadow: 'inset 2px 1000px 1px white',
      }
    },
    dropDown: {
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
  }
};
