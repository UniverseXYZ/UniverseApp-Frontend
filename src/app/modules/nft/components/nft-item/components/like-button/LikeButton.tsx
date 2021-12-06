import {
  Avatar,
  AvatarGroup,
  Button,
  ButtonProps,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger, Text,
} from '@chakra-ui/react';
import React from 'react';

import { INft } from '../../../../types';
import heartFilled from '../../../../../../../assets/images/marketplace/heart-filled.svg';
import heart from '../../../../../../../assets/images/marketplace/heart.svg';
import heartHover from '../../../../../../../assets/images/marketplace/heart-hover.svg';

interface ILikeButtonProps extends ButtonProps, Pick<INft, 'likes' | 'isLiked'> {
  onToggle?: (isLiked: boolean) => void;
}

export const LikeButton = ({ isLiked, likes, onToggle, sx = {}, ...rest }: ILikeButtonProps) => {
  return (
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
          {likes.length}
        </Button>
      </PopoverTrigger>
      <PopoverContent width={'fit-content'}>
        <PopoverArrow />
        <PopoverBody>
          <Text fontWeight={700} mb={'6px'}>{likes.length} people liked this</Text>
          <AvatarGroup size='md' spacing={'-6px'}>
            {likes.slice(0, 6).map((avatar, i) => (
              <Avatar key={i} src={avatar} w={'26px'} h={'26px'} />
            ))}
          </AvatarGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
