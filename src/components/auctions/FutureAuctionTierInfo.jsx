import React from 'react';
import PropTypes from 'prop-types';
import videoIcon from '../../assets/images/video-icon.svg';

const FutureAuctionTierInfo = ({ tier }) => (
  <>
    <div className="tier" key={tier.id}>
      <div className="tier-header">
        <h3>{tier.name}</h3>
        <div className="tier-header-description">
          <p>
            NFTs per winner: <b>{tier.nftsPerWinner}</b>
          </p>
          <p>
            Winners: <b>{tier.numberOfWinners}</b>
          </p>
          <p>
            Total NFTs: <b>{tier.nfts.length}</b>
          </p>
        </div>
      </div>
      <div className="tier-body">
        {tier.nfts
          .filter(
            (value, index, nfts) =>
              index === nfts.findIndex((nft) => nft.editionUUID === value.editionUUID)
          )
          .map((nft) => {
            const imageUrl = nft.thumbnail_url ? nft.thumbnail_url : '';

            return (
              <div className="tier-image" key={nft.id}>
                {nft?.numberOfEditions > 2 && <div className="tier-image-second" />}
                {nft?.numberOfEditions > 1 && <div className="tier-image-first" />}
                <div className="tier-image-main">
                  <div className="amount-of-editions">
                    <p>{nft?.numberOfEditions}</p>
                  </div>
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
                      <img src={imageUrl} alt={nft.name} />
                    </>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  </>
);
FutureAuctionTierInfo.propTypes = {
  tier: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
export default FutureAuctionTierInfo;
