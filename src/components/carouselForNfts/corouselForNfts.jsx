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

const CarouselForNfts = ({ winnersData, onRemoveEdition, selectedWinner }) => {
  const [winnerData, setWinnerData] = useState({});

  const [maxValuesShown, setMaxValuesShown] = useState(10);
  const [minValuesShown, setMinValuesShown] = useState(2);
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
    Object.values(winnerData).length >= maxValuesShown
      ? maxValuesShown
      : Object.values(winnerData).length < minValuesShown
      ? minValuesShown
      : Object.values(winnerData).length;

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1230) {
        setMaxValuesShown(10);
      }
      if (window.innerWidth < 1230) {
        setMaxValuesShown(7);
      }
      if (window.innerWidth < 993) {
        setMaxValuesShown(5);
      }
      if (window.innerWidth < 576) {
        setMaxValuesShown(4);
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
