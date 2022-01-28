/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import './corouselForNfts.scss';
import './WinnerNFTs.scss';
import uuid from 'react-uuid';
import Slider from 'react-slick';
import WinnerNft from '../winnerNft/WinnerNft';

function SampleArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style }} onClick={onClick} />;
}
const settings = {
  infinite: false,
  accessibility: false,
  draggable: false,
  slidesToScroll: 1,
  slidesToShow: 1,
  nextArrow: <SampleArrow />,
  prevArrow: <SampleArrow />,
};

const MAX_VALUES_SHOWN = 10;
const MIN_VALUES_SHOWN = 1;

const CarouselForNfts = ({ winnersData, onRemoveEdition, selectedWinner }) => {
  const [winnerData, setWinnerData] = useState({});

  useEffect(() => {
    const winner = winnersData[selectedWinner];

    if (winner) {
      const result = winner.nftsData.reduce((res, curr) => {
        if (!res[curr.name])
          res[curr.name] = {
            tokenIds: [],
            url: curr.url,
            artworkType: curr.artworkType,
            count: 0,
          };

        res[curr.name].tokenIds.push(curr.tokenId);
        res[curr.name].count += 1;
        return res;
      }, {});

      setWinnerData(result);
    }
  }, [winnersData, selectedWinner]);

  const slidesToShow =
    Object.values(winnerData).length >= MAX_VALUES_SHOWN
      ? MAX_VALUES_SHOWN
      : Object.values(winnerData).length < MIN_VALUES_SHOWN
      ? MIN_VALUES_SHOWN
      : Object.values(winnerData).length;

  return (
    <Slider {...settings} slidesToShow={slidesToShow} className="carousel img-div">
      {Object.values(winnerData).length ? (
        Object.values(winnerData).map((nft) => (
          <WinnerNft key={uuid()} nft={nft} onRemoveEdition={onRemoveEdition} />
        ))
      ) : (
        <div className="placeholder-winners" key={uuid()} />
      )}
    </Slider>
  );
};

export default CarouselForNfts;
