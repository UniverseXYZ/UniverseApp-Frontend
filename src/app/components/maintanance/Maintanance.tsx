import { Box, Heading, Image, Link, Text } from '@chakra-ui/react';
import Marquee from 'react-fast-marquee';

import NFTEmbed from './../../../assets/images/nft-embed.png';
import CharlesGif from './../../../assets/images/charles.gif';
import UnderConstruction from './../../../assets/images/under-construction.png';

export const Maintanance = () => (
  <Box layerStyle={'StoneBG'} mt={'8px'}>
    <Box textAlign={'center'} mt={'64px'}>

      <Image
        src={CharlesGif}
        pos={'relative'}
        top={'2px'}
        left={'50%'}
        transform={'translateX(-50%)'}
      />

      <Box pos={'relative'} mb={'64px'}>
        <Marquee gradient={false}>
          <Box bgImage={UnderConstruction} h={'24px'} w={'100%'} />
        </Marquee>

        <Box bg={'#FFD90B'} pos={'absolute'} top={'50%'} w={'100%'} transform={'translateY(-50%)'} zIndex={1}>
          <Marquee gradient={false} direction={'right'}>
            {new Array(30).fill(null).map((_, i) => (
              <Heading key={i} fontSize={'10px'} mx={'8px'} py={'2px'}>
                MAINTENANCE
              </Heading>))}
          </Marquee>
        </Box>
      </Box>

      <Box px={['16px', null, null, 0]}>
        <Heading fontSize={'32px'} mb={'16px'}>Don’t worry, Charles is working on it!</Heading>
        <Text color={'#00000099'} fontSize={'18px'}>
          The marketplace is under maintenance, we’ll be back soon!
        </Text>
      </Box>
    </Box>

    <Box my={'80px'} textAlign={'center'} px={['16px', null, null, 0]}>
      <Heading fontSize={'16px'} mb={'24px'}>
        In the meantime, make sure to check the NFT Embed at <Link href={'https://nftembed.org'} target={'blank'} color={'#4D66EB'}>nftembed.org</Link>
      </Heading>

      <Link href={'https://nftembed.org'} target={'blank'} outline={'none !important'}>
        <Image
          src={NFTEmbed}
          alt={'NFT Embed'}
          boxShadow={'0px 10px 36px rgba(46, 35, 72, 0.14)'}
          m={'auto'}
          maxW={'730px'}
          w={'100%'}
          transition={'200ms'}
          _hover={{
            transform: 'scale(1.05)',
          }}
        />
      </Link>
    </Box>
  </Box>
);
