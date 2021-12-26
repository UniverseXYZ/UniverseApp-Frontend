import { Box, BoxProps, Flex, Text } from '@chakra-ui/react';
import * as styles from './styles';

interface INFTTabItemWrapperProps extends BoxProps {
  label?: string;
  containerProps?: BoxProps;
}

export const NFTTabItemWrapper = ({label, containerProps, children, ...rest}: INFTTabItemWrapperProps) => {
  return (
    <Box
      {...styles.WrapperStyles}
      bg={!!label
        ? 'linear-gradient(90deg, rgba(42,208,202,1) 0%, rgba(225,246,100,1) 20%, rgba(254,176,254,1) 40%, rgba(171,179,252,1) 60%, rgba(93,247,164,1) 80%, rgba(88,196,246,1) 100%)'
        : 'white'}
      borderColor={!!label ? 'transparent' : 'rgba(0, 0, 0, 0.1)'}
      {...rest}
    >
      {!!label && (
        <Box {...styles.LabelWrapperStyles}>
          <Box {...styles.LabelContainerStyles}>
            <Text {...styles.LabelTextStyles}>{label}</Text>
          </Box>
        </Box>
      )}
      <Flex {...styles.ContainerStyles} {...containerProps}>{children}</Flex>
    </Box>
  );
}
