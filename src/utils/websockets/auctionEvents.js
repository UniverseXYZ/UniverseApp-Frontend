import io from 'socket.io-client';

let socket;
/* eslint-disable consistent-return */
export const initiateAuctionSocket = () => {
  socket = io(`${process.env.REACT_APP_WEB_SOCKET_URL}/auction`, {
    transports: ['websocket', 'polling', 'flashsocket'],
  });
  console.log(`Connecting to auctions socket...`);
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
