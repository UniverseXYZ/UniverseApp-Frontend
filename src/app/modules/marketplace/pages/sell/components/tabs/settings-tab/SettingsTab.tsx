import {
  Box,
  Button, Fade,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link, Slide, SlideFade,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import { GreyBox } from '../../grey-box';
import { useMarketplaceSellData } from '../../../hooks';
import * as styles from './styles';
import { SettingsTabDutchAuction, SettingsTabEnglishAuction, SettingsTabFixedListing } from './components';
import { SellAmountType } from '../../../enums';
import { Dropdown, InputShadow, Select } from '../../../../../../../components';

import searchIcon from '../../../../../../../../assets/images/search-gray.svg';
import filtersIcon from '../../../../../../../../assets/images/marketplace/filters2.svg';
import { SortNftsOptions } from '../../../../../constants';

import saleTypeIcon from '../../../../../../../../assets/images/marketplace/sale-type.svg';
import priceRangeIcon from '../../../../../../../../assets/images/marketplace/price-range.svg';
import collectionsIcon from '../../../../../../../../assets/images/marketplace/collections.svg';
import artistIcon from '../../../../../../../../assets/images/marketplace/artist.svg';

export const SettingsTab = () => {
  const sellData = useMarketplaceSellData();

  const { isOpen: isFiltersOpen, onToggle: onToggleFilters } = useDisclosure();

  const [sortBy, setSortBy] = useState();

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
            <Select
              label={'Sort by'}
              items={SortNftsOptions}
              value={sortBy}
              buttonProps={{
                mr: '12px',
                size: 'xl',
                minWidth: '225px',
                justifyContent: 'space-between',
              }}
              onSelect={(val) => setSortBy(val)}
            />
            <Button
              variant={'dropdown'}
              size={'xl'}
              leftIcon={<Image src={filtersIcon} />}
              isActive={isFiltersOpen}
              onClick={onToggleFilters}
            >Filters</Button>
          </Flex>

          <Fade in={isFiltersOpen}>
            <Flex
              sx={{
                '> button': {
                  mr: '8px'
                }
              }}
            >
              <Dropdown
                label={'Sale type'}
                buttonProps={{
                  leftIcon: <Image src={saleTypeIcon} />,
                  minWidth: '200px',
                }}
              />
              <Dropdown
                label={'Price range'}
                buttonProps={{
                  leftIcon: <Image src={priceRangeIcon} />,
                  minWidth: '200px',
                }}
              />
              <Dropdown
                label={'Collections'}
                buttonProps={{
                  leftIcon: <Image src={collectionsIcon} />,
                  minWidth: '200px',
                }}
              />
              <Dropdown
                label={'Artists'}
                buttonProps={{
                  leftIcon: <Image src={artistIcon} />,
                  minWidth: '200px',
                }}
              />
            </Flex>
          </Fade>
        </>
      )}

      <Box textAlign={'right'} mb={'50px'}>
        <Button mr={'10px'} variant={'outline'} onClick={sellData.goBack}>Back</Button>
        <Button boxShadow={'xl'} onClick={sellData.goContinue}>Continue</Button>
      </Box>
    </>
  );
}
