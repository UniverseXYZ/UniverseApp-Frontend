import { Box, Button, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import React from "react";
import { useRouter } from "next/router";
import collectionIcon from "@assets/images/collection-icon.svg";
import listIcon from "@assets/images/list-icon.svg";
import nftIcon from "@assets/images/nft-icon.svg";
import * as styles from "./CreateButton.styles";

interface ICreateButtonProps {
  profilePath: string;
  isFullWidth: boolean;
}

export const CreateButton = ({ profilePath, isFullWidth }: ICreateButtonProps) => {

  const router = useRouter();

  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="outline"
        className="u-button--contrast"
        isFullWidth={isFullWidth}
      >
        <Box as="span">Create</Box>
      </MenuButton>
      <MenuList minWidth={isFullWidth ? '85vw' : '150px'}>
        <MenuItem onClick={() => router.push(profilePath)}>
          <Image src={listIcon} mr={2} alt="Listing" />
          <Text {...styles.LabelStyle}>Listing</Text>
        </MenuItem>
        <MenuItem onClick={() => router.push('/my-nfts/create?tabIndex=1&nftType=single')}>
          <Image src={nftIcon} mr={2} alt="NFT" />
          <Text {...styles.LabelStyle}>NFT</Text>
        </MenuItem>
        <MenuItem onClick={() => router.push('/my-nfts/create?tabIndex=1&nftType=collection')}>
          <Image src={collectionIcon} mr={2} alt="Collection" />
          <Text {...styles.LabelStyle}>Collection</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
