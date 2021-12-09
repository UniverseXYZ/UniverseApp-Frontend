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
  Text, Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useWindowScroll, useWindowSize } from 'react-use';

import { Navigation, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import { GreyBox } from '../../grey-box';
import { useMarketplaceSellData } from '../../../hooks';
import * as styles from './styles';
import { SettingsTabDutchAuction, SettingsTabEnglishAuction, SettingsTabFixedListing } from './components';
import { SellAmountType } from '../../../enums';
import { Dropdown, InputShadow, Select } from '../../../../../../../components';

import arrowLeftIcon from '../../../../../../../../assets/images/marketplace/bundles-left-arrow.svg';
import arrowRightIcon from '../../../../../../../../assets/images/marketplace/bundles-right-arrow.svg';

import searchIcon from '../../../../../../../../assets/images/search-gray.svg';
import closeWhiteIcon from '../../../../../../../../assets/images/marketplace/v2/close-white.svg';
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
import { useLayout } from '../../../../../../../providers';

const useStickyToFooter = () => {
  const { y: scrollY } = useWindowScroll();
  const { height } = useWindowSize(0, 0);
  const { footerRef } = useLayout();

  return useMemo<boolean>(() => {
    return !(scrollY + height >= footerRef.current?.offsetTop ?? 0);
  }, [scrollY, height, footerRef.current]);
};

export const SettingsTab = () => {
  const actionBarRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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

  const selectedNFTsNumber = useMemo(() => {
    if (!form.values.selectedNFTsIds) {
      return 0;
    }
    return Object
      .keys(form.values.selectedNFTsIds)
      .filter((key) => !!form.values.selectedNFTsIds[key])
      .length;
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

      {!!sellData.sellMethod && (
        sellData.amountType === SellAmountType.SINGLE ? (
          <Box textAlign={'right'} mb={'50px'}>
            <Button mr={'10px'} variant={'outline'} onClick={sellData.goBack}>Back</Button>
            <Button boxShadow={'xl'} onClick={sellData.goContinue}>Continue</Button>
          </Box>
        ) : (
          <Box mb={actionBarRef?.current ? (actionBarRef?.current as any).offsetHeight + 'px' : 0}>
            <Box
              ref={actionBarRef}
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
              <Flex alignItems={'center'}>
                <Box sx={{
                  flex: 1,
                  position: 'relative',
                  maxWidth: '80%',
                  '.swiper-slide': {
                    width: 'fit-content !important'
                  },
                  '[data-swiper-button]': {
                    border: 0,
                    width: '30px',
                    height: '30px',
                    background: 'white',
                    zIndex: 10,
                    position: 'absolute',
                    minW: 'auto',
                    borderRadius: '50%',
                    top: 'calc(50% - 15px)',
                    padding: 0,
                    _disabled: {
                      display: 'none',
                    },
                    _before: {
                      border: '1px solid',
                      borderColor: 'rgba(0, 0, 0, 0.1)',
                      borderRadius: 'inherit',
                      position: 'absolute',
                      content: '" "',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: '100%',
                      zIndex: -1,
                    },
                    _hover: {
                      _before: {
                        backgroundImage: 'linear-gradient(175deg,#bceb00,#00eaea)',
                        backgroundOrigin: 'border-box',
                        borderColor: 'transparent',
                        boxShadow: 'inset 2px 1000px 1px white',
                      },
                    },
                    _focus: {
                      boxShadow: 'none',
                      _before: {
                        backgroundImage: 'linear-gradient(175deg,#bceb00,#00eaea)',
                        backgroundOrigin: 'border-box',
                        borderColor: 'transparent',
                        boxShadow: 'inset 2px 1000px 1px white',
                      },
                    },
                  }
                }}>
                  <Button ref={prevRef} variant={'simpleOutline'} data-swiper-button left={'-15px'}>
                    <Image src={arrowLeftIcon} width={'9px'} />
                  </Button>
                  <Button ref={nextRef} variant={'simpleOutline'} data-swiper-button right={'-15px'}>
                    <Image src={arrowRightIcon} width={'9px'} />
                  </Button>
                  {prevRef?.current && nextRef?.current && (
                    <Swiper
                      modules={[Navigation, FreeMode]}
                      navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                      }}
                      loop={false}
                      freeMode={true}
                      slidesPerView={'auto'}
                      spaceBetween={8}
                    >
                      {[1, 2, 3, 4, 5].map((i) => (
                        <React.Fragment key={i}>
                          {nfts.map((nft) => {
                            const selectedNFTRef = form.values.selectedNFTsIds[nft.id as number];

                            if (!selectedNFTRef) {
                              return null;
                            }

                            const isNFTBundle = typeof selectedNFTRef !== 'boolean';

                            return (
                              <SwiperSlide key={nft.id as number * i}>
                                <Tooltip
                                  hasArrow
                                  variant={'black'}
                                  label={isNFTBundle ? 'Select editions to remove' : 'Remove'}
                                  fontWeight={700}
                                >
                                  <Box
                                    borderRadius={'8px'}
                                    overflow={'hidden'}
                                    cursor={'pointer'}
                                    position={'relative'}
                                    sx={{
                                      width: '54px',
                                      _after: {
                                        display: 'none',
                                        content: '" "',
                                        position: 'absolute',
                                        bg: `center / 30% no-repeat url(${closeWhiteIcon}), rgba(0, 0, 0, 0.8)`,
                                        top: 0,
                                        left: 0,
                                        h: '100%',
                                        w: '100%',
                                      },
                                      _hover: {
                                        _after: {
                                          display: 'block',
                                        },
                                      },
                                    }}
                                    onClick={isNFTBundle ? undefined : () => {
                                      handleCheckNFT(nft, false);
                                    }}
                                  >
                                    <Image
                                      src={nft.thumbnail_url}
                                      height={'54px'}
                                      width={'54px'}
                                      objectFit={'cover'}
                                    />
                                    {isNFTBundle && (
                                      <Text
                                        sx={{
                                          bg: 'rgba(0, 0, 0, 0.8)',
                                          backdropFilter: 'blur(2px)',
                                          borderRadius: '4px',
                                          color: 'white',
                                          fontSize: '10px',
                                          fontWeight: 600,
                                          lineHeight: '15px',
                                          paddingX: '4px',
                                          position: 'absolute',
                                          right: '4px',
                                          top: '4px',
                                          zIndex: 2,
                                        }}
                                      >{selectedNFTRef.length}</Text>
                                    )}
                                  </Box>
                                </Tooltip>
                              </SwiperSlide>
                            )
                          })}
                        </React.Fragment>
                      ))}
                    </Swiper>
                  )}
                </Box>
                <Text mx={'20px'} fontSize={'12px'}>Total NFTs: <strong>{selectedNFTsNumber}</strong></Text>
                <Button boxShadow={'xl'} onClick={sellData.goContinue}>Continue</Button>
              </Flex>
            </Box>
          </Box>
        )
      )}
    </>
  );
}
