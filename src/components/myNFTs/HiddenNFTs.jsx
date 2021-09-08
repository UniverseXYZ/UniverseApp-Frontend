import React, { useEffect, useContext } from 'react';
import AppContext from '../../ContextAPI';
import NFTCard from '../nft/NFTCard';

const HiddenNFTs = () => {
  const { myNFTs, setMyNFTsSelectedTabIndex } = useContext(AppContext);

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
