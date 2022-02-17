export const Button = {
  variants: {
    solid: {
      background: 'linear-gradient(135deg, #bceb00 15.57%, #00eaea 84.88%)',
      borderRadius: '12px',
      padding: '11px 26px',
      fontFamily: 'Space Grotesk',
      fontSize: '16px',
      boxShadow: 'xl',
      _hover: {
        background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), linear-gradient(135deg, #bceb00 15.57%, #00eaea 84.88%) !important',
      },
      _focus: {
        boxShadow: 'xl',
      },
      _active: {
        boxShadow: 'lg',
      }
    }
  }
};
