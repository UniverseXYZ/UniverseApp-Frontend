import { Box, Image, Link, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { shortenEthereumAddress } from "@legacy/helpers/format";
import linkIcon from "@assets/images/link.svg";
import * as styles from './CopyAndLinkAddress.styles';

interface ICopyAndLinkAddressProps {
  walletAddress: string;
}

export const CopyAndLinkAddress = ({ walletAddress }: ICopyAndLinkAddressProps) => {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleOnCopy = () => {
    setCopiedAddress(true);
    setTimeout(() => {
      setCopiedAddress(false);
    }, 1000);
  }

  return (
    <Box {...styles.AddressWrapperStyle}>
      <Box {...styles.AddressCopyStyle}>
        <div title="Copy to clipboard">
          <Text {...styles.AddressCopiedStyle} hidden={!copiedAddress}>Copied <span/></Text>
          <CopyToClipboard text={walletAddress} onCopy={handleOnCopy}>
            <Text color="#4d66eb" fontSize="12px" p="6px 10px">{shortenEthereumAddress(walletAddress)}</Text>
          </CopyToClipboard>
        </div>
      </Box>
      <Link
        href={`${process.env.REACT_APP_ETHERSCAN_URL}/address/${walletAddress}`}
        className="c-address__link"
        isExternal
      >
        <Image src={linkIcon} alt="Href" />
      </Link>
    </Box>
  );
};
