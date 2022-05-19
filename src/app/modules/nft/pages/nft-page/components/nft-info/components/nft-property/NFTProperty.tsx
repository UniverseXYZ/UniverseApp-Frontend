import { INFTProperty } from "@app/modules/nft/types";
import { LinkBox, LinkBoxProps, LinkOverlay, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import * as styles from "./NFTProperty.styles";

export interface INFTPropertyProps extends Omit<LinkBoxProps, "property"> {
  property: INFTProperty;
  collectionAddress: string;
}

export const NFTProperty = (props: INFTPropertyProps) => {
  const { property, collectionAddress, ...rest } = props;

  return (
    <LinkBox {...styles.PropertyContainerStyle} {...rest}>
      <NextLink href={`/collection/${collectionAddress}/?trait_type=`}>
        <LinkOverlay>
          <Text {...styles.PropertyNameStyle}>{property?.traitType}</Text>
          <Text {...styles.PropertyValueStyle}>{property?.value}</Text>
        </LinkOverlay>
      </NextLink>
    </LinkBox>
  );
};
