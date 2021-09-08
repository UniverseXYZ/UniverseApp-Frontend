import React, { useState, useRef, useEffect } from 'react';
import './MarketplaceTabComponent.scss';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import mp3Icon from '../../assets/images/mp3-icon.png';
import cover1 from '../../assets/images/collection_nft.svg';
import { PLACEHOLDER_MARKETPLACE_NFTS } from '../../utils/fixtures/BrowseNFTsDummyData';

const NFTs = ({ data }) => {
  const history = useHistory();
  return (
    <div className="marketplace--nft">
      {data.map((nft) => (
        // const nftData = PLACEHOLDER_MARKETPLACE_NFTS.find((item) => item.id === nft.id);
        <div className="marketplace--nft--box--cont">
          <div
            className="marketplace--nft--box"
            key={uuid()}
            aria-hidden="true"
            // onClick={() => history.push(`/marketplace/nft/${nft.id}`, { nft: nftData })}
          >
            <div className="image--box">
              {nft.type === 'video/mp4' && (
                <video
                  onMouseOver={(event) => event.target.play()}
                  onFocus={(event) => event.target.play()}
                  onMouseOut={(event) => event.target.pause()}
                  onBlur={(event) => event.target.pause()}
                >
                  <source src={nft.url} type="video/mp4" />
                  <track kind="captions" />
                  Your browser does not support the video tag.
                </video>
              )}
              {nft.type !== 'audio/mpeg' && nft.type !== 'video/mp4' && (
                <img className="nft--image" src={nft.url} alt={nft.name} />
              )}
              {nft.type === 'audio/mpeg' && (
                <img className="nft--image" src={mp3Icon} alt={nft.name} />
              )}
              <div className="info--box">
                <h1>Test</h1>
                <div>
                  <img src={cover1} alt="cover" />
                  <p>Zelad</p>
                </div>
              </div>
            </div>
            <div className="count">
              <h2>x1</h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

NFTs.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]),
};

NFTs.defaultProps = {
  data: [],
};

export default NFTs;
