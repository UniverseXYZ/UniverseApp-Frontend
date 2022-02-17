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

import { Navigation, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import { GreyBox } from '../../grey-box';
import { useMarketplaceSellData } from '../../../hooks';
import * as styles from './styles';
import { SelectNFTs, SettingsTabDutchAuction, SettingsTabEnglishAuction, SettingsTabFixedListing } from './components';
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
import { useStickyFooter } from '../../../../../../../hooks';

export const SettingsTab = () => {
  const sellData = useMarketplaceSellData();

  return (
    <>
      <GreyBox sx={styles.mainContainer}>
        <SettingsTabFixedListing />
        <SettingsTabDutchAuction />
        <SettingsTabEnglishAuction />
      </GreyBox>

      {sellData.amountType === SellAmountType.BUNDLE && !!sellData.sellMethod
        ? (<SelectNFTs />)
        : (
          <Box textAlign={'right'} mb={'50px'}>
            <Button mr={'10px'} variant={'outline'} onClick={sellData.goBack}>Back</Button>
            <Button boxShadow={'xl'} onClick={sellData.goContinue}>Continue</Button>
          </Box>
        )
      }
    </>
  );
}
