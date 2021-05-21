/* eslint-disable no-await-in-loop */
import { utils } from 'ethers';

const ETH_DEFAULT_ADDRESS = '0x0000000000000000000000000000000000000000';

export const placeETHBid = async (auctionFactoryContract, onAuctionId, yourBid) => {
  const bidTx = await auctionFactoryContract.ethBid(onAuctionId, {
    value: utils.parseEther(yourBid),
  });
  const result = await bidTx.wait();
  return result;
};

export const createAuction = async (
  auctionFactoryContract,
  startBlockNumber,
  endBlockNumber,
  resetTimer,
  numberOfSlots,
  supportWhiteList,
  assetAddress = ETH_DEFAULT_ADDRESS
) => {
  const createAuctionTx = await auctionFactoryContract(
    startBlockNumber,
    endBlockNumber,
    resetTimer,
    numberOfSlots,
    supportWhiteList,
    assetAddress
  );

  const result = await createAuctionTx.wait();

  return result;
};

// eslint-disable-next-line consistent-return
export const mintSingleERC721 = async (universeERC721Contract, address, tokenURI) => {
  const mintTx = await universeERC721Contract.mint(address, tokenURI);
  const receipt = await mintTx.wait();
  // eslint-disable-next-line no-restricted-syntax
  for (const event of receipt.events) {
    if (event.event !== 'Transfer') {
      // eslint-disable-next-line no-continue
      continue;
    }
    return event.args.tokenId.toString();
  }
};

export const mintMultipleERC721 = async (universeERC721Contract, address, tokenURIs) => {
  const tokenIds = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const tokenUri of tokenURIs) {
    const tokenId = await mintMultipleERC721(universeERC721Contract, address, tokenUri);
    tokenIds.push(tokenId);
  }
  return tokenIds;
};

// eslint-disable-next-line consistent-return
export const fetchUserNftIds = async (erc721Contract, ownerAddress) => {
  const nftBalance = await erc721Contract?.balanceOf(ownerAddress);
  const userNftIds = [];
  if (nftBalance) {
    // eslint-disable-next-line radix
    for (let i = 0; i < parseInt(nftBalance.toNumber()); i += 1) {
      const tokenId = await erc721Contract.tokenOfOwnerByIndex(ownerAddress, i);
      // eslint-disable-next-line radix
      userNftIds.push(parseInt(tokenId.toNumber()));
    }
    return userNftIds;
  }
};

export const getUserNftsMetadata = async (erc721Contract, ownerAddress) => {
  const nftIds = await fetchUserNftIds(erc721Contract, ownerAddress);
  // eslint-disable-next-line no-restricted-syntax
  for (const nftId of nftIds) {
    const tokenURI = await erc721Contract.tokenURI(nftId);
    const tokenMetadata = await fetch(tokenURI, {
      mode: 'no-cors',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const whitelistAddresses = async (auctionFactoryContract, addresses) => {
  const whitelistAddressesTx = await auctionFactoryContract.whitelistMultipleAddresses(addresses);
  const result = await whitelistAddressesTx.wait();
  return result;
};

export const setRoyaltyFeeMantissa = async (auctionFactoryContract, fee) => {
  const setRoyaltyFeeMantissaTx = await auctionFactoryContract.setRoyaltyFeeMantissa(
    utils.parseEther(fee)
  );
  const result = await setRoyaltyFeeMantissaTx.wait();
  return result;
};

export const withdrawETH = async (auctionFactoryContract, onAuctionId) => {
  const withdrawETHTx = await auctionFactoryContract.withdrawEthBid(onAuctionId);
  const result = await withdrawETHTx.wait();
  return result;
};

export const withdrawRoyalties = async (
  auctionFactoryContract,
  assetAddress = ETH_DEFAULT_ADDRESS,
  to
) => {
  const withdrawETHTx = await auctionFactoryContract.withdrawRoyalties(assetAddress, to);
  const result = await withdrawETHTx.wait();
  return result;
};

export const getAuction = async (auctionFactoryContract, auctionId) => {
  const result = await auctionFactoryContract.auctions(auctionId);
  return result;
};

export const getMinimumReservePriceForSlot = async (auctionFactoryContract, auctionId, slotIdx) => {
  const result = await auctionFactoryContract.getMinimumReservePriceForSlot(auctionId, slotIdx);
  return result;
};

export const isAddressWhitelisted = async (auctionFactoryContract, auctionId, address) => {
  const result = await auctionFactoryContract.isAddressWhitelisted(auctionId, address);
  return result;
};

export const getBidderBalance = async (auctionFactoryContract, auctionId, address) => {
  const result = await auctionFactoryContract.getBidderBalance(auctionId, address);
  return result;
};

export const getSlotWinner = async (auctionFactoryContract, auctionId, slotIdx) => {
  const result = await auctionFactoryContract.getSlotWinner(auctionId, slotIdx);
  return result;
};

export const getDepositedNftsInSlot = async (auctionFactoryContract, auctionId, slotIdx) => {
  const result = await auctionFactoryContract.getDepositedNftsInSlot(auctionId, slotIdx);
  return result;
};
