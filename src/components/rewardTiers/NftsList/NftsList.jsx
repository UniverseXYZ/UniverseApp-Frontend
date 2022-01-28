import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import './NftsList.scss';
import NftCard from './NftCard/NftCard';

const NftsList = ({ selectedWinner, onlyUniqueNFTs }) => {
  const winnerNftLength = Object.keys(onlyUniqueNFTs[selectedWinner]).length;
  const settingsNfts = {
    variableWidth: true,
    infinite: winnerNftLength > 5,
    slidesToShow: winnerNftLength < 6 ? winnerNftLength : 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 993,
        settings: {
          infinite: winnerNftLength > 3,
          slidesToShow: winnerNftLength < 4 ? winnerNftLength : 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          infinite: winnerNftLength > 2,
          slidesToShow: winnerNftLength < 3 ? winnerNftLength : 1,
        },
      },
      {
        breakpoint: 426,
        settings: {
          infinite: winnerNftLength > 1,
          slidesToShow: winnerNftLength < 2 ? winnerNftLength : 1,
        },
      },
    ],
  };

  return (
    <div className="rev-reward">
      <Slider {...settingsNfts}>
        {Object.keys(onlyUniqueNFTs[selectedWinner]).map((key) => {
          const {
            artworkType,
            url,
            count,
            nftName,
            collectioName,
            collectionAddress,
            collectionUrl,
            tokenIds,
          } = onlyUniqueNFTs[selectedWinner][key];
          const nftIsImage =
            artworkType === 'png' ||
            artworkType === 'jpg' ||
            artworkType === 'jpeg' ||
            artworkType === 'mpeg' ||
            artworkType === 'webp';

          let tokenIdString = '';
          const tokenIdsLength = tokenIds.length > 5 ? 4 : tokenIds.length - 1;
          for (let i = 0; i <= tokenIdsLength; i += 1) {
            tokenIdString += ` #${tokenIds[i]},`;
          }
          tokenIdString = tokenIdString.slice(0, tokenIdString.length - 1);
          if (tokenIds.length > 5) {
            tokenIdString += ' .....';
          }

          return (
            <NftCard
              artworkType={artworkType}
              url={url}
              count={count}
              nftName={nftName}
              collectioName={collectioName}
              collectionAddress={collectionAddress}
              collectionUrl={collectionUrl}
              tokenIdString={tokenIdString}
              nftIsImage={nftIsImage}
            />
          );
        })}
      </Slider>
    </div>
  );
};

NftsList.propTypes = {
  selectedWinner: PropTypes.number.isRequired,
  onlyUniqueNFTs: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default NftsList;
