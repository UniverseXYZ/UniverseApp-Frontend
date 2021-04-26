import { utils } from 'ethers';

const ETH_DEFAULT_ADDRESS = '0x0000000000000000000000000000000000000000';

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

  return await createAuctionTx.wait();
};

export const mintSingleERC721 = async (universeERC721Contract, address, tokenURI) => {
  const mintTx = await universeERC721Contract.mint(address, tokenURI);
  const receipt = await mintTx.wait();
  for (const event of receipt.events) {
    if (event.event !== 'Transfer') {
      continue;
    }
    return event.args.tokenId.toString();
  }
};

export const mintMultipleERC721 = async (universeERC721Contract, address, tokenURIs) => {
  const tokenIds = [];
  for (const tokenUri of tokenURIs) {
    const tokenId = await mintMultipleERC721(universeERC721Contract, address, tokenUri);
    tokenIds.push(tokenId);
  }
  return tokenIds;
};

export const fetchUserNfts = async (erc721Contract, ownerAddress) => {
  const nftBalance = await erc721Contract.balanceOf(ownerAddress);
  const userNftIds = [];
  for (let i = 0; i < parseInt(nftBalance.toNumber()); i++) {
    let tokenId = await erc721Contract.tokenOfOwnerByIndex(ownerAddress, i);
    userNftIds.push(parseInt(tokenId.toNumber()));
  }
  return userNftIds;
};

export const whitelistAddresses = async (auctionFactoryContract, addresses) => {
  const whitelistAddressesTx = await auctionFactoryContract.whitelistMultipleAddresses(addresses);
  return await whitelistAddressesTx.wait();
};

export const setRoyaltyFeeMantissa = async (auctionFactoryContract, fee) => {
  const setRoyaltyFeeMantissaTx = await auctionFactoryContract.setRoyaltyFeeMantissa(utils.parseEther(fee));
  return await setRoyaltyFeeMantissaTx.wait();
};

export const withdrawETH = async (auctionFactoryContract, onAuctionId) => {
  const withdrawETHTx = await auctionFactoryContract.withdrawEthBid(onAuctionId);
  return await withdrawETHTx.wait();
};

export const withdrawRoyalties = async (auctionFactoryContract, assetAddress = ETH_DEFAULT_ADDRESS, to) => {
  const withdrawETHTx = await auctionFactoryContract.withdrawRoyalties(assetAddress, to);
  return await withdrawETHTx.wait();
};
