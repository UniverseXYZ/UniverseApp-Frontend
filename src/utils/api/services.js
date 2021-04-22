import { utils } from 'ethers';

export const placeETHBid = async (auctionFactoryContract, onAuctionId, yourBid) => {
  const bidTx = await auctionFactoryContract.ethBid(onAuctionId, { value: utils.parseEther(yourBid) });
  return await bidTx.wait();
};

export const createAuction = async (
  auctionFactoryContract,
  startBlockNumber,
  endBlockNumber,
  resetTimer,
  numberOfSlots,
  supportWhiteList,
  assetAddress = '0x0000000000000000000000000000000000000000'
) => {
  const createAuctionTx = await auctionFactoryContract(
    startBlockNumber,
    endBlockNumber,
    resetTimer,
    numberOfSlots,
    supportWhiteList,
    assetAddress
  );

  return await createAuctionTx.wait();
};
