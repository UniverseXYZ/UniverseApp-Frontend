/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import audioIcon from '../../assets/images/marketplace/audio-icon.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import Select from '../availableNFTsEditionSelect';
import universeIcon from '../../assets/images/universe-img.svg';
import { getCollectionBackgroundColor } from '../../utils/helpers';

const NFTCard = React.memo(
  ({ data, onEditionClick, canSelect, winnersData, selectedWinner, auction, currentTierId }) => {
    const { nfts, collection, optimized_url: url, artworkType } = data;

    const selectOptions = nfts.rewardAndTokenIds.map(({ tokenId, id }) => ({
      value: `${tokenId}||${id}||${url}||${artworkType}||${nfts.name}||${collection.name}||${collection.address}||${collection.coverUrl}`,
      label: `#${tokenId}`,
    }));

    const selectedWinnerData = winnersData.find((info) => info.slot === selectedWinner);
    const selectedWinnerIds = selectedWinnerData && selectedWinnerData.nftIds;
    const otherWinners = winnersData.filter((info) => info.slot !== selectedWinner) || [];
    const otherWinnersIds = otherWinners.reduce((res, cur) => {
      res.push(...cur.nftIds);
      return res;
    }, []);

    // Mark the options as pre-selected or disabled
    const updatedOptionsForCurrentTier = selectOptions.map((info) => {
      const infoCopy = { ...info };
      const [edition, id, _url] = infoCopy.value.split('||');

      if (selectedWinnerIds && selectedWinnerIds.includes(parseInt(id, 10))) {
        infoCopy.isSelected = true;
      }

      // Disable
      if (otherWinnersIds && otherWinnersIds.includes(parseInt(id, 10))) {
        infoCopy.isDisabled = true;
        infoCopy.isSelected = false;
      }
      return infoCopy;
    });

    // Mark editions as used if they are being used in other tiers
    const otherRewardTiersUsedNFTsIds =
      auction.rewardTiers &&
      auction.rewardTiers
        .filter((t) => t.id !== currentTierId)
        .reduce((res, curr) => {
          const ids = [];

          // We are displaying auction currently being created
          if (curr.nftSlots && !curr.removed) {
            curr.nftSlots.forEach((slot) => ids.push(...slot.nftIds));
          }

          res.push(...ids);
          return res;
        }, []);

    const updateOptionsWithAllTiersData = updatedOptionsForCurrentTier.map((info) => {
      const infoCopy = { ...info };
      const [edition, id, _url] = infoCopy.value.split('||');

      // Disable if its used in other tiers but not in the same
      const isSelectedByCurrentWinner =
        selectedWinnerIds && selectedWinnerIds.includes(parseInt(id, 10));
      if (
        otherRewardTiersUsedNFTsIds &&
        otherRewardTiersUsedNFTsIds.includes(parseInt(id, 10)) &&
        !isSelectedByCurrentWinner
      ) {
        infoCopy.isDisabled = true;
        infoCopy.isSelected = false;
      }
      return infoCopy;
    });

    // Set select all option value
    const selectAllValues = updateOptionsWithAllTiersData.filter(
      (option) => !option.isDisabled && !option.isSelected
    );
    const deselectAllValues = updateOptionsWithAllTiersData.filter((option) => option.isSelected);
    const hasSelectedEditions = updatedOptionsForCurrentTier.find((item) => item.isSelected);

    updateOptionsWithAllTiersData.unshift({
      label: 'Select all',
      isSelected: !selectAllValues.length && hasSelectedEditions,
      isDisabled: !selectAllValues.length && !hasSelectedEditions,
      value: { selectValues: selectAllValues, deselectValues: deselectAllValues },
    });

    return (
      <div
        className={`nft--card nft__box ${canSelect ? 'can--select' : 'disabled'} ${
          hasSelectedEditions ? 'has-selected-editions' : ''
        }`}
      >
        <div className="nft--card--body" aria-hidden="true">
          <div aria-hidden="true">
            {nfts.artworkType !== 'audio/mpeg' && nfts.artworkType !== 'mp4' && (
              <img className="nft--image" src={nfts.optimized_url} alt={nfts.name} />
            )}
            {nfts.artworkType === 'mp4' && (
              <video
                onMouseOver={(event) => event.target.play()}
                onFocus={(event) => event.target.play()}
                onMouseOut={(event) => event.target.pause()}
                onBlur={(event) => event.target.pause()}
                muted
              >
                <source src={nfts.optimized_url} type="video/mp4" />
                <track kind="captions" />
                Your browser does not support the video tag.
              </video>
            )}
            {nfts.artworkType === 'audio/mpeg' && (
              <img className="nft--image" src={mp3Icon} alt={nfts.name} />
            )}
            {nfts.artworkType === 'audio/mpeg' && (
              <div className="video--icon">
                <img src={audioIcon} alt="Video Icon" />
              </div>
            )}
          </div>
        </div>
        <div className="nft--card--footer availability-cards">
          <div className="name--and--price">
            <h4>{nfts.name}</h4>
            <Select options={updateOptionsWithAllTiersData} onChange={onEditionClick} isMulti />
          </div>
          <div className="quantity--and--offer">
            <div className="collection__details">
              {collection && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
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
                  <span className="tooltiptext">{collection.name}</span>
                </div>
              )}
            </div>
            <div className="collection__count">{`x${nfts.rewardAndTokenIds.length}`}</div>
          </div>
        </div>
        {nfts.rewardAndTokenIds.length > 1 && (
          <>
            <div className="nft__box__highlight__one" />
            <div className="nft__box__highlight__two" />
          </>
        )}
        {/* {selectedNFTsIds && selectedNFTsIds.includes(nft.id) && (
        <div className="nft--selected">
          <img src={checkIcon} alt="img" />
        </div>
      )} */}
      </div>
    );
  }
);

NFTCard.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  winnersData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  auction: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onEditionClick: PropTypes.func.isRequired,
  canSelect: PropTypes.bool.isRequired,
  selectedWinner: PropTypes.number.isRequired,
  currentTierId: PropTypes.number.isRequired,
};

export default NFTCard;
