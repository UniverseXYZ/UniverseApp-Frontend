import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import Popup from 'reactjs-popup';
import Skeleton from 'react-loading-skeleton';
import { Animated } from 'react-animated-css';
import videoIcon from '../../../../assets/images/video-icon.svg';
import NFTPopup from '../../../popups/NFTPopup';

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
            <div className="nft__box">
              <div className="nft__box__image">
                {nft.previewImage?.type === 'video/mp4' && (
                  <Popup
                    trigger={
                      <video
                        onMouseOver={(event) => event.target.play()}
                        onFocus={(event) => event.target.play()}
                        onMouseOut={(event) => event.target.pause()}
                        onBlur={(event) => event.target.pause()}
                      >
                        <source
                          src={nft.previewImage.url || URL.createObjectURL(nft.previewImage)}
                          type="video/mp4"
                        />
                        <track kind="captions" />
                        Your browser does not support the video tag.
                      </video>
                    }
                  >
                    {(close) => <NFTPopup onClose={close} onNFT={nft} />}
                  </Popup>
                )}
                {nft.previewImage.type !== 'audio/mpeg' &&
                  nft.previewImage.type !== 'video/mp4' && (
                    <Popup
                      trigger={
                        <img
                          className="preview-image"
                          src={nft.previewImage.url || URL.createObjectURL(nft.previewImage)}
                          alt={nft.name}
                        />
                      }
                    >
                      {(close) => <NFTPopup onClose={close} onNFT={nft} />}
                    </Popup>
                  )}
                {nft.previewImage.type === 'video/mp4' && (
                  <img className="video__icon" src={videoIcon} alt="Video Icon" />
                )}
              </div>
              <div className="nft__box__name">
                <h3>{nft.name}</h3>
                {nft.type === 'single' ? (
                  nft.generatedEditions.length > 1 ? (
                    <div className="collection__count">
                      {`x${nft.generatedEditions.length}`}
                      <div
                        className="generatedEditions"
                        style={{
                          gridTemplateColumns: `repeat(${Math.ceil(
                            nft.generatedEditions.length / 10
                          )}, auto)`,
                        }}
                      >
                        {nft.generatedEditions.map((edition) => (
                          <div key={edition}>{`#${edition}`}</div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="collection__count">{`#${nft.generatedEditions[0]}`}</p>
                  )
                ) : (
                  <></>
                )}
              </div>
              <div className="nft__box__footer">
                <div className="collection__details">
                  {nft.type === 'collection' && (
                    <>
                      {typeof nft.collectionAvatar === 'string' &&
                      nft.collectionAvatar.startsWith('#') ? (
                        <div
                          className="random__bg__color"
                          style={{ backgroundColor: nft.collectionAvatar }}
                        >
                          {nft.collectionName.charAt(0)}
                        </div>
                      ) : (
                        <img
                          src={
                            typeof nft.collectionAvatar === 'string'
                              ? nft.collectionAvatar
                              : URL.createObjectURL(nft.collectionAvatar)
                          }
                          alt={nft.collectionName}
                        />
                      )}
                      <span>{nft.collectionName}</span>
                    </>
                  )}
                </div>
                {nft.type === 'collection' ? (
                  nft.generatedEditions.length > 1 ? (
                    <div className="collection__count">
                      {`x${nft.generatedEditions.length}`}
                      <div
                        className="generatedEditions"
                        style={{
                          gridTemplateColumns: `repeat(${Math.ceil(
                            nft.generatedEditions.length / 10
                          )}, auto)`,
                        }}
                      >
                        {nft.generatedEditions.map((edition) => (
                          <div key={edition}>{`#${edition}`}</div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="collection__count">{`#${nft.generatedEditions[0]}`}</p>
                  )
                ) : (
                  <></>
                )}
              </div>
              {nft.generatedEditions.length > 1 && (
                <>
                  <div className="nft__box__highlight__one" />
                  <div className="nft__box__highlight__two" />
                </>
              )}
            </div>
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
