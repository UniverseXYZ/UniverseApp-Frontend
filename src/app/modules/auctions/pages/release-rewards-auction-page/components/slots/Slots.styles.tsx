import { AccordionItemProps, AccordionProps, BoxProps, ButtonProps, TextProps } from '@chakra-ui/react';

export const Accordion: AccordionProps = {
  bg: 'white',
  borderRadius: '12px',
  boxShadow: '0px 10px 36px rgba(136, 120, 172, 0.14)',
  padding: ['0 20px', null, '0 30px'],
};

export const AccordionItem: AccordionItemProps = {
  borderBottom: '1px solid #0000001A',
  padding: '20px 0',

  _last: {
    borderBottom: 0,
  },
};

export const AccordionButton: ButtonProps = {
  borderRadius: ['10px', null, '6px'],
  boxSize: ['40px', null, '22px'],
  mr: '10px',
  mt: ['12px', null, 0],
  minW: '22px',
  order: [1, null, 0],
  padding: 0,

  _hover: {
    bg: 'transparent',
  },
  _focus: {
    boxShadow: 'none',
  },
  _expanded: {
    'img': {
      transform: 'rotate(180deg)',
    },
  },
};

export const SlotHeader: BoxProps = {
  alignItems: 'center',
  display: 'flex',
  flexDir: 'row',
  flexWrap: 'wrap',
  w: '100%',
};

export const TireNameLabel: TextProps = {
  border: '1px solid',
  borderRadius: '20px',
  display: 'inline-block',
  fontSize: '10px',
  fontWeight: 'bold',
  padding: '2px 6px',
};

export const BreakLine: BoxProps = {
  display: ['block', null, 'none'],
  w: '100%',
};

export const ProceedButton: ButtonProps = {
  mt: ['12px', null, 0],
  order: [2, null, 0],
  w: ['calc(100% - 40px - 12px)', null, 'fit-content'],
};

export const SlotNumberLabel: TextProps = {
  fontSize: '10px',
  fontWeight: 500,
  mr: '4px',
};

export const SlotWinnerName: TextProps = {
  fontSize: '14px',
  fontWeight: 600,
  mr: '10px',
};

export const SlotNFTsAmountLabel: TextProps = {
  fontSize: '14px',
  fontWeight: 400,
  mr: '20px',
};
