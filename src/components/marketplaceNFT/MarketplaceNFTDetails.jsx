/* eslint-disable no-inner-declarations */
import React, { useState, useRef, useEffect } from 'react';
import '../marketplace/browseNFT/NFTsList.scss';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ReactReadMoreReadLess from 'react-read-more-read-less';
import Blockies from 'react-blockies';
import Properties from '../marketplaceTabComponents/Properties.jsx';
import Owners from '../marketplaceTabComponents/Owners.jsx';
import Bids from '../marketplaceTabComponents/Bids.jsx';
import TradingHistory from '../marketplaceTabComponents/TradingHistory.jsx';
import Offers from '../marketplaceTabComponents/Offers.jsx';
import NFTs from '../marketplaceTabComponents/NFTs.jsx';
import NFTCard from '../nft/NFTCard.jsx';
import universeIcon from '../../assets/images/universe-img.svg';
import checkIcon from '../../assets/images/check.svg';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import { useAuthContext } from '../../contexts/AuthContext';
import { getCollectionBackgroundColor } from '../../utils/helpers';
import SearchTokenIdField from '../input/SearchTokenIdField.jsx';
import LoadingImage from '../general/LoadingImage';
import InlineSVG from './InlineSVG';
import dots from '../../assets/images/3dots.svg';
import transferIcon from '../../assets/images/transfericon.svg';
import TransferNFTPopup from '../popups/transferNFT/TransferNFTPopup';

