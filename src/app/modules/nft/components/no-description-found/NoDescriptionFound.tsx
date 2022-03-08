import {
    Box,
    Image,
    Text,
  } from '@chakra-ui/react';
  
  import BubbleIcon from '../../../../../assets/images/text-bubble.png';
  
  export const NoDescriptionFound = () => {
  
    return (
      <Box color={'rgba(0 0 0 / 40%)'} textAlign={'center'} m={'90px 0 120px'}>
        <Image src={BubbleIcon} alt='bubble-icon' m={'auto'} />
        <Box fontSize={'18px'} fontWeight={500}>
          <Text m={'30px 0 6px'}>This collection doesn’t have a description yet</Text>
        </Box>
      </Box>
    );
  };
  