import { Box, Button, Container, Heading, Image, Text, Tooltip } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import Slider from 'react-slick';

import * as styles from './AuctionPreview.styles';
import { CopyString, TokenIcon } from "@app/components";

import auctionLPlaceholder from '@assets/images/auction-lp-placeholder.png';
import auctionTierPlaceholder from '@assets/images/auction-tier-placeholder.png';
import checkIcon from '@assets/images/check-black.svg';
import CreatorAvatarImage from '@assets/images/_MOCK_AUCTION_CREATOR2.png';
import arrowDown from '@assets/images/arrow-down.svg';
import cancelIcon from '@assets/images/cancel-icon.svg';
import { TOKENS_MAP } from "@app/constants";
import { useMedia } from "react-use";
import { breakpoints } from "@app/theme/constants";
import leftArrow from "@assets/images/marketplace/bundles-left-arrow.svg";
import rightArrow from "@assets/images/marketplace/bundles-right-arrow.svg";

const BiddersList = () => {
  return (
    <Box {...styles.BiddersListStyle}>
      { [...Array(8)].map((a, i) =>{
        return <SingleBidder key={i} />
      })}
    </Box>
  )
}

const SingleBidder = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleDetails = (() => {
    setIsVisible(!isVisible)
  });

  return (
    <Box {...styles.SingleBidderStyle}>
      <Box {...styles.SingleBidderVisibleInfoStyle}>
        <Box display="flex" alignItems="flex-start" flexDirection={{ base: 'column', md: 'row' }} gap={1} fontSize="14px" lineHeight="20px">
          <Text as='span' fontWeight="600">1. 0x...5492</Text>
          {/* TODO - Change className accordingly: u-platinum | u-gold | u-silver */}
          <Text as='span' {...styles.BidderBadgeStyle} className="u-platinum">Platinum</Text>
        </Box>
        <Box display="flex" alignItems="center" gap={2} fontSize="14px" lineHeight="20px">
          <Box display="flex" alignItems={{ base: 'flex-start', md: 'center' }} flexDirection={{ base: 'column', md: 'row' }} gap={1}>
            <Box display="flex" gap={1}>
              {/* TODO - display colored token icon if possible */}
              <TokenIcon ticker={TOKENS_MAP.ETH.ticker} size={20} />
              <Box as={'strong'} color={'black'}>42</Box>
            </Box>
            <Text as='span' color='rgba(0, 0, 0, 0.4)' fontSize="10px" lineHeight="14px">~$48,580</Text>
          </Box>
          <Button
            className={isVisible ? 'u-flipped' : ''}
            variant="simpleOutline"
            size="xs"
            leftIcon={<Image src={arrowDown} alt="Arrow" />}
            mr={1}
            onClick={toggleDetails}
            {...styles.ToggleBidButtonStyle}
          />
        </Box>
      </Box>
      {
        isVisible && (
          <Box display='flex'  alignItems='flex-start' alignContent='flex-start' flexWrap='wrap' my={2}>
            { [...Array(8)].map((a, i) =>{
              return <Image
                key={i}
                src={auctionTierPlaceholder}
                alt={'Premium tier'}
                borderRadius={'12px'}
                m={1}
                boxSize="70px"
              />
            })}
          </Box>
        )
      }
    </Box>
  )
}

