import { Box, Button, Center, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { SystemStyleObject } from '@chakra-ui/styled-system';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Status, Status as PostingPopupStatus } from './compoents/posting-popup/enums';
import { useMarketplaceSellData } from '../../../hooks';
import { GreyBox } from '../../grey-box';
import { EtherIcon, Fee, PostingPopup } from './compoents';
import { fees, totalFee } from './constants';

const styles: Record<string, SystemStyleObject> = {
  mainContainer: {
    '--image-size': {
      base: '100%',
      lg: '290px',
      xl: '390px',
    },
    '--image-margin-right': {
      base: '0',
      lg: '60px',
    },
    borderRadius: '12px',
    boxShadow: '0 10px 36px rgba(136, 120, 172, 0.14)',
    mb: '40px',
    fontSize: '14px',
    flexDir: {
      base: 'column',
      lg: 'row',
    },
    padding: {
      base: '20px',
      md: '50px'
    },
    h4: {
      fontFamily: 'Space Grotesk',
      fontSize: '18px',
      mb: '6px'
    },
  },
  imageContainer: {
    mr: 'var(--image-margin-right)',
    mb: {
      base: '30px',
      md: '40px',
      lg: 0
    },
  },
  textContainer: {
    width: 'calc(100% - var(--image-size) - var(--image-margin-right))',
    img: {
      display: 'inline',
      ml: 2,
      mr: 1,
    },
  },
  greyBox: {
    p: '28px 30px',
    mb: '30px',
    color: '#00000066',
    '> div': {
      _last: {
        color: 'black',
        fontWeight: 'bold',
      },
    },
  }
};

export const SummaryTab = () => {
  const { nft, isPosted, form, goBack } = useMarketplaceSellData();

  const [postingPopupStatus, setPostingPopupStatus] = useState<PostingPopupStatus>(PostingPopupStatus.HIDDEN);

  const handleSave = useCallback(() => {
    setPostingPopupStatus(PostingPopupStatus.PROCESSING)
    form.submitForm();
  }, [nft]);

  const price = useMemo(() => {
    return (form.values as any)?.price?.value;
  }, [form.values]);

  const totalPrice = useMemo(() => {
    return parseFloat((price - (price * totalFee / 100)).toFixed(5));
  }, [form.values, price]);

  useEffect(() => {
    if (isPosted) {
      setPostingPopupStatus(Status.SUCCESS);
    }
  }, [isPosted]);

  return (
    <>
      <Flex sx={styles.mainContainer}>
        <Box sx={styles.imageContainer}>
          <Image src={nft?.nft?.thumbnail_url} borderRadius={'12px'} h={'var(--image-size)'} w={'var(--image-size)'} />
        </Box>
        <Flex sx={styles.textContainer}>
          <Center flexDir={'column'} alignItems={'flex-start'} w={'100%'}>
            <Heading as={'h4'}>Listing</Heading>
            <Text mb={'30px'}>
              Your bundle will be listed for
              <EtherIcon w={'11px'} />
              <strong>{price}</strong>
            </Text>

            <Heading as={'h4'}>Fees</Heading>
            <Text mb={'20px'} color={'#00000066'}>
              Listing is free! At the time of the sale, the following fees will be deducted.
            </Text>

            <GreyBox sx={styles.greyBox}>
              <Fee name={'To Universe'} amount={fees.universe} />
              <Fee name={'To creator'} amount={fees.creator} />
              <Fee name={'Total'} amount={totalFee} />
            </GreyBox>

            <Heading as={'h4'} mb={'0 !important'}>
              You will receive:
              <EtherIcon width={'14px'} />
              {totalPrice}
            </Heading>
          </Center>
        </Flex>
      </Flex>
      <Box textAlign={'right'} mb={'50px'}>
        <Button mr={'10px'} variant={'outline'} onClick={goBack}>Back</Button>
        <Button boxShadow={'xl'} onClick={handleSave}>Post your listing</Button>
      </Box>
      <PostingPopup
        status={postingPopupStatus}
        onClose={() => setPostingPopupStatus(PostingPopupStatus.HIDDEN)}
      />
    </>
  );
};
