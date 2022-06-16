import React from 'react';
import { Box, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as styles from "@app/modules/account/components/hero-section/HeroSection.styles";
import exclamationIcon from "@assets/images/exclamation-icon.svg";

export const HeroPreviewBanner = () => {

  const router = useRouter();

  return (
    <Box {...styles.PreviewBannerStyle}>
      <Box display='flex' alignItems='center'>
        <Image src={exclamationIcon} mr={2} alt="Attention" />
        <Text {...styles.PreviewBannerTextStyle} as='span'>
          Preview Mode
        </Text>
      </Box>
      <Text
        {...styles.PreviewBannerExitStyle}
        as='span'
        onClick={() => router.push({
          pathname: '/my-account',
          query: { exitedPreviewMode: true }
        })}
      >
        Exit Preview Mode
      </Text>
    </Box>
  );
};
