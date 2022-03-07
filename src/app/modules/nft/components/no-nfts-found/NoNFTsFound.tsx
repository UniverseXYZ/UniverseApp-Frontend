import {
  Box,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';

import BubbleIcon from '../../../../../assets/images/text-bubble.png';
import PlusIcon from '../../../../../assets/images/plus.svg';

const MENU_ITEMS: Array<{ name: string; nftType: string; }> = [
  { name: 'NFT', nftType: 'single' },
  { name: 'Collection', nftType: 'collection' },
];

export const NoNFTsFound = () => {
  const history = useHistory();

  return (
    <Box color={'rgba(0 0 0 / 40%)'} textAlign={'center'} m={'90px 0 120px'}>
      <Image src={BubbleIcon} alt='bubble-icon' m={'auto'} />
      <Box fontSize={'18px'} fontWeight={500}>
        <Text m={'30px 0 6px'}>No NFTs found</Text>
        <Text my={'6px'}>
          If you&apos;re signing in for the first time, it may take a bit before your nfts are
          synced
        </Text>
      </Box>
      <Text fontSize={'14px'} mb={'30px'}>
        Create NFTs or NFT collections with our platform by clicking the button below
      </Text>
      <Menu>
        <MenuButton as={Button} rightIcon={<Image src={PlusIcon} />}>Create</MenuButton>
        <MenuList>
          {MENU_ITEMS.map(({ name, nftType }, i) => (
            <MenuItem key={i} onClick={() => history.push('/my-nfts/create', { tabIndex: 1, nftType })}>
              {name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};
