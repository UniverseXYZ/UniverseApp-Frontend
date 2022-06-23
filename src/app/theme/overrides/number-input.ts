export const NumberInput = {
  baseStyle: {
    field: {
      transition: 'none',
    }
  },
  variants: {
    outline: {
      field: {
        bg: 'white',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        color: 'black',
        fontFamily: 'Space Grotesk',
        fontSize: '16px',
        position: 'relative',
        _hover: {
          bg: `
            linear-gradient(#ffffff, #ffffff) padding-box, 
            linear-gradient(135deg, #bceb00 15.57%, #00eaea 84.88%) border-box
          `,
          borderColor: 'transparent',
          boxShadow: 'none',
        },
        _focus: {
          bg: `
            linear-gradient(#ffffff, #ffffff) padding-box,
            linear-gradient(135deg, #bceb00 15.57%, #00eaea 84.88%) border-box
          `,
          borderColor: 'transparent',
          boxShadow: '0px 0px 0px 5px rgba(102, 234, 90, 0.15)',
        },
        _invalid: {
          borderColor: '#FF4949',
          boxShadow: 'none',

          _hover: {
            borderColor: '#FF4949',
          },

          _focus: {
            borderColor: '#FF4949',
            boxShadow: '0px 0px 0px 5px rgba(255, 73, 73, 0.1)',
          },
        },
      }
    }
  },
  sizes: {
    md: {
      field: {
        height: '50px',
      }
    }
  },
};
