import io from 'socket.io-client';

let socket;
/* eslint-disable consistent-return */
const socketOptions = {
  transports: ['websocket', 'polling', 'flashsocket'],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
};

export const initiateAuctionSocket = () => {
  socket = io(`${process.env.REACT_APP_API_BASE_URL}/auctions-socket`, socketOptions);
  socket.on('connect', () => {
    console.log('CONNECTED TO AUCTIONS WEB SOCKET');
  });
  socket.on('disconnect', () => {
    console.log('DISCONNECTED FROM AUCTIONS WEB SOCKET');
  });
};

export const disconnectAuctionSocket = () => {
  console.log('Disconnecting from auctions socket...');
  if (socket) socket.disconnect();
};

export const subscribeToStatusChange = (auctionId, cb) => {
  if (!socket) return true;
  socket.on(`auction_${auctionId}_status`, (msg) => {
    console.log('Auction status change event received!');
    return cb(null, msg);
  });
};

export const subscribeToOnChainCreation = (auctionId, cb) => {
  if (!socket) return true;
  socket.on(`auction_${auctionId}_created`, (msg) => {
    console.log('Auction on chain creation event received!');
    return cb(null, msg);
  });
};

export const subscribeToCancelation = (auctionId, cb) => {
  if (!socket) return true;
  socket.on(`auction_${auctionId}_canceled`, (msg) => {
    console.log('Auction cancelation event received!');
    return cb(null, msg);
  });
};

export const subscribeToDepositNfts = (auctionId, cb) => {
  if (!socket) return true;
  socket.on(`auction_${auctionId}_depositedNfts`, (msg) => {
    console.log('Auction deposit nfts event received!');
    return cb(null, msg);
  });
};

export const subscribeToWithdrawNfts = (auctionId, cb) => {
  if (!socket) return true;
  socket.on(`auction_${auctionId}_withdrawnNfts`, (msg) => {
    console.log('Auction withdraw nfts event received!');
    return cb(null, msg);
  });
};

export const subscribeToBidSubmitted = (auctionId, cb) => {
  if (!socket) return true;
  socket.on(`auction_${auctionId}_bidSubmitted`, (msg) => {
    console.log('Auction bid submitted event received!');
    return cb(null, msg);
  });
};

export const subscribeToBidWithdrawn = (auctionId, cb) => {
  if (!socket) return true;
  socket.on(`auction_${auctionId}_bidWithdrawn`, (msg) => {
    console.log('Auction bid withdrawn event received!');
    return cb(null, msg);
  });
  console.log('Subscribed for _bidWithdrawn event !');
};

export const subscribeToRevenueWithdraw = (auctionId, cb) => {
  if (!socket) return true;
  socket.on(`auction_${auctionId}_withdrawnRevenue`, (msg) => {
    console.log('Auction revenue withdraw event received!');
    return cb(null, msg);
  });
};

export const subscribeToSlotCaptured = (auctionId, cb) => {
  if (!socket) return true;
  socket.on(`auction_${auctionId}_capturedSlot`, (msg) => {
    console.log('Auction capture slot event received!');
    return cb(null, msg);
  });
};

export const subscribeToBidWithdraw = (auctionId, cb) => {
  if (!socket) return true;
  socket.on(`auction_${auctionId}_bidWithdrawn`, (msg) => {
    console.log('Auction bid withdraw event received!');
    return cb(null, msg);
  });
};

export const subscribeToBidMatched = (auctionId, cb) => {
  if (!socket) return true;
  socket.on(`auction_${auctionId}_bidMatched`, (msg) => {
    console.log('Auction bid matched event received!');
    return cb(null, msg);
  });
};

export const subscribeToAuctionExtended = (auctionId, cb) => {
  if (!socket) return true;
  socket.on(`auction_${auctionId}_extended`, (msg) => {
    console.log('Auction revenue withdraw event received!');
    return cb(null, msg);
  });
};

export const subscribeToERC721Claimed = (auctionId, cb) => {
  if (!socket) return true;
  socket.on(`auction_${auctionId}_ERC721Claimed`, (msg) => {
    console.log('Auction ERC721 claimed event received!');
    return cb(null, msg);
  });
};

export const subscribeToAuctionWithdrawnRevenue = (auctionId, cb) => {
  if (!socket) return true;
  socket.on(`auction_${auctionId}_withdrawnRevenue`, (msg) => {
    console.log('Auction Withdrawn Revenue event received!');
    return cb(null, msg);
  });
};

export const removeAllListeners = (auctionId) => {
  if (!socket) return true;
  console.log(`Removing all listeners for ${auctionId}`);

  socket.removeAllListeners(`auction_${auctionId}_status`);
  socket.removeAllListeners(`auction_${auctionId}_created`);
  socket.removeAllListeners(`auction_${auctionId}_canceled`);
  socket.removeAllListeners(`auction_${auctionId}_depositedNfts`);
  socket.removeAllListeners(`auction_${auctionId}_withdrawnNfts`);
  socket.removeAllListeners(`auction_${auctionId}_bidSubmitted`);
  socket.removeAllListeners(`auction_${auctionId}_bidWithdrawn`);
  socket.removeAllListeners(`auction_${auctionId}_ERC721Claimed`);
  socket.removeAllListeners(`auction_${auctionId}_withdrawnRevenue`);
};
