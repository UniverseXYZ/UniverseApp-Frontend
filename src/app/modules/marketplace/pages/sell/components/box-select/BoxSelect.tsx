import { Center, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { useCallback } from 'react';
import { SystemStyleObject } from '@chakra-ui/styled-system';

export interface IBoxSelectProps {
  options: Array<{
    value: string;
    title: string;
    description: string;
    image: string;
  }>;
  onSelect?: (value: any) => void;
}

const styles: Record<string, SystemStyleObject> = {
  container: {
    justifyContent: 'space-between',
    flexDir: {
      base: 'column',
      md: 'row'
    },
    '> div': {
      _notLast: {
        margin: {
          base: '0 0 15px 0',
          md: '0 15px 0 0',
        }
      },
    }
  },
  item: {
    bg: 'white',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: 12,
    flex: 1,
    h: '290px',
    p: '20px',
    position: 'relative',
    textAlign: 'center',
    transition: '200ms',
    img: {
      position: 'relative',
      transition: '100ms'
    },
    _before: {
      background: 'linear-gradient(135deg, #bceb00 15.57%, #00eaea 84.88%) border-box',
      borderRadius: 'inherit',
      content: '""',
      display: 'none',
      filter: 'blur(4px)',
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%',
      zIndex: -1,
    },
    _hover: {
      bg: `
        linear-gradient(#ffffff, #ffffff) padding-box, 
        linear-gradient(135deg, #bceb00 15.57%, #00eaea 84.88%) border-box
      `,
      boxShadow: 'xl',
      cursor: 'pointer',
      img: {
        transform: 'translateY(-6px)'
      },
      _before: {
        display: 'block',
      }
    }
  }
}

export const BoxSelect = ({ options, onSelect }: IBoxSelectProps) => {
  const handleOnClick = useCallback((value: string) => {
    onSelect && onSelect(value);
  }, [onSelect]);

  return (
    <Flex sx={styles.container}>
      {options.map((option, i) => (
        <Center key={i} sx={styles.item} onClick={() => handleOnClick(option.value)}>
          <Flex flexDir={'column'} alignItems={'center'}>
            <Image src={option.image} maxW={'72px'} maxH={'72px'} mb={'24px'} />
            <Heading as={'h4'} fontFamily={'Space Grotesk'} fontSize={'18px'} mb={'4px'}>{option.title}</Heading>
            <Text color={'rgba(0, 0, 0, 0.4)'} fontSize={'14px'} mb={'20px'}>{option.description}</Text>
          </Flex>
        </Center>
      ))}
    </Flex>
  );
};
