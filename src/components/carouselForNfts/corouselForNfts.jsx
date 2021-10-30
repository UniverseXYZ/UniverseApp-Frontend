/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import './corouselForNfts.scss';
import './WinnerNFTs.scss';
import uuid from 'react-uuid';
import Slider from 'react-slick';
import Popup from 'reactjs-popup';
import WinnerNft from '../winnerNft/WinnerNft';
import EditionsRemovePopup from '../popups/EditionsRemovePopup.jsx';
import crossSmall from '../../assets/images/nft-cross.svg';

function SampleArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}
const settings = {
  dots: true,
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow: <SampleArrow />,
  prevArrow: <SampleArrow />,
};

const CarouselForNfts = ({ winnersData, onRemoveEdition }) => {
  const winnersDataClone = [...winnersData];

  for (let i = 0; i < winnersDataClone.length; i += 1) {
    const winner = winnersDataClone[i];
    const { nftsData } = winner;

    if (nftsData?.length) {
      // count nft editions
      const nftHashtable = nftsData
        .map((nft) => nft.name)
        .reduce((prev, cur) => {
          prev[cur] = (prev[cur] || 0) + 1;
          return prev;
        }, {});

      // mutate nft object
      const nftsDataUpdated = nftsData.map((nft) => {
        const editions = nftHashtable[nft.name];
        const nftClone = { ...nft, editions };
        return nftClone;
      });

      winner.nftsData = nftsDataUpdated;
    }
  }

  return (
    <div className="carousel img-div">
      <Slider {...settings}>
        {winnersDataClone.map((winner) => (
          <div className="winner-block">
            <div className="title-winner">Winner #{winner.slot}</div>
            {winner.nftsData?.length ? (
              winner.nftsData.map((nft) => (
                <WinnerNft nft={nft} editions={winner.editions} onRemoveEdition={onRemoveEdition} />
              ))
            ) : (
              <div className="placeholder-winners" key={uuid()} />
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default CarouselForNfts;
