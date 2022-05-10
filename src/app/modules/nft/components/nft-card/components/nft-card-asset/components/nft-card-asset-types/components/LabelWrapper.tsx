import { Flex, FlexProps, Image } from '@chakra-ui/react';
import React from 'react';

const styles: FlexProps = {
  bg: 'rgba(0, 0, 0, 0.1)',
  borderRadius: '4px',
  ml: '4px',
  p: '5px',
  h: '20px',
  w: '20px',
  zIndex: 1,
};

interface ILabelWrapperProps extends FlexProps {
  icon: string;
}

export const LabelWrapper = ({ icon, ...rest }: ILabelWrapperProps) => (
  <Flex {...styles} {...rest}>
    <Image src={icon} />
  </Flex>
);
