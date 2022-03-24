import { Contract } from 'ethers';
import Contracts from '../../contracts/contracts.json';

export const fetchRoyalties = async (collectionAddress, signer, tokenId = '0') => {
  const { contracts } = Contracts[process.env.REACT_APP_NETWORK_CHAIN_ID];
  const contract = new Contract(
    process.env.REACT_APP_ROYALTY_REGISTRY_CONTRACT,
    contracts.RoyaltyRegistry.abi,
    signer
  );
  let royalties = [];
  try {
    royalties = await contract.callStatic.getRoyalties(collectionAddress, tokenId);
  } catch (err) {
    console.error(err);
  }

  return [contract, royalties];
};

export const fetchDAOFee = async (signer) => {
  const { contracts } = Contracts[process.env.REACT_APP_NETWORK_CHAIN_ID];
  const contract = new Contract(
    process.env.REACT_APP_MARKETPLACE_CONTRACT,
    contracts.Marketplace.abi,
    signer
  );

  const daoFee = await contract.daoFee();

  return [contract, daoFee];
};
