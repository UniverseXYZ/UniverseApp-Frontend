/**
 * Class responsible for Auction SC interactions
 */
export default class AuctionSDK {
  contract = null;

  constructor(contract) {
    this.contract = contract;
  }

  // TODO:: ADD JSdocs
  getAuctionSlotsInfo = async (auctionChainId = null) => {
    if (!this.contract) {
      console.error('AuctionSDK is not initialised !');
      return false;
    }

    if (!auctionChainId) {
      console.error('Please specify an auction onChain id !');
      return false;
    }

    try {
      const auction = await this.contract.auctions(auctionChainId);

      const auctionSlotsInfo = {};
      for (let i = 1; i <= auction.numberOfSlots; i += 1) {
        try {
          // eslint-disable-next-line no-await-in-loop
          const slotInfo = await this.contract.getSlotInfo(auctionChainId, i);
          auctionSlotsInfo[i] = slotInfo;
        } catch (e) {
          auctionSlotsInfo[i] = null;
        }
      }

      return auctionSlotsInfo;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  /**
   *
   * @param {Object} param
   * @param {int} param.auctionChainId
   * @param {int} param.slotIndex
   * @param {int} param.amount
   * @returns
   */
  handleClaimNfts = async ({ auctionChainId = null, slotIndex = null, amount = null }) => {
    if (!this.contract) {
      console.error('AuctionSDK is not initialised !');
      return false;
    }

    if (!auctionChainId || !slotIndex || !amount) {
      console.error('Please provide all the needed parameters !');
      return false;
    }

    try {
      const tx = await this.contract.claimERC721Rewards(auctionChainId, slotIndex, amount);
      return tx;
    } catch (err) {
      console.error(e);
      return false;
    }
  };
}
