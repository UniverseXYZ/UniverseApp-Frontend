import React from 'react';
import { Box, Image, Link } from "@chakra-ui/react";
import * as styles from "../../HeroSection.styles";
import twitterIcon from '@assets/images/icons_twitter.svg';
import instagramIcon from '@assets/images/instagram-outlined.svg';
import websiteIcon from '@assets/images/website.svg';

interface IHeroSocialsProps {
  instagram: string;
  twitter: string;
  website: string;
}

export const HeroSocials = ({ instagram, twitter, website }: IHeroSocialsProps) => {
  return (
    <Box {...styles.SocialsWrapperStyle}>
      {instagram && (
        <Link
          href={`https://www.instagram.com/${instagram}`}
          title={`https://www.instagram.com/${instagram}`}
          rel="noreferrer"
          isExternal
          className="c-social-item"

        >
          <Image src={instagramIcon} alt="Instagram" />
        </Link>
      )}
      {twitter && (
        <Link
          href={`https://twitter.com/${twitter}`}
          title={`https://twitter.com/${twitter}`}
          rel="noreferrer"
          isExternal
          className="c-social-item"
        >
          <Image src={twitterIcon} alt="Twitter" />
        </Link>
      )}
      {/* TODO - check and fix `website` prop name when BE done */}
      {website && (
        <Link
          href={website}
          title={website}
          rel="noreferrer"
          isExternal
          className="c-social-item"
        >
          <Image src={websiteIcon} alt="Website" />
        </Link>
      )}
    </Box>
  );
};
