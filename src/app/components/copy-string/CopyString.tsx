import { Box, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import copyIcon from "@assets/images/copy1.svg";
import * as styles from './CopyString.style';

interface ICopyStringProps {
  str: string;
}

export const CopyString = ({ str }: ICopyStringProps) => {
  const [copied, setCopied] = useState(false);

  const handleOnCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  return (
    <CopyToClipboard text={str} onCopy={handleOnCopy}>
      <Box display='flex' alignItems='center' cursor='pointer' gap={1} {...styles.CopyWrapperStyle}>
        <Image
          src={copyIcon}
          alt="Copy to clipboard icon"
          boxSize='20px'
        />
        <Text fontSize='12px' lineHeight='18px' fontWeight={500} color='rgba(0, 0, 0, 0.5)'>
          {copied ? 'Copied!' : 'Copy URL'}
        </Text>
      </Box>
    </CopyToClipboard>
  );
};
