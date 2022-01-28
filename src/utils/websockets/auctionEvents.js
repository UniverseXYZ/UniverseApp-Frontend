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
  socket = io(`${process.env.REACT_APP_WEB_SOCKET_URL}/auction`, socketOptions);

  console.log(`Connecting to auctions socket...`);
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

export const removeAllListeners = (auctionId) => {
  console.log(`Removing all listeners for ${auctionId}`);

  socket.removeAllListeners(`auction_${auctionId}_status`);
  socket.removeAllListeners(`auction_${auctionId}_created`);
  socket.removeAllListeners(`auction_${auctionId}_canceled`);
  socket.removeAllListeners(`auction_${auctionId}_depositedNfts`);
  socket.removeAllListeners(`auction_${auctionId}_withdrawnNfts`);
  socket.removeAllListeners(`auction_${auctionId}_bidSubmitted`);
};
