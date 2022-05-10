import { Box, Center, HStack } from '@chakra-ui/react';
import React, { useState } from "react";
import { useMeasure } from "react-use";

import AudioNFTPreviewImage from "@assets/images/v2/audio-nft-preview.png";

import { Loading } from "@app/components";
import { INFT } from "@app/modules/nft/types";

import { NFTAssetBroken } from "../../../../pages/nft-page/components/nft-asset-broken";
import {
  NFTCardImageAsset,
  NFTCardVideoAsset,
  NFTCardAssetAudioLabel,
  NFTCardAssetVideoLabel,
} from './components';
import { useNFTAsset } from "./hooks";
import * as styles from "./NFTCardAsset.styles";

interface INFTCardAssetProps {
  NFT: INFT;
  renderAssetLabel?: ((NFT: INFT) => React.ReactNode) | null;
}

export const NFTCardAsset = (props: INFTCardAssetProps) => {
  const { NFT, renderAssetLabel } = props;

  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const [isHover, setIsHover] = useState(false);

  const { asset, preview } = useNFTAsset(NFT);

  const [state, setState] = useState<"loading" | "error" | "loaded">(
    asset.url ? "loading" : "error"
  );

  return (
    <Box ref={ref} pos={"relative"}>
      {state === "error" && (
        <Box {...styles.getBrokenAssetStyle(width)}>
          <NFTAssetBroken _before={{ borderRadius: "6px 6px 0 0" }} />
        </Box>
      )}
      {(state === "loading" || state === "loaded") && (
        <Box {...styles.getAssetStyle(width)}>
          {asset.type === "image" && (
            <NFTCardImageAsset
              assetUrl={asset.url}
              NFT={NFT}
              onLoadingComplete={() => setState("loaded")}
              onError={() => setState("error")}
            />
          )}

          {asset.type === "video" && (
            <NFTCardVideoAsset
              assetUrl={asset.url}
              preview={preview}
              NFT={NFT}
              isHover={isHover}
              onLoadingComplete={() => setState("loaded")}
              onError={() => setState("error")}
            />
          )}

          {asset.type === "audio" && (
            <NFTCardImageAsset
              assetUrl={AudioNFTPreviewImage}
              NFT={NFT}
              onLoadingComplete={() => setState("loaded")}
              onError={() => setState("error")}
            />
          )}
        </Box>
      )}

      {state === "loading" && (
        <Center boxSize={`${width}px`} pos={"absolute"} top={0} left={0}>
          <Loading />
        </Center>
      )}

      {renderAssetLabel === null
        ? null
        : renderAssetLabel
          ? renderAssetLabel(NFT)
          : (
            <HStack spacing={'4px'} {...styles.AssetTypeContainer}>
              {asset.type === 'video' && <NFTCardAssetVideoLabel />}
              {asset.type === 'audio' && <NFTCardAssetAudioLabel />}
            </HStack>
          )
      }
    </Box>
  );
};
