import { Box, Button, Center, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { SystemStyleObject } from '@chakra-ui/styled-system';
import React from 'react';

import nft from '../../../../../mocks/assets/nft.png';
import ethereumIcon from '../../../../../../../../assets/images/eth-icon-new.svg';
import { fees } from '../../../../../mocks/fees';
import { useMarketplaceSellData } from '../../../hooks';
import { GreyBox } from '../../grey-box';

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
  const sellData = useMarketplaceSellData();

  return (
    <>
      <Flex sx={styles.mainContainer}>
        <Box sx={styles.imageContainer}>
          <Image src={nft} h={'var(--image-size)'} w={'var(--image-size)'} />
        </Box>
        <Flex sx={styles.textContainer}>
          <Center flexDir={'column'} alignItems={'flex-start'} w={'100%'}>
            <Heading as={'h4'}>Listing</Heading>
            <Text mb={'30px'}>
              Your bundle will be listed for
              <Image
                src={ethereumIcon}
                alt='Ethereum icon'
                w={'11px'}
              />
              <strong>0.8</strong>
            </Text>

            <Heading as={'h4'}>Fees</Heading>
            <Text mb={'20px'} color={'#00000066'}>
              Listing is free! At the time of the sale, the following fees will be deducted.
            </Text>

            <GreyBox sx={styles.greyBox}>
              {fees.map((fee, i) => (
                <Flex py={'5px'} key={i}>
                  <Box>{fee.name}</Box>
                  <Flex flex={1} borderBottom={'2px dotted rgba(0, 0, 0, 0.1)'} m={'5px'} />
                  <Box>{fee.value}%</Box>
                </Flex>
              ))}
            </GreyBox>

            <Heading as={'h4'} mb={'0 !important'}>
              You will receive:
              <Image
                src={ethereumIcon}
                alt='Ethereum icon'
                width={'14px'}
              />
              0.7
            </Heading>
          </Center>
        </Flex>
      </Flex>
      <Box textAlign={'right'} mb={'50px'}>
        <Button mr={'10px'} variant={'outline'} onClick={sellData.goBack}>Back</Button>
        <Button boxShadow={'xl'} onClick={sellData.form.submitForm}>Post your listing</Button>
      </Box>
    </>
  );
};
