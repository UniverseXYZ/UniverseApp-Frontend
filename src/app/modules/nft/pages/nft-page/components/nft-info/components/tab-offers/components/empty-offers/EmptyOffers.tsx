import { Flex, Image, Text } from '@chakra-ui/react';

import TextBubbleImage from '../../../../../../../../../../../assets/images/text-bubble.png';

export const OffersEmpty = () => (
  <Flex align={'center'} color={'rgba(0, 0, 0, 0.4)'} flexDir={'column'}>
    <Image src={TextBubbleImage} mt={'20px'} mb={'30px'} h={'70px'} w={'100px'} />
    <Text fontSize={'18px'} fontWeight={500} mb={'6px'}>No active offers yet.</Text>
    <Text fontSize={'14px'}>Be the first to make an offer!</Text>
  </Flex>
);
