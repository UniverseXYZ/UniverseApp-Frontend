import { AccordionButtonProps, AccordionItemProps, BoxProps } from '@chakra-ui/react';

export const WrapperStyle: BoxProps = {
  maxH: { base: 'fit-content', md: '215px' },
  overflowY: 'scroll',
  px: 0,
};

export const AccordionItemStyle: AccordionItemProps = {
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',

  _last: {
    borderBottom: 0,
  },
};

export const AccordionButtonStyle: AccordionButtonProps = {
  padding: '20px 0',

  _hover: {
    bg: 'transparent',
  },
  _focus: {
    boxShadow: 0,
  },
};

export const GroupItemsAmountLabelStyle: BoxProps = {
  alignItems: 'center',
  bg: 'black',
  borderRadius: '4px',
  color: 'white',
  display: 'inline-flex',
  justifyContent: 'center',
  padding: '2px 4px',
  fontSize: '10px',
  fontWeight: 700,
  ml: '8px',
};
