import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

const SocketContext = createContext(null);

const SOCKET_OPTIONS = {
  transports: ['websocket', 'polling', 'flashsocket'],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
};

/**
 * All the auction events emitted from the BE socket, please use them as a static reference
 * For example subscribeTo({auctionId: 1, eventName: auctionEvents.STATUS, cb: () => {}})
 */
const AUCTION_EVENTS = {
  STATUS: 'status',
  CREATED: 'created',
  CANCELED: 'canceled',
  DEPOSITED_NFTS: 'depositedNfts',
  WITHDRAWN_NFTS: 'withdrawnNfts',
  BID_SUBMITTED: 'bidSubmitted',
  BID_WITHDRAWN: 'bidWithdrawn',
  BID_MATCHED: 'bidMatched',
  CLAIMED_NFT: 'claimedNft',
  WITHDRAWN_REVENUE: 'withdrawnRevenue',
  FINALISED: 'finalised',
  EXTENDED: 'extended',
  SLOT_CAPTURED: 'capturedSlot',
};

const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [auctionEvents, setAuctionEvents] = useState(AUCTION_EVENTS);

  /**
   * Initialises the socket instance
   */
  useEffect(() => {
    if (!socket) {
      const instance = io(`${process.env.REACT_APP_API_BASE_URL}/auctions-socket`, SOCKET_OPTIONS);
      setSocket(instance);
      console.info('Socket has been initialised !');
    }
  }, [socket]);

  /**
   * Subscribes to given Auction Id, and Event Name
   * How to use => subscribeTo({auctionId: 1, eventName: auctionEvents.STATUS, cb: () => {}})
   * @param {number} auctionId
   * @param {auctionEvents} eventName
   */
  // eslint-disable-next-line consistent-return
  const subscribeTo = ({ auctionId = null, eventName = '', cb }) => {
    if (!socket) {
      console.error('Socket has not been initialised !');
      return false;
    }

    if (!auctionId || !eventName) {
      console.error('Please provide all the required params for proper event subscribtion !');
      return false;
    }

    socket.on(`auction_${auctionId}_${eventName}`, (msg) => {
      console.info(`Event with name ${eventName} for Auction with id ${auctionId} received!`);
      return cb(null, msg);
    });

    console.info(`Subscribed for ${eventName} event for auction with id ${auctionId} `);
  };

  // Unsubscribe
  /**
   * Unsubscribes from given events to a given auction
   * If eventNames are omitted it will unsubscribe for all the events for the given auction
   * How to use => unsubscribeFrom({auctionId: 1, eventNames: [auctionEvents.STATUS, auctionEvents.CREATED]})
   * @param {number} auctionId
   * @param {auctionEvents[]} eventNames
   */
  // eslint-disable-next-line consistent-return
  const unsubscribeFrom = ({ auctionId = null, eventNames = [] }) => {
    if (!socket) {
      console.error('Socket has not been initialised !');
      return false;
    }

    if (!auctionId) {
      console.error('Please provide all the required params for proper event un-subscribtion !');
      return false;
    }

    const unsubsribeEvents = eventNames.length
      ? eventNames
      : Object.values(auctionEvents).map((eventName) => eventName);

    unsubsribeEvents.forEach((eventName) =>
      socket.removeAllListeners(`auction_${auctionId}_${eventName}`)
    );

    console.info(`UnSubscribed from Auction with id ${auctionId} :`);
    console.table(unsubsribeEvents);
  };

  return (
    <SocketContext.Provider
      value={{
        auctionEvents,
        subscribeTo,
        unsubscribeFrom,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

SocketContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

const useSocketContext = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error('useSocketContext was used outside of its Provider');
  }

  return context;
};

export { SocketContextProvider, useSocketContext };
