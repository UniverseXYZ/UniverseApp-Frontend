import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import BidOptions from '../utils/fixtures/BidOptions';
import { getFutureAuctions } from '../utils/api/auctions';
import { useAuthContext } from './AuthContext';

const AuctionContext = createContext(null);

const AuctionContextProvider = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  const [myAuctions, setMyAuctions] = useState([]);
  const [activeAuctions, setActiveAuctions] = useState([]);
  const [futureAuctions, setFutureAuctions] = useState([]);
  const [auction, setAuction] = useState({ rewardTiers: [] });
  const [selectedNftForScramble, setSelectedNftForScramble] = useState({});
  const [bidtype, setBidtype] = useState('eth');
  const [options, setOptions] = useState(BidOptions);
  const [sortName, setSortName] = useState('Sort by');
  const [editProfileButtonClick, setEditProfileButtonClick] = useState(false);
  const [selectedTokenIndex, setSelectedTokenIndex] = useState(0);
  const [auctionSetupState, setAuctionSetupState] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  useEffect(async () => {
    if (isAuthenticated) {
      const futureAuctionResponse = await getFutureAuctions();
      setMyAuctions(futureAuctionResponse?.auctions || []);
    } else {
      setMyAuctions([]);
    }
  }, [isAuthenticated]);

  return (
    <AuctionContext.Provider
      value={{
        myAuctions,
        setMyAuctions,
        activeAuctions,
        setActiveAuctions,
        futureAuctions,
        setFutureAuctions,
        auction,
        setAuction,
        selectedNftForScramble,
        setSelectedNftForScramble,
        bidtype,
        setBidtype,
        options,
        setOptions,
        sortName,
        setSortName,
        editProfileButtonClick,
        setEditProfileButtonClick,
        selectedTokenIndex,
        setSelectedTokenIndex,
        auctionSetupState,
        setAuctionSetupState,
        selectedTabIndex,
        setSelectedTabIndex,
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
};

AuctionContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

const useAuctionContext = () => {
  const context = useContext(AuctionContext);

  if (!context) {
    throw new Error('useAuctionContext was used outside of its Provider');
  }

  return context;
};

export { AuctionContextProvider, useAuctionContext };
