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
      background: 'linear-gradient(#ffffff, #ffffff) padding-box,linear-gradient(135deg, #bceb00 15.57%, #00eaea 84.88%) border-box',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderColor: 'transparent',
      borderRadius: '12px',
      padding: '11px 26px',
      _hover: {
        background: 'linear-gradient(#ffffff, #ffffff) padding-box,linear-gradient(135deg, #bceb00 15.57%, #00eaea 84.88%) border-box',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderColor: 'transparent',
        boxShadow: 'xl',
      },
      _focus: {
        boxShadow: 'xl',
      },
      _active: {
        background: 'linear-gradient(#ffffff, #ffffff) padding-box,linear-gradient(135deg, #bceb00 15.57%, #00eaea 84.88%) border-box',
        boxShadow: 'lg',
      }
    },
  }
};
