import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import './WinnersList.scss';
import WinnerBox from './WinnerBox/WinnerBox';

const WinnersList = ({
  selectedWinnerIndex,
  selectedWinners,
  tier,
  setSelectedWinners,
  currentSlide,
  setCurrentSlide,
}) => {
  const settings = {
    infinite: tier.winners > 7,
    slidesToShow: tier.winners < 8 ? tier.winners : 1,
    initialSlide: currentSlide,
    afterChange(current) {
      setCurrentSlide(current);
    },
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1225,
        settings: {
          infinite: tier.winners > 6,
          slidesToShow: tier.winners < 7 ? tier.winners : 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          infinite: tier.winners > 4,
          slidesToShow: tier.winners < 5 ? tier.winners : 1,
        },
      },
      {
        breakpoint: 680,
        settings: {
          infinite: tier.winners > 3,
          slidesToShow: tier.winners < 4 ? tier.winners : 1,
        },
      },
      {
        breakpoint: 497,
        settings: {
          infinite: tier.winners > 2,
          slidesToShow: tier.winners < 3 ? tier.winners : 1,
        },
      },
      {
        breakpoint: 367,
        settings: {
          infinite: tier.winners > 1,
          slidesToShow: tier.winners < 2 ? tier.winners : 1,
        },
      },
    ],
  };

  return (
    <div className="reward__winner__lists">
      <Slider {...settings}>
        {tier.nftSlots.map((data, index) => (
          <WinnerBox
            selectedWinnerIndex={selectedWinnerIndex}
            selectedWinners={selectedWinners}
            data={data}
            tierId={tier.id}
            index={index}
            setSelectedWinners={setSelectedWinners}
          />
        ))}
      </Slider>
    </div>
  );
};

WinnersList.propTypes = {
  selectedWinnerIndex: PropTypes.number.isRequired,
  selectedWinners: PropTypes.oneOfType([PropTypes.object]).isRequired,
  tier: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setSelectedWinners: PropTypes.func.isRequired,
  currentSlide: PropTypes.number.isRequired,
  setCurrentSlide: PropTypes.func.isRequired,
};

export default WinnersList;
