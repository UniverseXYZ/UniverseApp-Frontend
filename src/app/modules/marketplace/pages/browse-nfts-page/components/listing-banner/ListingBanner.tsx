import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useRouter } from 'next/router';

import * as styles from './ListingBanner.styles';

import { useAuthStore } from '../../../../../../../stores/authStore';
import { useSignInPopupStore } from '../../../../../../../stores/signInPopup';

export const ListingBanner: React.FC = () => {
  const router = useRouter();

  const { isWalletConnected } = useAuthStore();
  const { setShowNotAuthenticatedPopup } = useSignInPopupStore();

  const handleListNft = useCallback(() => {
    if (!isWalletConnected) {
      return setShowNotAuthenticatedPopup(true);
    }

    router.push('/my-nfts');
  }, [isWalletConnected, setShowNotAuthenticatedPopup]);

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
