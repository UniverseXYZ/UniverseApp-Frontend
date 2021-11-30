import { Box, Flex, Heading, Input, Text } from '@chakra-ui/react';
import React from 'react';

import * as styles from '../tabs/settings-tab/styles';
import { useMarketplaceSellData } from '../../hooks';
import { InputShadow } from '../../../../../../components';

const maxDescriptionSymbols = 500;

export const BundleForm = () => {
  const { form } = useMarketplaceSellData();
  return (
    <>
      <Flex sx={styles.settingsItem}>
        <Box width={'100% !important'} pr={'0 !important'}>
          <Box mb={'30px'}>
            <Heading as={'h5'}>Bundle name</Heading>
            <InputShadow>
              <Input
                placeholder={'Enter name'}
                name={'bundleName'}
                value={form.values.bundleName}
                onChange={form.handleChange}
              />
            </InputShadow>
          </Box>

          <Flex
            flexDir={{ base: 'column', md: 'row' }}
            flexWrap={'wrap'}
            justifyContent={'space-between'}
          >
            <Heading as={'h5'}>Bundle description (optional)</Heading>
            <Text order={{ base: 3, md: 0 }}>
              {form.values.bundleDescription.length} of {maxDescriptionSymbols} characters used
            </Text>
            <InputShadow w={'100%'}>
              <Input
                placeholder={'Bundle description'}
                name={'bundleDescription'}
                value={form.values.bundleDescription}
                onChange={form.handleChange}
              />
            </InputShadow>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};
