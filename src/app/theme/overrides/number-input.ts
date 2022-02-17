export const NumberInput = {
  baseStyle: {},
  variants: {
    outline: {
      field: {
        bg: 'white',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        color: 'black',
        fontFamily: 'Space Grotesk',
        fontSize: '16px',
        position: 'relative',
        _focus: {
          bg: `
            linear-gradient(#ffffff, #ffffff) padding-box, 
            linear-gradient(135deg, #bceb00 15.57%, #00eaea 84.88%) border-box
          `,
          borderColor: 'transparent',
          boxShadow: '0',
        },
      }
    }
  }
};
