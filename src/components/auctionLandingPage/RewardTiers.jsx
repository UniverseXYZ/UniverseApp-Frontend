import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import uuid from 'react-uuid';
import PreviewNFTsPopup from '../popups/PreviewNFTsPopup';

const RewardTiers = ({ auction }) => (
  <div className="reward__tiers__section">
    <div className="bg" />
    <div className="reward__tiers__section__container">
      <h1 className="title">Reward tiers</h1>
      <p className="desc">
        Each tier has different rewards and winners, browse through the tiers and NFTs to find them.
      </p>

      <div className="tiers__section">
        {auction.rewardTiers.map((tier) => (
          <div className="tier__box" key={uuid()}>
            <div className="tier__nfts__container">
              <div className="tier__nfts">
                {tier.nfts.map(
                  (nft, index) =>
                    index < 3 && (
                      <div className="nft__image" key={nft.id}>
                        <img src={nft.image} alt={nft.name} />
                        {index === 2 && (
                          <span className="show__more">{`+${tier.nfts.length - 3} more`}</span>
                        )}
                      </div>
                    )
                )}
              </div>
            </div>
            <div className="tier__details">
              <div className="tier__title">
                <h2>
                  {tier.type === 'platinum'
                    ? 'Platinum tier'
                    : tier.type === 'gold'
                    ? 'Gold tier'
                    : 'Silver tier'}
                </h2>
                <span
                  style={{
                    backgroundColor:
                      tier.type === 'platinum'
                        ? '#80CCDF'
                        : tier.type === 'gold'
                        ? '#DDBC45'
                        : '#BCBCBC',
                  }}
                />
              </div>
              <div className="tier__info">
                <span>{`Bidders #${tier.bidders}`}</span>
                <span>{`${tier.nftsPerWinner} NFTs per winner`}</span>
                <span>{`Minimum bid: ${tier.minimumBid} ETH`}</span>
              </div>
              <div className="tier__description">{tier.description}</div>
              <div className="preview__nfts">
                <Popup
                  trigger={
                    <button type="button" className="light-button">
                      Preview NFTs
                    </button>
                  }
                >
                  {(close) => <PreviewNFTsPopup onClose={close} onTier={tier} />}
                </Popup>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

RewardTiers.propTypes = {
  auction: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default RewardTiers;
