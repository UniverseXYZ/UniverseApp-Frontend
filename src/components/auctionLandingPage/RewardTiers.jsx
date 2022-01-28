import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import uuid from 'react-uuid';
import PreviewNFTsPopup from '../popups/PreviewNFTsPopup.jsx';

const RewardTiers = ({ auction }) => {
  let counter = 0;

  return (
    <div className="reward__tiers__section">
      <div className="bg" />
      <div className="reward__tiers__section__container">
        <h1 className="title">Reward tiers</h1>
        <p className="desc">
          Each tier has different rewards and winners, browse through the tiers and NFTs to find
          them.
        </p>

        <div className="tiers__section">
          {auction.rewardTiers?.map((tier) => {
            const startPlace = counter + 1;
            counter += tier.numberOfWinners;
            const endPlace = counter;
            return (
              <div className="tier__box" key={tier.id}>
                <div className="tier__nfts__container">
                  <div className="tier__nfts">
                    {tier.nfts.map((nft, index) => (
                      <div className="nft__image" key={nft.id}>
                        <img src={nft.thumbnail_url} alt={nft.name} />
                        {tier.nfts.length > 3 && (
                          <span className="show__more">{`+${tier.nfts.length - 3} more`}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="tier__details">
                  <div className="tier__title">
                    <h2>{tier.name}</h2>
                    <span
                      style={{
                        backgroundColor: tier.color,
                      }}
                    />
                  </div>
                  <div className="tier__info">
                    <span>
                      {startPlace === endPlace
                        ? `Bidder #${startPlace}`
                        : `Bidders #${startPlace}-${endPlace}`}
                    </span>
                    {tier.nftsPerWinner > 0 ? (
                      <span>{`${tier.nftsPerWinner} NFT${
                        tier.nftsPerWinner > 1 ? 's' : ''
                      } per winner`}</span>
                    ) : (
                      <span className="custom--nfts">Different NFTs per winner</span>
                    )}
                    {tier.minBidValue ? (
                      <span>{`Minimum bid: ${tier.minBidValue} ETH`}</span>
                    ) : (
                      <></>
                    )}
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
                      {(close) => (
                        <PreviewNFTsPopup
                          onClose={close}
                          tier={tier}
                          auction={auction}
                          startPlace={startPlace}
                          endPlace={endPlace}
                        />
                      )}
                    </Popup>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

RewardTiers.propTypes = {
  auction: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default RewardTiers;
