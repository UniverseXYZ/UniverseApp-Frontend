import { Heading, TabPanel as ChakraTabPanel } from '@chakra-ui/react';
import { TabPanelProps } from '@chakra-ui/tabs/dist/declarations/src/tabs';
import React from 'react';

interface ITabPanelProps extends TabPanelProps {
  name: string;
}

export const TabPanel = ({ name, children, ...rest }: ITabPanelProps) => (
  <ChakraTabPanel p={0} {...rest}>
    <Heading as="h3" size="md" my={'60px'}>{name}</Heading>
    {children}
  </ChakraTabPanel>
);
