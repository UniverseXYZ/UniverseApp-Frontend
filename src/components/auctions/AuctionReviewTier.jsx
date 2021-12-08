import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SelectComponent from '../stickyBarWinnerSelect';
import CarouselForNfts from '../carouselForNfts/corouselForNfts';
import videoIcon from '../../assets/images/video-icon.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';

const AuctionReviewTier = ({ tier, tierOptions, bidToken }) => {
  const allTierNFTs = tier.nftSlots.reduce((res, curr) => {
    const nfts = curr.nftsData;

    res.push(...nfts);
    return res;
  }, []);

  const [selectedWinner, setSelectedWinner] = useState(0);
  const reservePrices = () => {
    try {
      let max = 0;
      let min = 0;
      const sorted = [...tier.nftSlots].sort((a, b) => b.minimumBid - a.minimumBid);
      const noReservePrice = sorted.find((slot) => slot.minimumBid === 0);
      max = sorted[0].minimumBid;
      if (!noReservePrice) {
        min = sorted[sorted.length - 1].minimumBid;
      }

      if (max === min) {
        return max;
      }

      return `${max}-${min}`;
    } catch (err) {
      console.log(err);
    }
    return 0;
  };
  return (
    <div key={tier.id} className="view-tier">
      <div className="auction-header">
        <div className="img_head">
          <div className="img_head_title">
            <h3>{tier.name}</h3>
          </div>
          <div className="winners__edit__btn">
            <div className="winners">
              <div className="tier-winners">
                <h4>
                  Winners:&nbsp;<b>{tier.winners || tier.numberOfWinners}</b>
                </h4>
              </div>
              <div className="tier-minbid">
                <h4>
                  Total NFTs:&nbsp;
                  <b>{allTierNFTs.length}</b>
                </h4>
              </div>
              <div className="tier-perwinners">
                <h4>
                  Reserve price:&nbsp;
                  <b>
                    {reservePrices()} {bidToken}
                  </b>
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="select--winner--tablet">
          <SelectComponent
            options={tierOptions || [{ value: 0, label: 'Winner #1', nftsCount: 0 }]}
            onChange={(data) => setSelectedWinner(data.value)}
            selectedWinner={selectedWinner}
          />
        </div>
      </div>
      <div className="auctions-tier">
        <div className="auction-reward">
          <CarouselForNfts winnersData={tier.nftSlots} selectedWinner={selectedWinner} />
        </div>
      </div>
    </div>
  );
};
AuctionReviewTier.propTypes = {
  tier: PropTypes.oneOfType([PropTypes.object]).isRequired,
  tierOptions: PropTypes.oneOfType([PropTypes.object]).isRequired,
  bidToken: PropTypes.string.isRequired,
};
export default AuctionReviewTier;
