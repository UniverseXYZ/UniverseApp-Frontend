import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import Popup from 'reactjs-popup';
import Skeleton from 'react-loading-skeleton';
import { Animated } from 'react-animated-css';
import videoIcon from '../../../../assets/images/video-icon.svg';
import NFTPopup from '../../../popups/NFTPopup';
import NFTCard from '../../../nft/NFTCard';

const NFTsList = ({ data, perPage, offset }) => {
  const sliceData = data.slice(offset, offset + perPage);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Here need to get all nfts for artist
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="nfts__lists">
      {sliceData.map((nft) =>
        !loading ? (
          <Animated animationIn="fadeIn" key={uuid()}>
            <NFTCard nft={nft} key={nft.id} />
          </Animated>
        ) : (
          <div className="nft__box" key={uuid()}>
            <div className="nft__box__image">
              <Skeleton height={200} />
            </div>
            <div className="nft__box__name">
              <h3>
                <Skeleton height={20} width={100} />
              </h3>
            </div>
            <div className="nft__box__footer">
              <div className="collection__details">
                {nft.type === 'collection' && (
                  <>
                    <Skeleton circle width={20} height={20} />
                    <Skeleton width={100} />
                  </>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

NFTsList.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
  perPage: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
};

export default NFTsList;
