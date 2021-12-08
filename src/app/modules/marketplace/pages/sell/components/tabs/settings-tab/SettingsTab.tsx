import {
  Box,
  Button,
  Fade,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useWindowScroll } from 'react-use';

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
import { Nfts } from '../../../../../mocks/nfts';
import { NftItem } from '../../../../../../nft/components';
import { INft } from '../../../../../../nft/types';
import { SelectEditionsDropdown } from '../../select-editions-dropdown';

const useStickyToFooter = () => {
  const { y: windowScrollY } = useWindowScroll();

  const footerEl = useMemo<any>(() => document.querySelector('footer'), []);

  const isStickied = useMemo<boolean>(() => {
    if (!window || !footerEl) {
      return false;
    }
    return !(windowScrollY + window.innerHeight >= footerEl.getBoundingClientRect().top + window.scrollY);
  }, [windowScrollY, footerEl]);

  return isStickied;
};

export const SettingsTab = () => {
  const actionBarRef = useRef(null);

  const { isOpen: isFiltersOpen, onToggle: onToggleFilters } = useDisclosure();

  const { form, ...sellData } = useMarketplaceSellData();

  const isStickiedActionBar = useStickyToFooter();

  const [sortBy, setSortBy] = useState();
  const [nfts, setNfts] = useState(Nfts);

  const handleLoadMore = useCallback(() => {
    setNfts([...nfts, ...Nfts])
  }, [nfts]);

  const handleNFTAuctionTimeOut = useCallback((index) => {
    setNfts(nfts.filter((nft, i) => i !== index));
  }, [nfts]);

  const handleCheckNFT = useCallback((nft, selected: boolean | string[]) => {
    form.setFieldValue('selectedNFTsIds', {
      ...form.values.selectedNFTsIds,
      [nft.id]: selected,
    });
  }, [form.values.selectedNFTsIds]);

  return (
    <>
      <GreyBox sx={styles.mainContainer}>
        <SettingsTabFixedListing />
        <SettingsTabDutchAuction />
        <SettingsTabEnglishAuction />
      </GreyBox>

      {sellData.amountType === SellAmountType.BUNDLE && !!sellData.sellMethod && (
        <>
          <Heading as={'h2'} size={'md'} mb={'8px'}>Select NFTs</Heading>
          <Text fontSize={'14px'} color={'rgba(0, 0, 0, 0.6)'}>
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
                size: 'lg',
                minWidth: '225px',
                justifyContent: 'space-between',
                leftIcon: <Image src={artistIcon} />,
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

          <Fade in={isFiltersOpen} delay={isFiltersOpen ? 0.15 : 0}>
            <Flex
              mb={'30px'}
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
                }}
              />
              <Dropdown
                label={'Price range'}
                buttonProps={{
                  leftIcon: <Image src={priceRangeIcon} />,
                }}
              />
              <Dropdown
                label={'Collections'}
                buttonProps={{
                  leftIcon: <Image src={collectionsIcon} />,
                }}
              />
              <Dropdown
                label={'Artists'}
                buttonProps={{
                  leftIcon: <Image src={artistIcon} />,
                }}
              />
            </Flex>
          </Fade>

          <Box mt={isFiltersOpen ? 0 : '-60px'} transition={'300ms'}>
            <SimpleGrid columns={4} spacing={'30px'} mb={'30px'}>
              {nfts.map((nft, i) => {
                const tokensNumber = (nft.tokenIds as any)?.length;
                const isBundle = tokensNumber > 1;
                const selectedNFTRef = form.values.selectedNFTsIds[nft.id as number];

                return (
                  <NftItem
                    key={nft.id}
                    nft={nft as INft}
                    isSelected={!!selectedNFTRef}
                    selectedLabel={isBundle ? `${(selectedNFTRef || []).length} / ${tokensNumber}` : undefined}
                    renderFooterNFTAdditions={isBundle
                      ? (
                        <SelectEditionsDropdown
                          nft={nft as INft}
                          selectedEditions={selectedNFTRef as string[] || []}
                          onChange={(editions) => handleCheckNFT(nft, editions.length ? editions : false)}
                        />
                      )
                      : <Text>#{(nft.tokenIds as any)[0]}</Text>
                    }
                    onClick={isBundle
                      ? undefined
                      : () => handleCheckNFT(nft, !selectedNFTRef)
                    }
                    onAuctionTimeOut={() => handleNFTAuctionTimeOut(i)}
                  />
                );
              })}
            </SimpleGrid>
            <Button variant={'outline'} isFullWidth mb={'20px'} onClick={handleLoadMore}>Load More</Button>
          </Box>
        </>
      )}

      {sellData.amountType === SellAmountType.SINGLE ? (
        <Box textAlign={'right'} mb={'50px'}>
          <Button mr={'10px'} variant={'outline'} onClick={sellData.goBack}>Back</Button>
          <Button boxShadow={'xl'} onClick={sellData.goContinue}>Continue</Button>
        </Box>
      ) : (
        <Box mb={actionBarRef?.current ? (actionBarRef?.current as any).offsetHeight + 'px' : 0}>
          <Box
            ref={actionBarRef}
            textAlign={'right'}
            width={'100%'}
            p={'20px 40px'}
            bg={'linear-gradient(135deg, rgba(188, 235, 0, 0.03) 15.57%, rgba(0, 234, 234, 0.03) 84.88%), rgba(255, 255, 255, 0.8)'}
            backdropFilter={'blur(10px)'}
            borderTop={'1px solid rgba(0, 0, 0, 0.1)'}
            position={isStickiedActionBar ? 'fixed' : 'absolute'}
            bottom={isStickiedActionBar ? 0 : 'inherit'}
            left={0}
            zIndex={10}
          >
            <Button boxShadow={'xl'} onClick={sellData.goContinue}>Continue</Button>
          </Box>
        </Box>
      )}
    </>
  );
}
