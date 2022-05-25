import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';

import { ReactComponent as PlusSVG } from '@assets/icons/plus.svg';
import { ReactComponent as MinusSVG } from '@assets/icons/minus.svg';

type Icons =
  | 'plus'
  | 'minus'
;

const icons: Record<Icons, React.FC> = {
  plus: PlusSVG,
  minus: MinusSVG,
};

interface IIconProps extends BoxProps {
  name: Icons,
}

export const Icon: React.FC<IIconProps> = (props) => {
  const { name, ...rest } = props;
  return (
    <Box as={icons[name]} {...rest}></Box>
  );
}
