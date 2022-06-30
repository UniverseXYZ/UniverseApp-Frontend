import { Box, Button, Container, Heading, Image, Text } from "@chakra-ui/react";

import * as styles from './CreatorSection.styles';
import React from "react";
import CreatorAvatarImage from '@assets/images/_MOCK_AUCTION_CREATOR2.png';
import twitterIcon from "@assets/images/icons_twitter.svg";
import instagramIcon from '@assets/images/instagram-outlined.svg';

export const CreatorSection = () => {

  return (
    <Box {...styles.WrapperStyle}>
      <Container {...styles.ContainerStyle}>
        <Box display="flex" alignItems={{ base: 'flex-start', md: 'center' }} flexDirection={{ base: 'column', md: 'row' }} gap={{ base: 6, md: 12 }} my={4} fontWeight={700}>
          <Image
            src={CreatorAvatarImage}
            alt={'User'}
            borderRadius={'12px'}
            boxSize={{ base: '70px', md: '200px' }}
          />
          <Box>
            <Heading {...styles.HeadingStyle}>About Justin 3LAU</Heading>
            <Text fontSize="16px" lineHeight="24px" fontWeight={400} color="rgba(0, 0, 0, 0.6)">Cras vel eget vitae quis scelerisque arcu ut. Tristique velit nec sed sit massa. Odio molestie velit purus at blandit. Lacus, fusce imperdiet velit augue neque tincidunt diam fringilla in. Natoque ipsum ipsum eget pellentesque. Magna felis, praesent ornare tincidunt nunc.</Text>
            <Box display="flex" gap={2} mt={4}>
              <Button
                variant="simpleOutline"
                leftIcon={<Image src={instagramIcon} alt="Arrow" />}
                mr={1}
                {...styles.SocialButtonStyle}
              />
              <Button
                variant="simpleOutline"
                leftIcon={<Image src={twitterIcon} alt="Arrow" />}
                mr={1}
                {...styles.SocialButtonStyle}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
