import { Box, Flex, Image } from '@chakra-ui/react';

import { INFTPropertyProps, NFTProperty } from '../nft-property';
import { bgColor, borderColor, icons } from './constants';
import { PropertyTraitVariant } from './enums';

interface IPolymorphPropertyTraitProps extends INFTPropertyProps {
  variant?: PropertyTraitVariant;
}

export const PolymorphPropertyTrait = (
  {
    property,
    variant = PropertyTraitVariant.default,
    ...props
  }: IPolymorphPropertyTraitProps
) => {

  return (
    <Box
      position={'relative'}
      sx={{
        bg: borderColor[variant],
        borderRadius: '12px',
      }}
    >
      {variant !== PropertyTraitVariant.default && (
        <Box
          sx={{
            '--size': '30px',
            bg: borderColor[variant],
            borderRadius: '50%',
            position: 'absolute',
            top: 'calc(var(--size) / 3 * -1)',
            right: 'calc(var(--size) / 3 * -1)',
            padding: '1px',
            h: 'var(--size)',
            w: 'var(--size)',
          }}
        >
          <Flex sx={{
            alignItems: 'center',
            bg: 'white',
            borderRadius: 'inherit',
            justifyContent: 'center',
            h: '100%',
            w: '100%',
          }}>
            <Image src={icons[variant]} ml={'2px'} />
          </Flex>
        </Box>
      )}
      <Box
        sx={{
          bg: 'white',
          borderRadius: '11px',
          m: '1px',
        }}
      >
        <NFTProperty
          property={property}
          sx={{
            bg: bgColor[variant],
            border: 0,
            borderRadius: 'inherit',
          }}
        />
      </Box>
    </Box>
  );
}
