import React, { useState } from 'react';
import { Text } from "@chakra-ui/react";

interface IBioProps {
  bio: string;
}

const Bio = ({ bio }: IBioProps) => {

  const [showMore, setShowMore] = useState(false);

  const maxNumber = 190;
  const isLonger = bio.length > maxNumber;

  return (
    <Text fontSize='14px' color='rgba(0, 0, 0, 0.6)' width={{ lg: '100%', xl:'50%' }} whiteSpace='pre-wrap' wordBreak='break-all'>
      {showMore ? bio : bio.substring(0, maxNumber)}
      {(isLonger && !showMore) && '...'}
      { isLonger && (
        <Text
          as="span"
          ml='6px'
          textDecoration="underline"
          cursor="pointer"
          white-space="pre-wrap"
          word-break="break-all"
          fontWeight='600'
          onClick={() => setShowMore(!showMore)}
        >
          {`Read ${showMore ? 'less' : 'more'}`}
        </Text>
      )}
    </Text>
  );
};

export default Bio;
