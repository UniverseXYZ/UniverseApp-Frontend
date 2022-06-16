import {
  Box,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuList,
  useClipboard
} from "@chakra-ui/react";
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { HeroSocials } from '../hero-socials';
// TODO: move MenuItem to global components
import { MenuItem } from '@app/modules/nft/components/nft-menu/components';
import * as styles from '@app/modules/nft/components/nft-menu/styles';
import copyOutlinedIcon from '@assets/images/copy-outlined.svg';
import editIcon from '@assets/images/edit-rounded.svg';
import twitterIcon from '@assets/images/icons_twitter.svg';
import socialShareIcon from '@assets/images/social-share.svg';
import { IUser } from "@app/types";

interface IHeroAdditionalOptionsProps {
  user: IUser;
  showEditBtn: boolean;
  isPreview?: boolean;
}

export const HeroAdditionalOptions = ({ user, showEditBtn, isPreview }: IHeroAdditionalOptionsProps) => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const { onCopy } = useClipboard(location?.href ?? "");

  const changeCopyText = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <>
      <HeroSocials
        instagram={user.instagramLink}
        twitter={user.twitterLink}
        website={user.websiteLink}
      />
      <Menu placement={"bottom-end"}>
        <MenuButton
          as={Button}
          variant="simpleOutline"
          leftIcon={<Image src={socialShareIcon} alt="Social share" />}
          disabled={isPreview}
          {...styles.ButtonStyle}
        >
          <Box as="span" display={{ base: 'none', xl: 'inline' }}>Share</Box>
        </MenuButton>
        <MenuList {...styles.ListStyle}>
          <MenuItem
            name={copied ? "Copied" : "Copy Link"}
            icon={copyOutlinedIcon}
            onClick={() => {
              onCopy();
              changeCopyText();
            }}
          />
          <MenuItem
            name="Share on Twitter"
            icon={twitterIcon}
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  location?.href
                )}`,
                "_blank"
              )
            }
          />
        </MenuList>
      </Menu>
      {showEditBtn && (
        <Button
          variant="simpleOutline"
          leftIcon={<Image src={editIcon} alt="Pencil" />}
          ml={3}
          onClick={() => router.push("/my-account")}
          disabled={isPreview}
          {...styles.ButtonStyle}
        >
          <Box as="span" display={{ base: 'none', xl: 'inline' }}>Edit Profile</Box>
        </Button>
      )}
    </>
  );
};
