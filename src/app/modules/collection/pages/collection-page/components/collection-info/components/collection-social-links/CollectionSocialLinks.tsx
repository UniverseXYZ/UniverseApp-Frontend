import { Box, Button, DarkMode, HStack, Link, Menu, MenuButton, MenuItem, MenuList, Tooltip } from '@chakra-ui/react';
import React from 'react';

import { Icon, Icons } from '@app/components';

import * as s from './CollectionSocialLinks.styles';

interface ICollectionSocialLinksProps {
  instagram?: string;
  site?: string;
  medium?: string;
  discord?: string;
  telegram?: string;
  twitter?: string;
}

export const CollectionSocialLinks: React.FC<ICollectionSocialLinksProps> = (props) => {
  type ILink = {
    icon: Icons;
    name: string;
    link: string | null;
  };

  const links: ILink[] = [
    {
      icon: 'twitter',
      name: 'Twitter',
      link: props.twitter ?  `https://twitter.com/${props.twitter}` : null,
    },
    {
      icon: 'discord',
      name: 'Discord',
      link: props.discord ?  `https://discord.gg/${props.discord}` : null,
    },
    {
      icon: 'globe',
      name: 'Website',
      link: props.site || null,
    },
    {
      icon: 'instagram',
      name: 'Instagram',
      link: props.instagram ? `https://instagram.com/${props.instagram}` : null,
    },
    {
      icon: 'medium',
      name: 'Medium',
      link: props.medium ? `https://medium.com/@${props.medium}` : null,
    },
    {
      icon: 'telegram',
      name: 'Telegram',
      link: props.telegram ? `https://t.me/${props.telegram}` : null,
    },
  ];

  return (
    <Box>
      <HStack spacing={'12px'} display={['none', null, 'flex']}>
        {links.map(({ name, icon, link }, i) => !link ? null : (
          <DarkMode key={i}>
            <Tooltip hasArrow label={name} placement={'top'} colorScheme={'white'}>
              <Link href={link} isExternal={true} {...s.IconLink}>
                <Icon name={icon} />
              </Link>
            </Tooltip>
          </DarkMode>
        ))}
      </HStack>

      <Menu>
        <MenuButton as={Button} variant={'ghostAlt'} display={['flex', null, 'none']} {...s.MenuButton}>
          <Icon name={'dots3'} />
        </MenuButton>
        <MenuList>
          {links.map(({ name, icon, link }, i) => !link ? null : (
            <MenuItem key={i} {...s.MenuItem} onClick={() => window?.open(link, '_blank')?.focus()}>
              <Icon name={icon} mr={'12px'} />
              {name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
}
