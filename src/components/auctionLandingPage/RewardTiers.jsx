import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import videoIcon from '../../assets/images/video-icon.svg';
import PreviewNFTsPopup from '../popups/PreviewNFTsPopup.jsx';

const numberOfCards = 3;

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
            const filteredNfts = tier.nfts.filter(
              (value, index, nfts) =>
                index === nfts.findIndex((nft) => nft.editionUUID === value.editionUUID)
            );
            return (
              <div className="tier__box" key={tier.id}>
                <div className="tier__nfts__container">
                  <div className="tier__nfts">
                    {tier.imageUrl ? (
                      <div className="single__nft__image" key={`${tier.id}-tier-image`}>
                        <img
                          src={
                            typeof tier.imageUrl !== 'string'
                              ? URL.createObjectURL(tier.imageUrl)
                              : tier.imageUrl
                          }
                          alt={tier.name}
                        />
                      </div>
                    ) : (
                      filteredNfts.map((nft, index) => {
                        if (index < numberOfCards) {
                          const nftsAreMoreThanNumOfCards = filteredNfts.length > numberOfCards;
                          return (
                            <div key={`${nft.id}-nft-image`}>
                              <div className="nft__image">
                                {nft.artworkType === 'mp4' ? (
                                  <>
                                    <video
                                      aria-hidden
                                      className="preview-video"
                                      onMouseOver={(event) => event.target.play()}
                                      onFocus={(event) => event.target.play()}
                                      onMouseOut={(event) => event.target.pause()}
                                      onBlur={(event) => event.target.pause()}
                                    >
                                      <source src={nft.thumbnail_url} type="video/mp4" />
                                      <track kind="captions" />
                                      Your browser does not support the video tag.
                                    </video>
                                    <img className="video-icon" src={videoIcon} alt="Video Icon" />
                                  </>
                                ) : (
                                  <>
                                    <img src={nft.thumbnail_url} alt={nft.name} />
                                  </>
                                )}
                                {nftsAreMoreThanNumOfCards && index === 2 && (
                                  <span className="show__more">{`+${
                                    filteredNfts.length - numberOfCards
                                  } more`}</span>
                                )}
                              </div>
                              {nft?.numberOfEditions > 2 && (
                                <div className="tier-image-second" key={`${nft.id}-2`} />
                              )}
                              {nft?.numberOfEditions > 1 && (
                                <div className="tier-image-first" key={`${nft.id}-1`} />
                              )}
                            </div>
                          );
                        }
                        return '';
                      })
                    )}
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
                    <span>
                      {tier.slots.length > 0 ? (
                        <>
                          Reserve price:
                          {tier.slots[0].minimumBid > 0
                            ? ` ${tier.slots[tier.slots.length - 1].minimumBid} - ${
                                tier.slots[0].minimumBid
                              } ETH`
                            : ` ${tier.slots[0].minimumBid} ETH`}
                        </>
                      ) : (
                        `Reserve price: ${tier.slots[0].minimumBid}`
                      )}
                    </span>
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
