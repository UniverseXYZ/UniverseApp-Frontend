import { gql } from '@apollo/client';

export const queryAuctions = gql`
  query Auctions {
    auctionEntities {
      id
      auctionId
      auctionOwner
      numberOfSlots
      startBlockNumber
      endBlockNumber
      resetTimer
      supportsWhitelist
      time
    }
  }
`;

export const queryAuctionsByOwner = (ownerAddress) => gql`
  query AuctionsByOwner { 
      auctionEntities(where: { auctionOwner: "${ownerAddress}" }) {
        id
        auctionId
        auctionOwner
        numberOfSlots
        startBlockNumber
        endBlockNumber
        resetTimer
        supportsWhitelist
        time
    }
  }
`;

export const queryAuctionDetails = (auctionId = 1) => gql`
    query AuctionDetails { 
        auctionEntities(where: { auctionId: "${auctionId}" }) {
            id
            auctionId
            auctionOwner
            numberOfSlots
            startBlockNumber
            endBlockNumber
            resetTimer
            supportsWhitelist
            time
  }
}
`;

export const queryUserBidsOnAuction = (auctionId, sender) => gql`
  query UserBids {
    logBidSubmittedEntities(
      where: { auctionId: "${auctionId}", sender: "${sender}" }
    ) {
      id
      sender
      auctionId
      currentBid
      totalBid
      time
    }
  }
`;
