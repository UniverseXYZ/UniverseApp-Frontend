import { Button, Flex, Image, Link, SimpleGrid, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useCallback, useState } from 'react';

import BubbleImage from '@assets/images/text-bubble-2x.png';
import plusIcon from '@assets/images/plus.svg';
import { Alert } from '@app/components';
import { AuctionCard, AuctionCardSkeleton } from '@app/modules/auctions/components';
import { useMeasure } from 'react-use';
import { useFluidGrid } from '@app/hooks';

type IAuction = any;

interface IAuctionsListProps {
  type: 'active' | 'future';
}

export const AuctionsList = (props: IAuctionsListProps) => {
  const { type } = props;

  const [ref, { width: containerWidth }] = useMeasure<HTMLDivElement>();

  const { columns, spacingX } = useFluidGrid(containerWidth, 280, 24);

  const [auctions] = useState(new Array(4).fill(null));

  const isLoading = false;

  const isFillOutProfileAlert = false;

  const renderLoading = useCallback(() => (
    <SimpleGrid ref={ref} columns={columns} spacing={`${spacingX}px`} my={'30px'}>
      {new Array(columns).fill(null).map((_, i) => (<AuctionCardSkeleton key={i} />))}
    </SimpleGrid>
  ), []);

  if (isLoading) {
    return renderLoading();
  }

  if (!auctions.length) {
    return (
      <Flex ref={ref} alignItems={'center'} color={'rgba(0 0 0 / 40%)'} justifyContent={'center'} flexDir={'column'} py={'140px'}>
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
    <SimpleGrid ref={ref} columns={columns} spacing={`${spacingX}px`} my={'30px'}>
      {auctions.map((_, i) => (<AuctionCard key={i} />))}
    </SimpleGrid>
  );
};
