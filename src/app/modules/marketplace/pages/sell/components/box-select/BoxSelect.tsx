import { Button, Center, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { useCallback } from 'react';

export interface IBoxSelectItem {
  value: string;
  title: string;
  description: string;
  image: string;
}

export interface IBoxSelectProps {
  options: IBoxSelectItem[];
  onSelect?: (value: string) => void;
}

export const BoxSelect = ({ options, onSelect }: IBoxSelectProps) => {
  const handleOnClick = useCallback((value: string) => {
    onSelect && onSelect(value);
  }, [onSelect]);

  return (
    <Flex justifyContent={'space-between'} sx={{
      '> div': {
        _notLast: {
          marginRight: '15px',
        },
      }
    }}>
      {options.map((option, i) => (
        <Center
          key={i}
          border={'1px solid rgba(0, 0, 0, 0.1)'}
          borderRadius={12}
          flex={1}
          h="290px"
          textAlign={'center'}
          p={'20px'}
          sx={{
            _hover: {
              boxShadow: 'xl',
              bg: `
                linear-gradient(#ffffff, #ffffff) padding-box, 
                linear-gradient(135deg, #bceb00 15.57%, #00eaea 84.88%) border-box`,
              cursor: 'pointer',
            }
          }}
          onClick={() => handleOnClick(option.value)}
        >
          <Flex flexDir={'column'} alignItems={'center'}>
            <Image src={option.image} maxW={'72px'} maxH={'72px'} mb={'24px'} />
            <Heading as={'h4'} fontFamily={'Space Grotesk'} fontSize={'18px'} mb={'4px'}>{option.title}</Heading>
            <Text color={'rgba(0, 0, 0, 0.4)'} fontSize={'14px'} mb={'20px'}>{option.description}</Text>
            <Button>Select</Button>
          </Flex>
        </Center>
      ))}
    </Flex>
  );
};
