import { Box, Flex, FormControl, FormErrorMessage, Heading, Input, Text, Textarea } from '@chakra-ui/react';
import React from 'react';

import { useListingPage } from '@app/modules/marketplace/pages/sell-page';

import * as styles from '../tab-settings/styles';

const maxDescriptionSymbols = 500;

export const BundleForm = () => {
  const { form } = useListingPage();
  return (
    <>
      <Flex sx={styles.settingsItem}>
        <Box width={'100% !important'} pr={'0 !important'}>
          <Box mb={'30px'}>
            <FormControl isInvalid={!!(form.touched.bundleName && form.errors.bundleName)}>
              <Heading as={'h5'}>Bundle name*</Heading>
              <Input
                placeholder={'Enter name'}
                name={'bundleName'}
                value={form.values.bundleName}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <FormErrorMessage>{form.errors.bundleName}</FormErrorMessage>
            </FormControl>
          </Box>

          <Flex
            flexDir={{ base: 'column', md: 'row' }}
            flexWrap={'wrap'}
            justifyContent={'space-between'}
          >
            <Heading as={'h5'}>Bundle description</Heading>
            <Text order={{ base: 3, md: 0 }}>
              {form.values.bundleDescription.length}/{maxDescriptionSymbols}
            </Text>
            <FormControl isInvalid={!!(form.touched.bundleDescription && form.errors.bundleDescription)}>
              <Textarea
                placeholder={'Bundle description'}
                name={'bundleDescription'}
                value={form.values.bundleDescription}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <FormErrorMessage>{form.errors.bundleDescription}</FormErrorMessage>
            </FormControl>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};
