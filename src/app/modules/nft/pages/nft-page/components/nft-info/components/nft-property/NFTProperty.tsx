import { Box, BoxProps, Text, TextProps } from '@chakra-ui/react';
import properties from "../../../../../../../../../components/marketplaceTabComponents/Properties";

const PropertyContainerStyles: BoxProps = {
  bg: 'rgba(0, 0, 0, 0.02)',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  borderRadius: '12px',
  fontSize: '12px',
  padding: '13px',
  textAlign: 'center',
}

const PropertyNameStyles: TextProps = {
  fontSize: '10px',
  fontWeight: 500,
  mb: '5px',
  textTransform: 'uppercase',
}

const PropertyValueStyles: TextProps = {
  fontWeight: 700,
  mb: '3px',
};

const PropertyDescriptionStyles: TextProps = {
  color: 'rgba(0, 0, 0, 0.4)',
  fontWeight: 400,
};

export interface INFTProperty {
  entity: { [key: string]: string};
  name?: string;
  value?: string;
}

export interface INFTPropertyProps extends BoxProps, INFTProperty {}

export const NFTProperty = ({ entity, ...props }: INFTPropertyProps) => {
  return (
    <Box {...PropertyContainerStyles} {...props}>
      <Text {...PropertyNameStyles}>{Object.keys(entity)[0]}</Text>
      <Text {...PropertyValueStyles}>{entity[Object.keys(entity)[0]]}</Text>
      {/*{description && (<Text {...PropertyDescriptionStyles}>{description}</Text>)}*/}
    </Box>
  );
};
