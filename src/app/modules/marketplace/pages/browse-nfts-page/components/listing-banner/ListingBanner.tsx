import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useRouter } from 'next/router';

import * as styles from './ListingBanner.styles';

import { useAuthStore } from '../../../../../../../stores/authStore';

interface IListingBannerProps {
  onLogin: () => void;
}

export const ListingBanner = (props: IListingBannerProps) => {
  const { onLogin } = props;

  const router = useRouter();

  const isWalletConnected = useAuthStore(state => state.isWalletConnected);

  const handleListNft = useCallback(() => {
    if (!isWalletConnected) {
      return onLogin();
    }

    router.push('/my-nfts');
  }, [isWalletConnected, onLogin]);

  return (
    <Box {...styles.BannerWrapperStyle}>
      <Flex alignItems={'center'} justifyContent={'space-between'} flexWrap={{ sm: 'wrap', md: 'nowrap' }}>
        <Box>
          <Heading fontSize={{ sm: '20px', md: '26px' }} mb={'10px'}>List your NFTs</Heading>
          <Text fontSize={'14px'}>{'Choose the NFT\'s you’d like to list from your wallet and put them on sale.'}</Text>
        </Box>
        <Button sx={{ width: {sm: '100%', md: 'auto'}, marginTop: {sm: '20px', md: '0'} }} variant={'black'} onClick={handleListNft}>List an NFT</Button>
      </Flex>
    </Box>
  );
}
