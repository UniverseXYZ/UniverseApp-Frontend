import {
  Box,
  Heading,
  Image,
} from "@chakra-ui/react";
import { Animated } from 'react-animated-css';
import * as styles from './HeroSection.styles';
import React from "react";
import { CopyAndLinkAddress } from "@app/components";
import Bio from "./Bio";
import AdditionalOptions from "./AdditionalOptions";
import { useAuthStore } from "../../../../../stores/authStore";
import { IUser } from "@app/types";

interface IHeroSectionProps {
  walletAddress: string;
  user: IUser;
}

export const HeroSection = ({ walletAddress, user }: IHeroSectionProps) => {

  const address = useAuthStore((s) => s.address);

  return (
    <Box {...styles.HeroSectionWrapperStyle}>
      <Box
        {...styles.HeroSectionBackgroundStyle}
        bg={
          user.avatar
            ? `url(${user.avatar}) no-repeat center center`
            : 'linear-gradient(135deg, #4568DC 0%, #B06AB3 100%)'
        }
        bgSize='cover'
      />
      <Animated animationIn="zoomIn">
        <Box {...styles.HeroSectionContainerStyle}>
          {user.avatar ? (
            <Image {...styles.AvatarStyle} src={user.avatar} alt={user.name} />
          ) : (
            <Box {...styles.AvatarEmptyStyle} />
          )}
          <Box {...styles.InfoStyle}>
            <Box {...styles.InfoTopStyle}>
              <Box>
                <Heading as='h1' fontSize={{ sm: '20px', lg: '26px', xl: '32px' }}>{user.name || "Unnamed"}</Heading>
                <CopyAndLinkAddress walletAddress={walletAddress} />
              </Box>
              <Box display={{ base: 'none', lg: 'flex' }}>
                <AdditionalOptions
                  user={user}
                  showEditBtn={address === walletAddress}
                />
              </Box>
            </Box>
            <Box display={{ base: 'none', lg: 'flex' }} mt={2}>
              {user.about && <Bio bio={user.about} />}
            </Box>
          </Box>
        </Box>
        {/* Shown on mobile */}
        <Box display={{ base: 'flex', lg: 'none' }} mt={3}>
          {user.about && <Bio bio={user.about} />}
        </Box>
        <Box display={{ base: 'flex', lg: 'none' }} mt={3}>
          <AdditionalOptions
            user={user}
            showEditBtn={address === walletAddress}
          />
        </Box>
      </Animated>
    </Box>
  );
};
