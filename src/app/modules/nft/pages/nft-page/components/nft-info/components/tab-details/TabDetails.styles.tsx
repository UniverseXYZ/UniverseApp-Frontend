import { LinkProps, StackProps, TextProps } from '@chakra-ui/react';

export const HashStyle: TextProps & LinkProps = {
  color: '#4D66EB',
  cursor: 'pointer',

  _focus: {
    boxShadow: 'none',
  },
};

export const WrapperStyle: StackProps = {
  bg: 'rgba(0, 0, 0, 0.02)',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
  fontWeight: 500,
  justifyContent: 'space-between',
  padding: '18px 24px',
  w: '100%',
};

export const ItemStyle: StackProps = {
  borderTop: '1px solid rgba(0, 0, 0, 0.1)',
  fontWeight: 500,
  justifyContent: 'space-between',
  padding: '12px 0',
  w: '100%',
  marginTop: '0 !important',
  _first: {
    borderTop: 'none'
  },

  sx: {
    '&.u-column': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginLeft: '0 !important',
    }
  }
};

export const SubWrapperStyle: StackProps = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  margin: '12px 0 6px !important',
};

export const SubItemStyle: StackProps = {
  color: 'rgba(0, 0, 0, 0.6)',
  fontSize: '14px',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  w: '100%',

  sx: {
    'span': {
      flex: '1',
      borderBottom: '2px dotted rgba(0, 0, 0, 0.1)',
    }

  }
};

export const CopyStyle: StackProps = {
  opacity: '.4',
  cursor: 'pointer'
};

export const JsonWrapperStyle: StackProps = {
  color: 'rgba(0, 0, 0, 0.4)',
  fontSize: '14px',
  lineHeight: '18px',
  height: '140px',
  overflow: 'auto',
  margin: '12px 0 !important',
  wordBreak: 'break-word'
};
