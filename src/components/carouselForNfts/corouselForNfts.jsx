import React from 'react';
import './corouselForNfts.scss';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import Slider from 'react-slick';
import WinnerNFTs from '../winnerNFTs/WinnerNFTs';

const CarouselForNfts = ({ data, winnersData, winners }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="carousel img-div">
      <Slider {...settings}>
        <WinnerNFTs winners={winners} data={data} winnersData={winnersData} />
      </Slider>
      {Array(winners.length)
        .fill(0)
        .map((el, i) => (
          <div className="placeholder" key={uuid()} />
        ))}
    </div>
  );
};

CarouselForNfts.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  winnersData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  winners: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default CarouselForNfts;
