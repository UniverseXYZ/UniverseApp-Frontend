import { Flex, Image, Text } from '@chakra-ui/react';

import TextBubbleImage from '../../../../../../../../../../assets/images/text-bubble.png';

interface IOffersEmpty {
  title: string;
  subtitle?: string;
}

export const EventsEmpty = (props: IOffersEmpty) => {
  const { title, subtitle } = props;
  return (
    <Flex align={'center'} color={'rgba(0, 0, 0, 0.4)'} flexDir={'column'}>
      <Image src={TextBubbleImage} mt={'20px'} mb={'30px'} h={'70px'} w={'100px'} />
      <Text fontSize={'18px'} fontWeight={500} mb={'6px'}>
        {title}
      </Text>
      {subtitle && <Text fontSize={'14px'}>{subtitle}</Text>}
    </Flex>
  );
};
