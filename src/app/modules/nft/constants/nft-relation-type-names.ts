import { NFTRelationType } from '../enums';

export const NFT_RELATION_TYPE_NAMES: Record<NFTRelationType, string> = {
  [NFTRelationType.CREATOR]: 'Creator',
  [NFTRelationType.COLLECTION]: 'Collection',
  [NFTRelationType.OWNER]: 'Owner',
}
