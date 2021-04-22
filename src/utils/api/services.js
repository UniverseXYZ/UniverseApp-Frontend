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

export const mintSingleERC721 = async (universeERC721Contract, address, tokenURI) => {
  const mintTx = await universeERC721Contract.mint(address, tokenURI);
  const receipt = await mintTx.wait();
  for (const event of receipt.events) {
    if (event.event !== 'Transfer') {
      continue
    }
    return event.args.tokenId.toString();
  }
}

export const mintMultipleERC721 = async (universeERC721Contract, address, tokenURIs) => {
  const tokenIds = [];
  for (const tokenUri of tokenURIs) {
    const tokenId = await mintMultipleERC721(universeERC721Contract, address, tokenUri);
    tokenIds.push(tokenId);
  }
  return tokenIds;
}

export const fetchUserNfts = async (erc721Contract, ownerAddress) => {
  const nftBalance = await erc721Contract.balanceOf(ownerAddress);
  const userNftIds = [];
  for (let i = 0; i < parseInt(nftBalance.toNumber()); i++) {
    let tokenId = await erc721Contract.tokenOfOwnerByIndex(ownerAddress, i);
    userNftIds.push(parseInt(tokenId.toNumber()));
  }
  return userNftIds;
}