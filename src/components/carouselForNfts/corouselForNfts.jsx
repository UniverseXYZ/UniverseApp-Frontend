/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import './corouselForNfts.scss';
import './WinnerNFTs.scss';
import uuid from 'react-uuid';
import Slider from 'react-slick';
import WinnerNft from '../winnerNft/WinnerNft';

const CarouselForNfts = ({ winnersData }) => {
  function SampleArrow(props) {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style }} onClick={onClick} />;
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleArrow />,
    prevArrow: <SampleArrow />,
  };
  return (
    <div className="carousel img-div">
      <Slider {...settings}>
        {winnersData.map((winner) => (
          <div className="winner-block">
            <div className="title-winner">Winner #{winner.slot}</div>
            {winner.nftsData?.length ? (
              winner.nftsData?.map((nft) => <WinnerNft nft={nft} />)
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
