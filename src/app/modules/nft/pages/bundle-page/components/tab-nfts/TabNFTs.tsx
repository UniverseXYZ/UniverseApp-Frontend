import { Box, Image, Text } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { groupBy } from 'lodash';

import { INFT } from '../../../../types';
import * as styles from './styles';
import { isNFTAssetAudio, isNFTAssetImage, isNFTAssetVideo } from '../../../../helpers';

import AudioNFTPreviewImage from '../../../../../../../assets/images/v2/audio-nft-preview.png';

interface ITabNFTsProps {
  NFTs: INFT[];
}

export const TabNFTs = ({ NFTs: _NFTs }: ITabNFTsProps) => {
  const router = useHistory();

  const handleNFTClick = useCallback((address, tokenId) => {
    router.push(`/v2/nft/${address}/${tokenId}`);
  }, []);

  const NFTs = useMemo(() => {
    if (!_NFTs) {
      return {};
    }
    return groupBy(_NFTs, (NFT) => NFT.thumbnailUrl);
  }, [_NFTs]);

  return (
    <Box>
      {Object.keys(NFTs).map((key, i) => {
        const NFT = NFTs[key][0];
        return (
          <Box key={i} {...styles.ItemStyle} onClick={() => handleNFTClick(NFT.collection?.address, NFT.tokenId)}>
            {isNFTAssetImage(NFT.artworkType) && <Image src={NFT.thumbnailUrl} />}
            {isNFTAssetVideo(NFT.artworkType) && <video src={NFT.thumbnailUrl} />}
            {isNFTAssetAudio(NFT.artworkType) && <Image src={AudioNFTPreviewImage} />}
            <Box>
              <Text>{NFT.name}</Text>
              <Text>
                <Image src={NFT.owner?.profileImageUrl} />
                {NFT.owner?.hasOwnProperty('displayName') && NFT?.owner?.displayName}
              </Text>
            </Box>
            <Box>x{NFTs[key].length}</Box>
          </Box>
        )
      })}
    </Box>
  );
}
