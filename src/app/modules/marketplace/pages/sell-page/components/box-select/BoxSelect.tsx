import { Center, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { useCallback } from 'react';

import * as styles from './styles';

export interface IBoxSelectOption {
  value: string;
  title: string;
  description: string;
  image: string;
  disabled?: boolean;
}

export interface IBoxSelectProps {
  options: IBoxSelectOption[];
  onSelect?: (value: any) => void;
}

export const BoxSelect = ({ options, onSelect }: IBoxSelectProps) => {
  const handleOnClick = useCallback((option) => {
    onSelect && !option.disabled && onSelect(option.value);
  }, [onSelect]);

  return (
    <Flex {...styles.ContainerStyle}>
      {options.map((option, i) => (
        <Center
          key={i}
          data-disabled={option.disabled}
          {...styles.ItemStyle}
          onClick={() => handleOnClick(option)}
        >
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
