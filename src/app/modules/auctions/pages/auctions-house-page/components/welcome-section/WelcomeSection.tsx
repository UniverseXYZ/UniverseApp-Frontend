import { Box, Button, Container, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';

import { ReactComponent as PlusIcon } from '@assets/images/plus.svg';
import { useAuthStore } from '@app/stores';

import * as styles from './WelcomeSection.styles';

export const WelcomeSection = () => {
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
    <Button variant={'outline'} {...styles.Button} onClick={handleSetUpAuction}>
      Set up auction
      <Icon viewBox={'0 0 16 16'} color={'white'} ml={'12px'}><PlusIcon /></Icon>
    </Button>
  );

  if (!address) {
    button = (<Button variant={'outline'} {...styles.Button} onClick={handleSignIn}>Sign in</Button>);
  } else if (!loggedInArtist.universePageAddress) {
    button = (<Button variant={'outline'} {...styles.Button} onClick={handleSetUpProfile}>Set up profile</Button>);
  }

  return (
    <Box {...styles.Wrapper} className="auction__house__welcome__section">
      <Container {...styles.Container}>
        <AnimatedOnScroll animationIn="fadeIn" animationInDelay={200}>
          <Heading as={'h2'} {...styles.SubTitle}>Welcome to the</Heading>
          <Heading as={'h1'} {...styles.Title}>Auction House</Heading>
        </AnimatedOnScroll>
        <AnimatedOnScroll animationIn="fadeIn" animationInDelay={1000}>
          <Text {...styles.Text}>
            Check out on creative releases from artists that partnered with us or set up your own
            auction.
          </Text>
          <Flex justifyContent={'center'}>{button}</Flex>
        </AnimatedOnScroll>
      </Container>
    </Box>
  );
};
