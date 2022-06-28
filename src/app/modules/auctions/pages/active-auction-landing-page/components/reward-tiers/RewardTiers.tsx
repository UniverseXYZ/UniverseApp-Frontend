import { Box, Container, Heading, Text } from "@chakra-ui/react";

import * as styles from './RewardTiers.styles';

export const RewardTiers = () => {

  return (
    <Box {...styles.WrapperStyle}>
      <Container {...styles.ContainerStyle}>
        <Box {...styles.HeadingWrapperStyle}>
          <Heading {...styles.HeadingStyle}>Reward tiers</Heading>
          <Text {...styles.TextStyle}>Each Tier has different rewards and different winners! Look through the Tiers and the NFTs for each.</Text>
        </Box>
      </Container>
    </Box>
  );
};
