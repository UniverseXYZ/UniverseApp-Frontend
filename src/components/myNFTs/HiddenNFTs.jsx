import React, { useEffect, useState, useContext, useRef } from 'react';
import Popup from 'reactjs-popup';
import NFTPopup from '../popups/NFTPopup';
import AppContext from '../../ContextAPI';
import unhideNFTIcon from '../../assets/images/unhide-nft.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import videoIcon from '../../assets/images/video-icon.svg';
import NFTCard from '../nft/NFTCard';

const HiddenNFTs = () => {
  const { myNFTs, setMyNFTs, setMyNFTsSelectedTabIndex } = useContext(AppContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownID, setDropdownID] = useState(0);
  const ref = useRef(null);

  const unhideNFT = (id) => {
    setMyNFTs(myNFTs.map((item) => (item.id === id ? { ...item, hidden: false } : item)));
  };

  const handleClickOutside = (event) => {
    if (!event.target.classList.contains('three__dots')) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  useEffect(() => {
    if (!myNFTs.filter((nft) => nft.hidden).length) {
      setMyNFTsSelectedTabIndex(0);
    }
  }, [myNFTs]);

  return (
    <div className="tab__wallet">
      <div className="nfts__lists">
        {myNFTs
          .filter((nft) => nft.hidden)
          .map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))}
      </div>
    </div>
  );
};

export default HiddenNFTs;
