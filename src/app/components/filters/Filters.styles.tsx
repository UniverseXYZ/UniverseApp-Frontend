import {
  AccordionButtonProps,
  AccordionItemProps,
  BoxProps,
  ButtonProps,
  ImageProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalHeaderProps,
} from '@chakra-ui/react';

export const MoreFiltersButtonArrow: ImageProps = {
  width: '10px',
  transition: '200ms',
  transform: 'rotate(0deg)',
};

export const MoreFiltersButton: ButtonProps = {
  fontSize: '14px',
  minWidth: 'fit-content',
  padding: '0 12px',
  position: 'relative',
  zIndex: 1,
};

export const MobileFilterButton: ButtonProps = {
  bottom: '20px',
  padding: '15px',
  position: 'fixed',
  right: '20px',
  height: 'auto',
  width: 'auto',
  zIndex: '100',
};

export const ActiveFilterLabel: BoxProps = {
  alignItems: 'center',
  background: 'black',
  borderRadius: '20px',
  color: 'white',
  fontSize: '12px',
  justifyContent: 'center',
  height: '20px',
  minWidth: '20px',
  padding: '5px',
  position: 'absolute',
  right: 0,
  top: '-10px',
  transform: 'translateX(50%)',
};

export const ModalHeader: ModalHeaderProps = {
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  fontSize: '16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  px: {
    base: '20px !important',
    md: '30px !important',
  },
  py: '24px !important',
};

export const ModalHeaderMobileClose: BoxProps = {
  alignItems: 'center',
  display: {
    base: 'flex',
    md: 'none'
  },
};

export const ModalBody: ModalBodyProps = {
  pt: '10px !important',
  pb: '0 !important',
  px: {
    base: '20px !important',
    md: '30px !important'
  },
};

export const ModalFooter: ModalFooterProps = {
  background: 'white',
  borderTop: '1px solid rgba(0, 0, 0, 0.1)',
  bottom: 0,
  position: {
    base: 'sticky',
    md: 'static',
  },
  px: {
    base: '20px !important',
    md: '30px !important'
  },
  width: '100%',
  zIndex: 200,
}

export const AccordionItem: AccordionItemProps = {
  _notLast: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    mb: '10px',
  }
};

export const AccordionButton: AccordionButtonProps = {
  padding: '20px 0',
  fontWeight: 'bold',

  _hover: {
    bg: 'transparent',
  },
  _focus: {
    boxShadow: 'none',
  },
};
