import React from "react";
import {
  Box,
  Heading,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Animated } from 'react-animated-css';
import * as styles from './HeroSection.styles';
import { CopyAndLinkAddress } from "@app/components";
import { HeroBio, HeroAdditionalOptions, HeroPreviewBanner } from './components';
import { useAuthStore } from "../../../../../stores/authStore";
import { IUser } from "@app/types";
import defaultImage from "@assets/images/default-img.svg";

interface IHeroSectionProps {
  walletAddress: string;
  user: IUser;
}

export const HeroSection = ({ walletAddress, user }: IHeroSectionProps) => {
  const { query: { isPreview } } = useRouter();
  const { address, previewUserData } = useAuthStore(s => ({
    address: s.address,
    previewUserData: s.previewUserData,
  }));


  const getProfileImage = (accountImage: any) => {
    const userUploadImageURL =
      accountImage && typeof accountImage === 'object' && URL.createObjectURL(accountImage);
    const alreadyUploadedImageURL = accountImage;

    let image;
    if (userUploadImageURL) {
      image = userUploadImageURL;
    } else if (alreadyUploadedImageURL) {
      image = alreadyUploadedImageURL;
    } else {
      image = defaultImage;
    }

    return image;
  };

  const userData = {
    ...user,
    ...(isPreview && {
      ...previewUserData,
      avatar: getProfileImage(previewUserData.avatar),
    })
  };

  return (
    <Box {...styles.HeroSectionWrapperStyle}>
      <Box
        {...styles.HeroSectionBackgroundStyle}
        bg={
          userData.avatar
            ? `url(${userData.avatar}) no-repeat center center`
            : 'linear-gradient(135deg, #4568DC 0%, #B06AB3 100%)'
        }
        bgSize='cover'
      />
      {
        isPreview && (
          <Box {...styles.HeroSectionContainerStyle}>
            <HeroPreviewBanner />
          </Box>
        )
      }
      <Animated animationIn="zoomIn" animationOut="zoomIn" isVisible>
        <Box {...styles.HeroSectionContainerStyle}>
          {userData.avatar ? (
            <Image {...styles.AvatarStyle} src={userData.avatar} alt={userData.name} />
          ) : (
            <Box {...styles.AvatarEmptyStyle} />
          )}
          <Box {...styles.InfoStyle}>
            <Box {...styles.InfoTopStyle}>
              <Box>
                <Heading as='h1' fontSize={{ sm: '20px', lg: '26px', xl: '32px' }}>{userData.name || "Unnamed"}</Heading>
                <CopyAndLinkAddress walletAddress={walletAddress} />
              </Box>
              <Box display={{ base: 'none', lg: 'flex' }}>
                <HeroAdditionalOptions
                  user={userData}
                  showEditBtn={address === walletAddress}
                  isPreview={isPreview === 'true'}
                />
              </Box>
            </Box>
            <Box display={{ base: 'none', lg: 'flex' }} mt={2}>
              {userData.about && <HeroBio bio={userData.about} />}
            </Box>
          </Box>
        </Box>
        {/* Shown on mobile */}
        <Box display={{ base: 'flex', lg: 'none' }} mt={3}>
          {userData.about && <HeroBio bio={userData.about} />}
        </Box>
        <Box display={{ base: 'flex', lg: 'none' }} mt={3}>
          <HeroAdditionalOptions
            user={userData}
            showEditBtn={address === walletAddress}
            isPreview={isPreview === 'true'}
          />
        </Box>
      </Animated>
    </Box>
  );
};
