import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  ButtonProps,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import heartFilled from '../../../../../../../assets/images/marketplace/heart-filled.svg';
import heart from '../../../../../../../assets/images/marketplace/heart.svg';
import heartHover from '../../../../../../../assets/images/marketplace/heart-hover.svg';

import { NFTLikesPopup } from '../../../nft-likes-popup';
import { NftLikes } from '../../../../../../mocks';

interface INFTLikeProps extends ButtonProps {
  likes: string[];
  isLiked: boolean;
  onToggle?: (isLiked: boolean) => void;
}

export const NFTLike = ({ isLiked, likes, onToggle, sx = {}, ...rest }: INFTLikeProps) => {

  const [isLikesPopupOpened, setIsLikesPopupOpened] = useState(false);

  return (
    <>
      <Popover trigger={'hover'} placement={'top'} variant={'tooltip'}>
        <PopoverTrigger>
          <Button
            leftIcon={
              <>
                <Image src={isLiked ? heartFilled : heart} w={'14px'} display={'inline'} />
                <Image src={isLiked ? heartFilled : heartHover} w={'14px'} display={'none'} />
              </>
            }
            size={'sm'}
            variant='simpleOutline'
            sx={{
              '--hover-color': '#FF4949',
              color: isLiked ? 'var(--hover-color)' : 'rgba(0, 0, 0, 0.4)',
              fontSize: '12px',
              _hover: {
                color: 'var(--hover-color)',
                '.chakra-button__icon:first-of-type img': {
                  '&:nth-of-type(1)': { display: 'none', },
                  '&:nth-of-type(2)': { display: 'inline', }
                }
              },
              ...sx,
            }}
            {...rest}
            onClick={() => onToggle && onToggle(!isLiked)}
          >
            {NftLikes.length}
          </Button>
        </PopoverTrigger>
        <PopoverContent width={'fit-content'}>
          <PopoverArrow />
          <PopoverBody>
            <Box sx={{ cursor: 'pointer' }} onClick={() => setIsLikesPopupOpened(true)}>
              <Text fontWeight={700} mb={'6px'}>{NftLikes.length} people liked this</Text>
              <AvatarGroup size='md' spacing={'-6px'}>
                {NftLikes.slice(0, 6).map((like, i) => (
                  <Avatar key={i} src={like.avatar} w={'26px'} h={'26px'} />
                ))}
              </AvatarGroup>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <NFTLikesPopup isOpen={isLikesPopupOpened} onClose={() => setIsLikesPopupOpened(false)} />
    </>
  );
};