const BiddersBlock = () => {

  const handlePlaceBid = useCallback(() => {
    // TODO - BE implementation
  }, []);

  return (
    <Box {...styles.TopBiddersStyle}>
      <Box display="flex" alignItems="center" justifyContent="space-between" px="32px" mb={4}>
        <Heading fontSize="16px" lineHeight="20px">Top 5 bidders</Heading>
        <Text fontSize="14px" lineHeight="20px" fontWeight={500} textDecoration="underline" cursor="pointer">View all bids</Text>
      </Box>
      <BiddersList />
      <Box gap={2} {...styles.UserBidStyle}>
        <Box display="flex" gap={2} fontSize="16px" lineHeight="24px">
          <Text as='span' fontWeight="600">Your bid:</Text>
          {/* TODO - display colored token icon if possible */}
          <TokenIcon ticker={TOKENS_MAP.ETH.ticker} size={24} />
          <Box as={'strong'} color={'black'}>2.3</Box>
          <Text as='span' color='rgba(0, 0, 0, 0.4)'>(#25 in the list)</Text>
        </Box>
        <Box display="flex">
          <Button {...styles.BidButtonStyle} onClick={handlePlaceBid}>
            Place a bid
          </Button>
          <Tooltip label="Cancel my bid" aria-label='Cancel my bid' fontSize='md'>
            <Button
              variant="ghost"
              leftIcon={<Image src={cancelIcon} alt="Cancel" />}
              ml={3}
              onClick={() => {}}
              {...styles.CancelButtonStyle}
            />
          </Tooltip>
        </Box>
      </Box>
    </Box>
  )
}

const PrevArrow = (props) => {
  const { onClick } = props;

  return (
    <Button
      className={'u-left'}
      variant="simpleOutline"
      size="xs"
      leftIcon={<Image src={leftArrow} alt="Left arrow" />}
      onClick={onClick}
      {...styles.SliderArrowsStyle}
    />
  );
}

const NextArrow = (props) => {
  const { onClick } = props;

  return (
    <Button
      className={'u-right'}
      variant="simpleOutline"
      size="xs"
      leftIcon={<Image src={rightArrow} alt="Right arrow" />}
      onClick={onClick}
      {...styles.SliderArrowsStyle}
    />
  );
}

export const AuctionPreview = () => {

  const isTablet = useMedia(`(max-width: ${breakpoints.lg})`);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  };

  return (
    <Box {...styles.WrapperStyle}>
      <Container {...styles.ContainerStyle}>
        <Box mb={14}>
          <Slider {...settings}>
            { [...Array(10)].map((a, i) =>{
              return <div key={i}><Box  gap={2} {...styles.AuctionItemStyle} className={i === 2 ? 'u-active' : ''}>
                {
                  i === 2 && (
                    <Box {...styles.ActiveAuctionIconStyle}>
                      <Image src={checkIcon} alt="Active" />
                    </Box>
                  )
                }
                <Image
                  src={auctionLPlaceholder}
                  alt={'Premium tier'}
                  borderRadius={'12px'}
                  boxSize={'40px'}
                />
                <Box>
                  <Text fontSize="14px" lineHeight="20px" fontWeight="700">Auction Title Two</Text>
                  <Text fontSize="12px" lineHeight="18px" color="rgba(0, 0, 0, 0.6)">Ends in 2d : 8h : 10m : 15s</Text>
                </Box>
              </Box></div>
            })}
          </Slider>
        </Box>
        <Box {...styles.TierWrapperStyle}>
          <Box display='flex' justifyContent='center' alignItems='flex-start' alignContent='flex-start'>
            <Image
              src={auctionLPlaceholder}
              alt={'Premium tier'}
              borderRadius={'12px'}
              boxSize={{ base: '100%', lg: '445px' }}
            />
          </Box>
          <Box>
            <Heading {...styles.AuctionHeadingStyle} mb={3}>Auction Title Two</Heading>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Image
                src={CreatorAvatarImage}
                alt='Auction creator'
                borderRadius='50%'
                boxSize='30px'
              />
              <Box display="flex" alignItems="center" gap={1}>
                <Text fontSize='14px' lineHeight='20px'>by </Text>
                <Text fontSize='14px' lineHeight='20px' fontWeight={600} textDecoration='underline'>Justin 3LAU</Text>
              </Box>
            </Box>
            <Box display="flex" alignItems={{ base: 'flex-start', lg: 'center' }} flexDirection={{ base: 'column', lg: 'row' }} gap={2} my={4} fontWeight={700}>
              <Text fontSize='14px' lineHeight='20px' fontWeight={700}>Auction ends in: </Text>
              <Box display="flex" alignItems="center" gap={2}>
                <Text border='1px solid rgba(0, 0, 0, 0.1)' borderRadius='10px' p="3px 12px">2d</Text>
                <Text>:</Text>
                <Text border='1px solid rgba(0, 0, 0, 0.1)' borderRadius='10px' p="3px 12px">8h</Text>
                <Text>:</Text>
                <Text border='1px solid rgba(0, 0, 0, 0.1)' borderRadius='10px' p="3px 12px">10m</Text>
                <Text>:</Text>
                <Text border='1px solid rgba(0, 0, 0, 0.1)' borderRadius='10px' p="3px 12px">15s</Text>
              </Box>
              <CopyString str="Copy string" />
            </Box>
            {!isTablet && <BiddersBlock />}
          </Box>
        </Box>
        {isTablet && <BiddersBlock />}
      </Container>
    </Box>
  );
};
