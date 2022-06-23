import { BoxProps, CheckboxProps, ImageProps } from '@chakra-ui/react';

export const ItemStyle: BoxProps = {
  alignItems: 'center',
  borderRadius: '10px',
  display: 'flex',
  fontSize: '14px',
  fontWeight: 500,
  padding: '10px',

  _hover: {
    bg: 'rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
  },

  _last: {
    mb: '10px',
  }
};

export const ItemCheckboxStyle: CheckboxProps = {
  mr: '12px',
  sx: {
    '.chakra-checkbox__control': {
      borderRadius: '5px',
      height: '30px',
      width: '30px',
    }
  }
};

export const ItemImageStyle: ImageProps = {
  borderRadius: '5px',
  display: 'inline-block',
  mr: '12px',
  h: '30px',
  w: '30px',
};

export const SelectedItemStyle: BoxProps = {
  alignItems: 'center',
  bg: 'linear-gradient(135deg, rgba(188, 235, 0, 0.1) 15.57%, rgba(0, 234, 234, 0.1) 84.88%), #FFFFFF',
  border: '1px solid #BCEB00',
  borderRadius: '8px',
  display: 'flex',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '20px',
  p: '5px 11px 5px 6px',
  maxH: '32px',
  mb: '8px',
  mr: '8px',

  _last: {
    mb: '20px',
  }
};

export const SelectedItemImageStyle: ImageProps = {
  borderRadius: '5px',
  display: 'inline-block',
  height: '20px',
  marginRight: '8px',
  width: '20px',
};

export const SelectedItemRemoveStyle: ImageProps = {
  cursor: 'pointer',
  height: '10px',
  marginLeft: '8px',
  width: '10px',
};

export const SelectedCollectionCoverPlaceholder: BoxProps = {
  boxSize: '20px',
  fontFamily: '"Space Grotesk"',
  fontSize: '14px',
  mr: '8px',
};
