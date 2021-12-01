import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

import { GreyBox } from '../../grey-box';
import { useMarketplaceSellData } from '../../../hooks';
import * as styles from './styles';
import { SettingsTabDutchAuction, SettingsTabEnglishAuction, SettingsTabFixedListing } from './components';
import { SellAmountType } from '../../../enums';
import { InputShadow } from '../../../../../../../components';

import searchIcon from '../../../../../../../../assets/images/search-gray.svg';
import filtersIcon from '../../../../../../../../assets/images/marketplace/filters2.svg';
import arrowDownIcon from '../../../../../../../../assets/images/arrow-down.svg';

export const SettingsTab = () => {
  const sellData = useMarketplaceSellData();

  const { isOpen: isFiltersOpen, onToggle: onToggleFilters } = useDisclosure();

  return (
    <>
      <GreyBox sx={styles.mainContainer}>
        <SettingsTabFixedListing />
        <SettingsTabDutchAuction />
        <SettingsTabEnglishAuction />
      </GreyBox>

      {sellData.amountType === SellAmountType.BUNDLE && (
        <>
          <Heading as={'h2'} size={'md'} mb={'8px'}>Select NFTs</Heading>
          <Text fontFamily={'Space Grotesk'} fontSize={'14px'} color={'rgba(0, 0, 0, 0.6)'}>
            You can only select minted NFTs from your wallet.
            If you want to create NFTs, go to <Link
              href={'/minting'}
              target={'_blank'}
              color={'black'}
              textDecoration={'underline'}
              _hover={{ textDecoration: 'none' }}
            >Minting</Link>.
          </Text>
          <Flex mt={'30px'} mb={'20px'}>
            <InputGroup mr={'12px'}>
              <InputShadow display={'contents'}>
                <InputLeftElement pointerEvents="none" children={<Image src={searchIcon} />} />
                <Input placeholder={'Search items'} pl={'50px'} />
              </InputShadow>
            </InputGroup>
            <Button
              mr={'12px'}
              rightIcon={<Image src={arrowDownIcon} width={'10px'} />}
              size={'xl'}
              variant={'dropDown'}
              minWidth={'225px'}
              justifyContent={'space-between'}
              padding={'15px 16px'}
            >Sort by</Button>
            <Button
              leftIcon={<Image src={filtersIcon} />}
              size={'xl'}
              variant={'dropDown'}
              onClick={onToggleFilters}
            >Filters</Button>
          </Flex>

          {isFiltersOpen && (
            <Flex>
              <p>Filters</p>
            </Flex>
          )}
        </>
      )}

      <Box textAlign={'right'} mb={'50px'}>
        <Button mr={'10px'} variant={'outline'} onClick={sellData.goBack}>Back</Button>
        <Button boxShadow={'xl'} onClick={sellData.goContinue}>Continue</Button>
      </Box>
    </>
  );
}
