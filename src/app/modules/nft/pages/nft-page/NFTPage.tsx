import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemProps,
  MenuList,
  SimpleGrid,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import {useParams} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { NftItem, NFTLikesPopup } from '../../components';
import { NFTInfo } from './components';
import { INft } from '../../types';
import { Nfts } from '../../../marketplace/mocks/nfts';
import { useThemeContext } from '../../../../../contexts/ThemeContext';
import * as styles from './styles';

import NFTPageProvider from './NFTPage.context'
import {CollectionPageLoader} from "../../../../../containers/collection/CollectionPageLoader";


// TODO: hide metadata tab for not Polymorph NFT type
export const NFTPage = () => {

  const [moreNFTs] = useState<INft[]>(Nfts.slice(0, 4) as INft[]);

  const [isLikesPopupOpened, setIsLikesPopupOpened] = useState(false);


  return (
    <NFTPageProvider>
      <NFTInfo />

      {/*TODO: move to nft-like component*/}
      <NFTLikesPopup isOpen={isLikesPopupOpened} onClose={() => setIsLikesPopupOpened(false)} />
    </NFTPageProvider>
  );
};
