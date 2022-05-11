import { INFT } from "@app/modules/nft/types";
import { useMemo } from "react";
import { getNFTPreviewImage } from "../helpers";

interface IUseAssetResult {
  asset: {
    url: string;
    type: "image" | "video" | "audio";
  };
  preview?: string;
}

export const useNFTAsset = (NFT: INFT) => {
  return useMemo<IUseAssetResult>(() => {
    const previewUrl = getNFTPreviewImage(NFT);

    let asset: IUseAssetResult["asset"];

    // CHECK IS VIDEO
    if (NFT?.videoUrl) {
      asset = {
        url: NFT.videoUrl,
        type: "video",
      };
    } else if ((NFT as any)?.audioUrl) {
      asset = {
        url: (NFT as any)?.audioUrl,
        type: "audio",
      };
    } else {
      asset = {
        url:
          [
            NFT?.gifUrl,
            NFT?.optimizedUrl,
            NFT?.originalUrl,
            NFT?.previewUrl,
            NFT?.thumbnailUrl,
          ].find((url) => !!url) ?? "",
        type: "image",
      };
    }

    return { asset, preview: previewUrl };
  }, [NFT]);
};
