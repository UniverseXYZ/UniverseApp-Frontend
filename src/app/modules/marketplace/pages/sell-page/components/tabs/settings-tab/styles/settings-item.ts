export const settingsItem = {
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  mt: '30px',
  pb: '30px',
  flexWrap: 'wrap',
  position: 'relative',
  '> div:nth-of-type(1)': {
    marginBottom: {
      base: '10px',
      md: 0
    },
    paddingRight: {
      base: 0,
      md: '50px',
    },
    width: {
      base: '100%',
      md: '70%'
    },
  },
  '> div:nth-of-type(2)': {
    alignItems: 'center',
    display: 'flex',
    width: {
      base: '100%',
      md: '30%',
    },
    '> div': {
      width: '100%'
    }
  },
  '&[data-checkbox]': {
    '> div:nth-of-type(1)': {
      marginBottom: 0,
    },
    '> div:nth-of-type(2)': {
      position: {
        base: 'absolute',
        md: 'static'
      },
      right: 0,
      top: '-5px',
    },
  },
  _first: {
    mt: 0,
  },
  _last: {
    borderBottom: 0,
    pb: 0,
  },
};
