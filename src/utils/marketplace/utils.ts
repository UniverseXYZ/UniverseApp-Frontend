import { BigNumber, Contract } from 'ethers';
import { fetchRoyalties } from '../api/royaltyRegistry';

export interface IRoyalties {
  regitstyContract: Contract;
  collectionRoyaltiesPercent: BigNumber;
  nftRoyaltiesPercent: BigNumber;
}
export const getRoyaltiesFromRegistry = async (
  collectionAddress: string,
  tokenId: string,
  signer: any
): Promise<IRoyalties> => {
  const [regitstyContract, royalties] = await fetchRoyalties(collectionAddress, signer, tokenId);

  let nftRoyaltiesSum = BigNumber.from(0);
  let collRoyaltiesSum = BigNumber.from(0);

  if (royalties.length) {
    const nftRoyalties = royalties[0];
    if (nftRoyalties.length) {
      nftRoyaltiesSum = nftRoyalties.reduce(
        (acc: any, curr: any) => acc.add(curr[1]),
        BigNumber.from(0)
      );
      nftRoyaltiesSum = nftRoyaltiesSum.div(100);
    }

    const collectionRoyalties = royalties[1];
    if (collectionRoyalties.length) {
      collRoyaltiesSum = collectionRoyalties.reduce(
        (acc: any, curr: any) => acc.add(curr[1]),
        BigNumber.from(0)
      );
      collRoyaltiesSum.div(100);
    }
  }
  return {
    regitstyContract,
    collectionRoyaltiesPercent: collRoyaltiesSum,
    nftRoyaltiesPercent: nftRoyaltiesSum,
  };
};
