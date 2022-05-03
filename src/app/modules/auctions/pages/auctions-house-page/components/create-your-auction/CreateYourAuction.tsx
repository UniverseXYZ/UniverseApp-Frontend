import { Box, Button, Container, Heading, Image, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import plusIcon from '@assets/images/plus.svg';
import { useAuthStore } from '@app/stores';

import * as styles from './CreateYourAuction.styles';

export const CreateYourAuction = () => {
  const router = useRouter();
  // const { setAuction } = useAuctionContext();

  const { address, loggedInArtist } = useAuthStore(state => ({
    address: state.address,
    loggedInArtist: state.loggedInArtist,
  }));

  const handleSetUpAuction = useCallback(() => {
    // setAuction({ rewardTiers: [] });
    router.push('/setup-auction');
  }, []);

  const handleSignIn = useCallback(() => {
    // setshowWalletPopup(true);
  }, []);

  const handleSetUpProfile = useCallback(() => {
    router.push('/my-account');
  }, []);


  let button = (
    <Button {...styles.ButtonStyle} onClick={handleSetUpAuction}>
      Set up auction
      <Image src={plusIcon} alt="icon" ml={'12px'} />
    </Button>
  );

  if (!address) {
    button = (<Button {...styles.ButtonStyle} onClick={handleSignIn}>Sign in</Button>);
  } else if (!loggedInArtist.universePageAddress) {
    button = (<Button {...styles.ButtonStyle} onClick={handleSetUpProfile}>Set up profile</Button>);
  }

  return (
    <Box {...styles.WrapperStyle}>
      <Container {...styles.ContainerStyle}>
        <Box>
          <Heading {...styles.HeadingStyle}>Create your auction</Heading>
          <Text {...styles.TextStyle}>Mint NFTs, set up rewards tiers and launch Universe auctions.</Text>
        </Box>
        {button}
      </Container>
    </Box>
  );
};
