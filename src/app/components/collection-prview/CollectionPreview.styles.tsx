import { BoxProps, ImageProps, PopoverContentProps, TextProps } from '@chakra-ui/react';
import { getRandomCollectionBGColor } from '@app/helpers';

export const PopoverContent: PopoverContentProps = {
  borderRadius: '12px',
  boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
  _focus: {
    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
  },
};

export const getBannerImageStyles: (url?: string, address?: string) => BoxProps = (url, address) => ({
  bg: url ? `url(${url}) center / cover` : getRandomCollectionBGColor(address),
  h: '80px',
});

export const getCoverImageStyles: (url?: string, address?: string) => BoxProps = (url, address) => ({
  bg: url ? `url(${url}) center / cover` : getRandomCollectionBGColor(address),
  border: '2px solid #F2F2F2',
  borderRadius: 'full',
  boxSize: '64px',
  fontFamily: '"Sharp Grotesk SemiBold"',
  fontSize: '20px',
  m: 'auto',
  mt: '-32px',
});

export const Name: TextProps = {
  fontSize: '18px',
  fontWeight: 700,
  textAlign: 'center',
};

export const GridItem: BoxProps = {
  bg: 'rgba(77, 102, 235, 0.05)',
  borderRadius: '8px',
  p: '8px 12px',
  textAlign: 'center',
};

export const GridItemLabel: TextProps = {
  color: 'rgba(77, 102, 235, 0.6)',
  fontSize: '12px',
  fontWeight: 600,
};

export const GridItemValue: TextProps = {
  color: '#4D66EB',
  fontSize: '14px',
  fontWeight: 700,
};

export const StatisticGridItem: BoxProps = {
  textAlign: 'center',
};

export const StatisticGridItemLabel: TextProps = {
  color: 'rgba(0 0 0 / 40%)',
  fontSize: '12px',
  fontWeight: 600,
};

export const StatisticGridItemValue: TextProps = {
  color: 'black',
  fontSize: '14px',
  fontWeight: 700,
};

export const EthereumIcon: ImageProps = {
  display: 'inline-block',
  mr: '4px',
  mt: '-3px',
  w: '9px',
};
