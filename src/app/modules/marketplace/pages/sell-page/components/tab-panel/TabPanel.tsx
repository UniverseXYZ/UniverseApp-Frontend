import { Heading, TabPanel as ChakraTabPanel, TabPanelProps } from '@chakra-ui/react';

interface ITabPanelProps extends TabPanelProps {
  name: string;
}

export const TabPanel = ({ name, children, ...rest }: ITabPanelProps) => (
  <ChakraTabPanel p={0} {...rest}>
    <Heading as="h3" size="md" my={'60px'}>{name}</Heading>
    {children}
  </ChakraTabPanel>
);
