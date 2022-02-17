export const Input = {
  baseStyle: {
    field: {
      transition: 'none',
    },
  },
  variants: {
    outline: {
      addon: {
        bg: 'rgba(0, 0, 0, 0.02)',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        color: 'rgba(0, 0, 0, 0.4)',
        fontSize: '14px',
      },
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
          boxShadow: '0',
        },
        _focus: {
          bg: `
            linear-gradient(#ffffff, #ffffff) padding-box, 
            linear-gradient(135deg, #bceb00 15.57%, #00eaea 84.88%) border-box
          `,
          borderColor: 'transparent',
          borderWidth: '2px',
          boxShadow: '0',
        },
      }
    }
  },
  sizes: {
    md: {
      field: {
        height: '50px',
      },
      addon: {
        height: '50px',
      }
    }
  },
};
