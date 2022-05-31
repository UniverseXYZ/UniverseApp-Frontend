import {
  Box, Button, Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading, HStack,
  Input,
  SimpleGrid,
  Text, VStack,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { FieldArray, FormikErrors, FormikProps } from 'formik';
import { default as dayjs } from 'dayjs';
import { default as isSameOrAfter } from 'dayjs/plugin/isSameOrAfter';
import { NFTStandard } from '@app/modules/nft/types';

import { SellAmountType, SellMethod } from '../../../../enums';
import * as styles from '../../styles';
import * as s from './FixedListing.styles';
import { AmountSelector, CurrencyInput, DateTimePicker, Icon } from '../../../../../../../../components';
import { IFixedListingForm } from '../../../../types';
import { BundleForm } from '../../../bundle-form';
import { IListingPage, useListingPage } from '@app/modules/marketplace/pages/sell-page/ListingPage.context';
import { IBaseForm } from '@app/modules/marketplace/pages/sell-page/types/base-form';

dayjs.extend(isSameOrAfter);

interface IMarketplaceSellContextDataOverride extends Omit<IListingPage, 'form'> {
  form: FormikProps<IFixedListingForm>;
}

export const SettingsTabFixedListing = () => {
  const [minEndDate, setMinEndDate] = useState(dayjs().add(1, 'hour').toDate());
  const { form, sellMethod, amountType, nft } = useListingPage() as IMarketplaceSellContextDataOverride;

  const {
    values: { startDate, endDate },
  } = form;

  type IRoyaltyKey = keyof IBaseForm["royalties"][number];

  const getRoyaltyError = useCallback((i: number, prop: IRoyaltyKey) => {
    return (form.errors.royalties?.[i] as FormikErrors<Partial<Record<IRoyaltyKey, string>>>)?.[prop] ?? '';
  }, [form]);

  useEffect(() => {
    // set the end date + 1 day and set the minimum end date
    const _endDate = dayjs(startDate || dayjs())
      .add(1, 'hour')
      .toDate();
    setMinEndDate(_endDate);

    const isStartAfterEnd = dayjs(startDate).isSameOrAfter(dayjs(endDate));

    if (isStartAfterEnd) {
      // if the user sets the start date to be after the end date - set the end date + 1 day
      form.setFieldValue('endDate', _endDate);
    }
  }, [startDate, endDate]);

  if (sellMethod !== SellMethod.FIXED) {
    return null;
  }

  return (
    <>
      {amountType === SellAmountType.BUNDLE && <BundleForm />}
      <Flex sx={styles.settingsItem}>
        <Box>
          <Heading as={'h5'}>Price*</Heading>
          <Text>Will be on sale until you transfer this item or cancel it.</Text>
        </Box>
        <Box>
          <FormControl isInvalid={!!(form.touched.price && form.errors.price)}>
            <CurrencyInput
              placeholder={'Amount'}
              name={'price'}
              value={form.values.price}
              currencyValue={form.values.priceCurrency}
              onChange={(value) => {
                if (Number(value) > -1 && value.length < 21) {
                  return form.setFieldValue('price', value);
                }
              }}
              onChangeCurrency={(value) => form.setFieldValue('priceCurrency', value)}
              onBlur={form.handleBlur}
            />
            <FormErrorMessage>{form.errors.price}</FormErrorMessage>
          </FormControl>
        </Box>
      </Flex>
      {nft.standard === NFTStandard.ERC1155 && (
        <Flex sx={styles.settingsItem}>
          <Box>
            <Heading as={'h5'}>Amount</Heading>
            <Text>The amount of editions you’d like to list.</Text>
          </Box>
          <Box>
            <AmountSelector
              options={{
                value: form.values.amount,
                step: 1,
                max: 10, // TODO: provide correct max value
                min: 1,
                onChange: (_, value) => form.setFieldValue('amount', value),
              }}
              ml={'auto'}
              w={['100%', null, 'fit-content !important']}
            />
          </Box>
        </Flex>
      )}
      <Flex sx={styles.settingsItem} flexDir={'column'}>
        <Box>
          <Heading as={'h5'}>Duration</Heading>
          <Text>Your listing will be active during the time period you set.</Text>
        </Box>
        <Flex mt={'20px'} w={'100% !important'}>
          <SimpleGrid columns={{ sm: 1, md: 2 }} spacingX={'20px'}>
            <FormControl>
              <FormLabel>Start date</FormLabel>
              <DateTimePicker
                value={form.values.startDate}
                modalName={'Start date'}
                minDate={dayjs().toDate()}
                onChange={(val) => form.setFieldValue('startDate', val)}
                validateListing
              />
            </FormControl>
            <FormControl>
              <FormLabel>End date</FormLabel>
              <DateTimePicker
                value={form.values.endDate}
                modalName={'End date'}
                minDate={minEndDate}
                onChange={(val) => form.setFieldValue('endDate', val)}
                validateListing
              />
            </FormControl>
          </SimpleGrid>
        </Flex>
      </Flex>
      <Flex sx={styles.settingsItem}>
        <Box>
          <Heading as={'h5'}>Royalty splits</Heading>
          <Text>You can up to 5 wallet addresses.</Text>
        </Box>
        <Box />

        <FieldArray
          name="royalties"
          render={(arrayHelpers) => (
            <>
              <VStack spacing={'8px'} mt={'24px'} w={'100%'}>
                {form.values.royalties.map((royalty, i) => (
                  <HStack key={i} spacing={'8px'} w={'100%'} alignItems={'flex-start'}>
                    <FormControl
                      isInvalid={!!(
                        form.touched.royalties?.[i] &&
                        !!getRoyaltyError(i, 'address')
                      )}
                    >
                      <Input
                        placeholder={'Enter wallet address'}
                        name={`royalties.${i}.address`}
                        value={royalty.address}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      />
                      <FormErrorMessage>{getRoyaltyError(i, 'address')}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      w={'auto'}
                      isInvalid={!!(
                        form.touched.royalties?.[i] &&
                        !!getRoyaltyError(i, 'percent')
                      )}
                    >
                      <Input
                        placeholder={'0%'}
                        maxW={'128px'}
                        name={`royalties.${i}.percent`}
                        value={royalty.percent}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                      />
                      <FormErrorMessage>{getRoyaltyError(i, 'percent')}</FormErrorMessage>
                    </FormControl>
                    {form.values.royalties.length > 1 && (
                      <Button
                        variant={'simpleOutline'}
                        {...s.RoyaltyRemoveButton}
                        onClick={() => arrayHelpers.remove(i)}
                      >
                        <Icon name={'trash'} flex={1} />
                      </Button>
                    )}
                  </HStack>
                ))}
              </VStack>

              <FormControl isInvalid={typeof form.errors.royalties === 'string'}>
                <FormErrorMessage>{form.errors.royalties}</FormErrorMessage>
              </FormControl>

              {form.values.royalties.length < 5 && (
                <HStack spacing={'10px'} mt={'24px'}>
                  <Center {...s.RoyaltyAddButtonIconWrapper}>
                    <Icon name={'plus'} viewBox={'0 0 20 20'} boxSize={'12px'} />
                  </Center>
                  <Text
                    {...s.RoyaltyAddButtonText}
                    onClick={() => arrayHelpers.push({
                      address: '',
                      percent: '',
                    })}
                  >
                    Add Wallet
                  </Text>
                </HStack>
              )}
            </>
          )}
        />
      </Flex>
      {/* <Flex data-checkbox sx={styles.settingsItem}>
        <Box>
          <Heading as={'h5'}>Privacy</Heading>
          <Text>You can keep your listing public, or you can specify one address that’s allowed to buy it.</Text>
        </Box>
        <Flex justifyContent={'flex-end'}>
          <Switch
            size="lg"
            name="isPrivacy"
            isChecked={form.values.isPrivacy}
            onChange={form.handleChange}
          />
        </Flex>
        {form.values.isPrivacy && (
          <Box pt={'20px'} w={'100%'}>
            <InputShadow>
              <Input
                placeholder="Buyer address"
                name="buyerAddress"
                value={form.values.buyerAddress}
                onChange={form.handleChange}
              />
            </InputShadow>
          </Box>
        )}
      </Flex> */}
    </>
  );
};
