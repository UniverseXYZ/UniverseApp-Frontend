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
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { FreeMode, Navigation } from 'swiper';

import searchIcon from '../../../../../../../../../../assets/images/search-gray.svg';
import filtersIcon from '../../../../../../../../../../assets/images/marketplace/filters2.svg';
import arrowLeftIcon from '../../../../../../../../../../assets/images/marketplace/bundles-left-arrow.svg';
import arrowRightIcon from '../../../../../../../../../../assets/images/marketplace/bundles-right-arrow.svg';
import closeWhiteIcon from '../../../../../../../../../../assets/images/marketplace/v2/close-white.svg';

import { SortNftsOptions } from '../../../../../../../constants';
import { InputShadow, Select } from '../../../../../../../../../components';
import { NftItem } from '../../../../../../../../nft/components';
import { INft } from '../../../../../../../../nft/types';
import { SelectEditionsDropdown } from '../../../../select-editions-dropdown';
import { useMarketplaceSellData } from '../../../../../hooks';
import { useStickyFooter } from '../../../../../../../../../hooks';
import { Nfts } from '../../../../../../../mocks/nfts';
import { UncheckBundleEditionsModal } from './components';
import {
  ArtistsFilter,
  CollectionsFilter, ICollectionsFilterValue, INftTypeFilterValue, IPriceRangeFilterValue, ISaleTypeFilterValue,
  NFTTypeFilter,
  PriceRangeFilter,
  SaleTypeFilter,
} from '../../../../../../../components';
import { NFTItemEditionsLabel } from '../../../../../../../../nft/components/nft-item/components';
import { FilterCollectionsItems } from '../../../../../../../mocks/filter-collections';
import { FilterArtistsItems } from '../../../../../../../mocks/filter-artists';

interface IActionBarNFTItemProps {
  nft: INft;
  selectedEditions?: string[];
  onRemove: (editions: false | string[]) => void;
}

const ActionBarNFTItem = (
  {
    nft,
    selectedEditions,
    onRemove
  }: IActionBarNFTItemProps
) => {
  const [isOpened, toggleIsOpened] = useState<boolean>(false);

  const isNFTBundle = useMemo(() => nft.tokenIds.length > 1, [nft]);

  const handleRemove = useCallback(() => {
    if (isNFTBundle) {
      toggleIsOpened(true);
      return;
    }

    onRemove(false);
  }, [isNFTBundle, onRemove]);

  const handleRemoveNFTBundleEditions = useCallback((editionsForRemove: string[]) => {
    if (selectedEditions) {
      const newEditions = selectedEditions.filter((edition) => !editionsForRemove.includes(edition));
      onRemove(newEditions.length ? newEditions : false);
    }
  }, [onRemove]);

  return (
    <>
      <Tooltip
        hasArrow
        variant={'black'}
        placement={'top'}
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
          onClick={handleRemove}
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
            >{selectedEditions?.length}</Text>
          )}
        </Box>
      </Tooltip>

      {isNFTBundle && (
        <UncheckBundleEditionsModal
          isOpened={isOpened}
          editions={selectedEditions ?? []}
          onRemove={handleRemoveNFTBundleEditions}
          onClose={() => toggleIsOpened(false)}
        />
      )}
    </>
  );
};

interface ISelectNFTsProps {

}

