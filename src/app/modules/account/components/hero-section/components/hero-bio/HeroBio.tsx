import React from 'react';
import { Text } from '@chakra-ui/react';
import ReadMoreAndLess from 'react-read-more-less';
import * as styles from "../../HeroSection.styles";

interface IHeroBioProps {
  bio: string;
}

export const HeroBio = ({ bio }: IHeroBioProps) => {
  return (
    <Text {...styles.BioStyle}>
      <ReadMoreAndLess
        charLimit={190}
        readMoreText="Read more"
        readLessText="Read less"
      >
        {bio}
      </ReadMoreAndLess>
    </Text>
  );
};
