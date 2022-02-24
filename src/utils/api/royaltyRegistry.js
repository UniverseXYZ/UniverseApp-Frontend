import { Contract } from 'ethers';
import Contracts from '../../contracts/contracts.json';

export const getCollectionRoyaltiesFromRegistry = async (
  collectionAddress,
  signer,
  tokenId = 0
) => {
  const { contracts } = Contracts[process.env.REACT_APP_NETWORK_CHAIN_ID];
  const contract = new Contract(
    process.env.REACT_APP_ROYALTY_REGISTRY_CONTRACT,
    contracts.RoyaltyRegistry.abi,
    signer
  );

  const royalties = await contract.callStatic.getRoyalties(collectionAddress, tokenId);

  return [contract, royalties];
};

export const getCollectionNftRoyaltiesFromRegistry = async (collectionAddress, tokenId, signer) => {
  const { contracts } = Contracts[process.env.REACT_APP_NETWORK_CHAIN_ID];
  const contract = new Contract(
    process.env.REACT_APP_ROYALTY_REGISTRY_CONTRACT,
    contracts.RoyaltyRegistry.abi,
    signer
  );

  const royalties = await contract.callStatic.getRoyalties(collectionAddress, tokenId);

  return [contract, royalties];
};
