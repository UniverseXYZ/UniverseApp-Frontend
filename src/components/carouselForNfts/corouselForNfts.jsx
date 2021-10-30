/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import './corouselForNfts.scss';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import WinnerNFTs from '../winnerNFTs/WinnerNFTs';

const CarouselForNfts = ({ data, winnersData, winners }) => {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style }} onClick={onClick} />;
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style }} onClick={onClick} />;
  }
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <WinnerNFTs sliderSettings={settings} winners={winners} data={data} winnersData={winnersData} />
  );
};

CarouselForNfts.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  winnersData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  winners: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default CarouselForNfts;
