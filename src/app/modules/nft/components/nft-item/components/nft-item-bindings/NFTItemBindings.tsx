import { Avatar, Box, BoxProps, Tooltip, TooltipProps } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { ICollection, IUser } from '../../../../types';

interface INFTItemBindingsProps {
  creator?: IUser;
  collection?: ICollection;
  owner?: IUser;
  wrapperProps?: BoxProps;
  tooltipProps?: TooltipProps;
}

export const NFTItemBindings = ({ creator, collection, owner, wrapperProps, tooltipProps }: INFTItemBindingsProps) => {
  const avatars = useMemo(() => {
    const avatars = [];

    if (creator) {
      avatars.push({
        name: 'Creator',
        value: creator.displayName,
        img: creator.profileImageUrl,
      });
    }
    if (collection) {
      avatars.push({
        name: 'Collection',
        value: collection.name,
        img: collection.coverUrl,
      });
    }
    if (owner) {
      avatars.push({
        name: 'Owner',
        value: owner.displayName,
        img: owner.profileImageUrl,
      });
    }

    return avatars;
  }, [creator, collection, owner]);

  return (
    <Box {...wrapperProps}>
      {avatars.map((avatar, i) => (
        <Tooltip
          key={i}
          hasArrow
          label={`${avatar.name}: ${avatar.value}`}
          placement={'top'}
          variant={'black'}
          fontWeight={700}
          {...tooltipProps}
        >
          <Avatar
            w={'26px'}
            h={'26px'}
            src={avatar.img}
            name={`${avatar.value?.charAt(0)}`}
            border={'2px solid white'}
            _notFirst={{
              marginLeft: '-7px',
              position: 'relative',
            }}
          />
        </Tooltip>
      ))}
    </Box>
  );
};
