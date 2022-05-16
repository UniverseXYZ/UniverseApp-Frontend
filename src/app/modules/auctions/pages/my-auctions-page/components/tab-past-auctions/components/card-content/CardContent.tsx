import { Image, StackProps, Text, VStack } from '@chakra-ui/react';

import BubbleImage from '@assets/images/text-bubble-2x.png';

import * as s from './CardContent.styles';

interface ICardContentProps extends StackProps {
  title: string;
  description: string;
}

export const CardContent = (props: ICardContentProps) => {
  const {
    title,
    description,
    children,
    ...rest
  } = props;

  return (
    <VStack spacing={'30px'} py={'30px'} w={'100%'} {...rest}>
      <Image src={BubbleImage} alt={'Bubble image'} w={'100px'} />
      <VStack spacing={'6px'}>
        <Text {...s.Title}>{title}</Text>
        <Text {...s.Description}>{description}</Text>
      </VStack>
      {children}
    </VStack>
  );
};