export const SelectNFTs = ({}: ISelectNFTsProps) => {
  const actionBarRef = useRef<HTMLDivElement>(null);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { isOpen: isFiltersOpen, onToggle: onToggleFilters } = useDisclosure();

  const { form, ...sellData } = useMarketplaceSellData();

  useStickyFooter(actionBarRef);

  const [sortBy, setSortBy] = useState();
  const [nfts, setNfts] = useState(Nfts);

  const handleLoadMore = useCallback(() => {
    setNfts([
      ...nfts,
      ...Nfts.map((nft) => ({
        ...nft,
        id: (nft.id as number) * (nfts.length / Nfts.length + 1),
      }))
    ]);
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
    return Object
      .keys(form.values.selectedNFTsIds || {})
      .reduce((acc, key) => form.values.selectedNFTsIds[key]?.length
        ? acc + form.values.selectedNFTsIds[key]?.length
        : acc + Number(form.values.selectedNFTsIds[key]), 0);
  }, [form.values.selectedNFTsIds]);

  return (
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
        {/*  TODO: uncomment*/}
          <SaleTypeFilter
            value={{} as ISaleTypeFilterValue}
            onChange={(values) => console.log('values', values)}
            onClear={() => true}
          />
          <NFTTypeFilter
            value={{} as INftTypeFilterValue}
            onChange={(values) => console.log('values', values)}
            onClear={() => true}
          />
          <PriceRangeFilter
            value={{} as IPriceRangeFilterValue}
            onChange={(values) => console.log('values', values)}
            onClear={() => true}
            isDirty={false}
          />
          <CollectionsFilter
            value={[] as ICollectionsFilterValue}
            onChange={(values) => console.log('values', values)}
            onClear={() => true}
          />
          <ArtistsFilter
            value={[] as ICollectionsFilterValue}
            onChange={(values) => console.log('values', values)}
            onClear={() => true}
          />
        </Flex>
      </Fade>

      <Box mt={isFiltersOpen ? 0 : '-60px'} transition={'300ms'}>
        <SimpleGrid columns={4} spacing={'30px'} mb={'30px'}>
          {nfts.map((nft, i) => {
            const tokensNumber = nft.tokenIds?.length ?? 0;
            const isBundle = tokensNumber > 1;
            const selectedNFTRef = form.values.selectedNFTsIds[nft.id as number];

            return (
              <NftItem
                key={nft.id}
                nft={nft as INft}
                isSelected={!!selectedNFTRef}
                selectedLabel={isBundle ? `${(selectedNFTRef || []).length} / ${tokensNumber}` : undefined}
                renderNFTAdditions={isBundle
                  ? (
                    <SelectEditionsDropdown
                      nft={nft as INft}
                      selectedEditions={selectedNFTRef as string[] || []}
                      onChange={(editions) => handleCheckNFT(nft, editions.length ? editions : false)}
                    />
                  )
                  : (
                    <NFTItemEditionsLabel nft={nft as INft} mr={'6px'}>
                      {nft.tokenIds ? `#${nft.tokenIds[0]}` : ''}
                    </NFTItemEditionsLabel>)
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

      <Box mb={`${(actionBarRef.current?.offsetHeight || 0)}px`}>
        <Box
          ref={actionBarRef}
          width={'100%'}
          p={'20px 40px'}
          bg={'linear-gradient(135deg, rgba(188, 235, 0, 0.03) 15.57%, rgba(0, 234, 234, 0.03) 84.88%), rgba(255, 255, 255, 0.8)'}
          backdropFilter={'blur(10px)'}
          borderTop={'1px solid rgba(0, 0, 0, 0.1)'}
          position={'absolute'}
          bottom={'inherit'}
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

              {!selectedNFTsNumber && (
                <Box sx={{
                  bg: 'rgba(0, 0, 0, 0.02)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  width: '54px',
                  height: '54px',
                }} />
              )}

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
                  {nfts.map((nft) => {
                    const selectedEditions = form.values.selectedNFTsIds[nft.id as number];

                    if (!selectedEditions) {
                      return null;
                    }

                    return (
                      <SwiperSlide key={nft.id as number}>
                        <ActionBarNFTItem
                          nft={nft as INft}
                          selectedEditions={selectedEditions as string[]}
                          onRemove={(editions) => {
                            handleCheckNFT(nft, editions);
                          }}
                        />
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              )}
            </Box>
            <Text mx={'20px'} fontSize={'12px'}>Total NFTs: <strong>{selectedNFTsNumber}</strong></Text>
            <Button boxShadow={'xl'} onClick={sellData.goContinue}>Continue</Button>
          </Flex>
        </Box>
      </Box>
    </>
  );
};
