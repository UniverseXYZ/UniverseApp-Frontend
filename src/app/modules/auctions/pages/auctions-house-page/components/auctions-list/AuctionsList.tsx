import { Button, Flex, Image, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

import BubbleImage from '@assets/images/text-bubble-2x.png';
import plusIcon from '@assets/images/plus.svg';
import { Alert } from '@app/components';

type IAuction = any;

interface IAuctionsListProps {
  type: 'active' | 'future';
}

export const AuctionsList = (props: IAuctionsListProps) => {
  const { type } = props;

  const auctions = [];

  const isFillOutProfileAlert = false;

  if (!auctions.length) {
    return (
      <Flex alignItems={'center'} color={'rgba(0 0 0 / 40%)'} justifyContent={'center'} flexDir={'column'} py={'140px'}>
        <Image src={BubbleImage} alt={'Bubble'} w={'100px'} mb={'30px'} />
        <Text fontSize={'18px'} fontWeight={500} mb={'6px'}>No {type} auctions found</Text>
        {!isFillOutProfileAlert ? (
          <Text fontSize={'14px'} fontWeight={400} mb={'30px'}>Create auction by clicking the button below</Text>
        ) : (
          <Alert status={'warning'} maxW={'650px'} my={'30px'}>
            Please, fill out the profile details before you set up an auction.
            <NextLink href='/my-account' passHref>
              <Link ml={'6px'}>Go to my profile.</Link>
            </NextLink>
          </Alert>
        )}

        <Button boxShadow={'lg'} padding={'11px 16px'} disabled={isFillOutProfileAlert}>
          Set up auction
          <Image src={plusIcon} alt="icon" ml={'12px'} />
        </Button>
      </Flex>
    );
  }

  return (
    <>{type} Auction list</>
  );
};
