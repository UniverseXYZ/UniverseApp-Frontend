import { Box, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import React  from 'react';

import { INFT } from '../../types';
import { NFTItemAsset, NFTItemFooter, NFTItemRelation } from './components';
import { ItemWrapper } from '../../../../components';
import * as styles from './styles';
import { NFTRelationType } from '../../enums';

export interface INftItemProps {
  NFT: INFT;
  isSelected?: boolean;
  selectedLabel?: string;

  renderHeader?: ((NFT: INFT) => React.ReactNode) | null;
  renderAsset?: ((NFT: INFT) => React.ReactNode) | null;
  renderContent?: ((NFT: INFT) => React.ReactNode) | null;
  renderFooter?: ((NFT: INFT) => React.ReactNode) | null;

  // TODO: remove
  renderNFTAdditions?: React.ReactNode | null;

  onClick?: (e: React.MouseEvent<HTMLElement>, NFT: INFT) => void;
}

export const NftItem = (
  {
    NFT,
    isSelected,
    selectedLabel,

    renderHeader,
    renderAsset,
    renderContent,
    renderFooter,

    renderNFTAdditions,

    onClick,
  }: INftItemProps
) => {
  return (
    <ItemWrapper
      isBundle={NFT.numberOfEditions > 1}
      isSelected={isSelected}
      selectedLabel={selectedLabel}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        if (onClick) {
          e.preventDefault();
          onClick(e, NFT);
        }
      }}
    >
      <LinkBox>
        <LinkOverlay href={`/v2/nft/${NFT.collection?.address}/${NFT.tokenId}`} display={'contents'}>
          {renderHeader === null ? null :
            renderHeader ? renderHeader(NFT) : null}

          <Box {...styles.AssetContainerStyle} borderRadius={renderHeader ? '' : '12px 12px 0 0'}>
            {renderAsset === null ? null :
              renderAsset ? renderAsset(NFT) : (
                <NFTItemAsset NFT={NFT} />
              )
            }
          </Box>
          <Box {...styles.NFTContentStyle}>
            {renderContent === null ? null :
              renderContent ? renderContent(NFT) : (
                <>
                  <Text fontSize={'14px'} fontWeight={700} mb={'12px'}>{NFT.name}</Text>

                  <Box mb={'14px'}>
                    <Box>
                      <NFTItemRelation
                        type={NFTRelationType.CREATOR}
                        image={NFT.creator?.profileImageUrl ?? ''}
                        value={NFT.creator?.displayName ?? ''}
                        linkParam={NFT.creator?.universePageUrl ?? ''}
                      />
                      <NFTItemRelation
                        type={NFTRelationType.COLLECTION}
                        image={NFT.collection?.coverUrl ?? ''}
                        value={NFT.collection?.name ?? ''}
                        linkParam={NFT.collection?.address ?? ''}
                      />
                      <NFTItemRelation
                        type={NFTRelationType.OWNER}
                        image={NFT.owner?.profileImageUrl ?? ''}
                        value={NFT.owner?.displayName ?? ''}
                        linkParam={NFT.owner?.universePageUrl ?? ''}
                      />
                    </Box>
                  </Box>
                </>
              )
            }

            {renderFooter === null ? null :
              renderFooter ? renderFooter(NFT) : (
                <NFTItemFooter
                  NFT={NFT}
                  renderNFTAdditions={renderNFTAdditions}
                />
              )
            }
          </Box>
        </LinkOverlay>
      </LinkBox>
    </ItemWrapper>
  );
};