const MarketplaceNFTDetails = ({ data, onNFT }) => {
  const history = useHistory();
  const ref = useRef(null);
  const sharePopupRef = useRef(null);
  const reportPopupRef = useRef(null);

  const [selectedNFT, setSelectedNFT] = useState(onNFT.nft);
  const { moreFromCollection, collection, owner, creator, tokenIds } = onNFT;
  const tabs = selectedNFT?.properties ? ['Properties'] : [''];
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  const [showTransferNFTPopup, setShowTransferNFTPopup] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  useEffect(() => {
    if (onNFT.id !== selectedNFT.id) {
      setSelectedNFT(onNFT.nft);
    }
  }, [onNFT]);

  const generateImage = () => {
    if (selectedNFT.original_url) {
      if (selectedNFT.original_url.startsWith('ipfs://ipfs/')) {
        return selectedNFT.original_url.replace('ipfs://ipfs/', 'https://ipfs.io/ipfs/');
      }
      if (selectedNFT.original_url.startsWith('ipfs://')) {
        return selectedNFT.original_url.replace('ipfs://', 'https://ipfs.io/ipfs/');
      }
      return selectedNFT.original_url;
    }

    return selectedNFT.optimized_url || selectedNFT.thumbnail_url;
  };

  const showNftImage = () => {
    if (!selectedNFT.optimized_url.endsWith('.svg')) {
      return <LoadingImage showSpinner src={generateImage()} alt={selectedNFT.name} />;
    }

    return <InlineSVG svgUrl={selectedNFT.optimized_url || selectedNFT.thumbnail_url} />;
  };

  const getVideoUrl = () =>
    !selectedNFT.original_url
      ? selectedNFT.optimized_url
      : selectedNFT.original_url.startsWith('ipfs://ipfs/')
      ? selectedNFT.original_url.replace('ipfs://ipfs/', 'https://ipfs.io/ipfs/')
      : selectedNFT.original_url.startsWith('ipfs://')
      ? selectedNFT.original_url.replace('ipfs://', 'https://ipfs.io/ipfs')
      : selectedNFT.original_url;

  return (
    <>
      <div className="marketplace--nft--page">
        <div className="Marketplace--img">
          <div
            className={`image--wrapper ${selectedNFT.type === 'bundles' ? 'with--bundles' : ''}`}
            aria-hidden="true"
          >
            <>
              {!selectedNFT.artworkType.endsWith('mpeg') &&
                !selectedNFT.artworkType.endsWith('mp4') &&
                showNftImage()}

              {selectedNFT.artworkType && selectedNFT.artworkType.endsWith('mp4') && (
                <video muted playsInline autoPlay controls>
                  <source src={getVideoUrl()} type="video/mp4" />
                  <track kind="captions" />
                  Your browser does not support the video tag.
                </video>
              )}
            </>
          </div>
        </div>
        <div className="Marketplace--settings">
          <div className="Marketplace--name">
            <h1>{selectedNFT.name}</h1>
            {/* {selectedNFT.owner === address ? (
              <div className="nft--sorting">
                <div
                  className={`dropdown ${showDropdown ? 'open' : ''}`}
                  aria-hidden="true"
                  onClick={() => setShowDropdown(!showDropdown)}
                  ref={ref}
                >
                  <img src={dots} alt="dot" />
                  {showDropdown ? (
                    <div className="dropdown--items">
                      <div className="transfer--section">
                        <button type="button" onClick={() => setShowTransferNFTPopup(true)}>
                          <img src={transferIcon} alt="transfer" />
                          Transfer
                        </button>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  <Popup closeOnDocumentClick={false} open={showTransferNFTPopup}>
                    <TransferNFTPopup close={() => setShowTransferNFTPopup(false)} nft={onNFT} />
                  </Popup>
                </div>
              </div>
            ) : (
              <></>
            )} */}
          </div>
          <div className="Marketplace--number">
            <p>
              Edition&nbsp;
              {`${selectedNFT.tokenIds ? selectedNFT.tokenIds.length : 1}/${
                selectedNFT.numberOfEditions
                  ? selectedNFT.numberOfEditions
                  : selectedNFT.tokenIds
                  ? selectedNFT.tokenIds.length
                  : 1
              }`}
            </p>
            <div className="tokenIds-dropdown">
              <SearchTokenIdField searchValue={searchValue} setSearchValue={setSearchValue} />
              <ul className="tokenIds">
                {tokenIds.filter((tokenId) => tokenId.toString().includes(searchValue)).length ? (
                  <>
                    {tokenIds
                      .filter((tokenId) => tokenId.toString().includes(searchValue))
                      .map((tokenId) => (
                        <li
                          key={uuid()}
                          aria-hidden="true"
                          onClick={() => {
                            history.push(`/nft/${collection.address}/${tokenId}`);
                          }}
                        >
                          <span>{`#${tokenId}`}</span>
                          {tokenId === selectedNFT.tokenId ? (
                            <img src={checkIcon} alt="check" />
                          ) : (
                            <></>
                          )}
                        </li>
                      ))}
                  </>
                ) : (
                  <p>No results</p>
                )}
              </ul>
              <div className="inset--bottom--shadow" />
            </div>
          </div>
          <div className="Marketplace--collections">
            {!creator ? (
              <></>
            ) : creator &&
              (creator.avatar ||
                (creator.profileImageUrl && creator.profileImageUrl.length > 48)) ? (
              <div
                className="Marketplace--creators"
                onClick={() => history.push(`/${creator.universePageUrl}`)}
                aria-hidden
              >
                <img src={creator.profileImageUrl} alt="icon" />
                <div className="creator--name">
                  <p>Creator</p>
                  <h6>{creator.displayName}</h6>
                </div>
              </div>
            ) : (
              <div
                className="Marketplace--creators"
                onClick={() => history.push(`/${creator.address}`)}
                aria-hidden
              >
                <Blockies className="blockie--details" seed={creator.address} size={9} scale={4} />
                <div className="creator--name">
                  <p>Creator</p>
                  <h6
                    // TODO: Vik to fix this or someone else
                    style={{
                      maxWidth: '100px',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {creator.address}
                  </h6>
                  <span className="tooltiptext tooltiptext--left">{creator.address}</span>
                </div>
              </div>
            )}

            {collection && (
              <div
                className="Marketplace--creators"
                onClick={() => history.push(`/collection/${collection.address}`)}
                aria-hidden
              >
                {collection.address ===
                process.env.REACT_APP_UNIVERSE_ERC_721_ADDRESS.toLowerCase() ? (
                  <img src={universeIcon} alt={collection.name} />
                ) : !collection.coverUrl ? (
                  <div
                    className="random--bg--color"
                    style={{ backgroundColor: getCollectionBackgroundColor(collection) }}
                  >
                    {collection.name.charAt(0)}
                  </div>
                ) : (
                  <img src={collection.coverUrl} alt={collection.name} />
                )}
                <div className="creator--name">
                  <p>Collection</p>
                  <h6>{collection.name}</h6>
                  <span className="tooltiptext tooltiptext--center">{collection.name}</span>
                </div>
              </div>
            )}

            {!owner ? (
              <></>
            ) : owner.avatar || (owner.profileImageUrl && owner.profileImageUrl.length > 48) ? (
              <div
                className="Marketplace--creators"
                onClick={() => history.push(`/${owner.universePageUrl}`)}
                aria-hidden
              >
                <img src={owner.avatar || owner.profileImageUrl} alt="icon2" />
                <div className="creator--name">
                  <p>Owner</p>
                  <h6>{owner.displayName}</h6>
                </div>
              </div>
            ) : (
              <div
                className="Marketplace--creators"
                onClick={() => history.push(`/${owner.address}`)}
                aria-hidden
              >
                <Blockies className="blockie--details" seed={owner.address} size={9} scale={4} />
                <div className="creator--name">
                  <p>Owner</p>
                  <h6>{owner.address}</h6>
                  <span className="tooltiptext tooltiptext--right">{owner.address}</span>
                </div>
              </div>
            )}
          </div>

          <div className="Marketplace--text">
            <p>
              <ReactReadMoreReadLess
                charLimit={150}
                readMoreText="Read more"
                readLessText="Read less"
              >
                {selectedNFT.description || ''}
              </ReactReadMoreReadLess>
            </p>
          </div>
          <div className="tabs">
            <ul className="tab_items">
              {tabs.map((tab, index) => (
                <li
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className={selectedTabIndex === index ? 'active' : ''}
                  aria-hidden="true"
                  onClick={() => setSelectedTabIndex(index)}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </div>
          <div>
            {selectedNFT.type !== 'bundles' ? (
              <>
                {selectedTabIndex === 0 && selectedNFT.properties !== null && (
                  <Properties properties={selectedNFT.properties || []} />
                )}
                {selectedTabIndex === 1 && <Owners />}
                {selectedTabIndex === 2 && <Bids />}
                {selectedTabIndex === 3 && <Offers view={selectedNFT.view} />}
                {selectedTabIndex === 4 && <TradingHistory />}
              </>
            ) : (
              <>
                {selectedTabIndex === 0 && <NFTs data={selectedNFT.tokenIds} />}
                {selectedTabIndex === 1 && <Bids />}
                {selectedTabIndex === 2 && <Offers view={selectedNFT.view} />}
                {selectedTabIndex === 3 && <TradingHistory />}
              </>
            )}
          </div>
        </div>
      </div>
      {collection && moreFromCollection?.length ? (
        <div className="collection">
          <div className="collection--container">
            <div className="collection--title">
              <h1>More from this collection</h1>
            </div>
            <div className="nfts__lists">
              {moreFromCollection.map((nft) => (
                <NFTCard
                  key={nft.id}
                  nft={{
                    ...nft,
                    collection,
                  }}
                />
              ))}
            </div>
            <div className="view--button">
              <button
                type="button"
                className="light-button"
                onClick={() =>
                  history.push(`/collection/${collection.address}`, {
                    collection,
                    saved: false,
                  })
                }
              >
                View Collection
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

MarketplaceNFTDetails.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]),
  onNFT: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

MarketplaceNFTDetails.defaultProps = {
  data: [],
};
export default MarketplaceNFTDetails;
