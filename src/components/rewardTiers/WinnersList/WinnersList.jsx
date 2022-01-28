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
    infinite: tier.numberOfWinners > 7,
    slidesToShow: tier.numberOfWinners < 8 ? tier.numberOfWinners : 1,
    initialSlide: currentSlide,
    afterChange: (current) => setCurrentSlide(current),
    variableWidth: true,
    speed: 500,
    useTransform: true,
    cssEase: 'cubic-bezier(0.770, 0.000, 0.175, 1.000)',
    responsive: [
      {
        breakpoint: 1225,
        settings: {
          infinite: tier.numberOfWinners > 6,
          slidesToShow: tier.numberOfWinners < 7 ? tier.numberOfWinners : 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          infinite: tier.numberOfWinners > 4,
          slidesToShow: tier.numberOfWinners < 5 ? tier.numberOfWinners : 1,
        },
      },
      {
        breakpoint: 680,
        settings: {
          infinite: tier.numberOfWinners > 3,
          slidesToShow: tier.numberOfWinners < 4 ? tier.numberOfWinners : 1,
        },
      },
      {
        breakpoint: 497,
        settings: {
          infinite: tier.numberOfWinners > 2,
          slidesToShow: tier.numberOfWinners < 3 ? tier.numberOfWinners : 1,
        },
      },
      {
        breakpoint: 367,
        settings: {
          infinite: tier.numberOfWinners > 1,
          slidesToShow: tier.numberOfWinners < 2 ? tier.numberOfWinners : 1,
        },
      },
    ],
  };

  return (
    <div className="reward__winner__lists">
      <Slider {...settings}>
        {tier.nftSlots.map((data, index) => {
          const activeClass = selectedWinnerIndex === index;
          const winnerNumber = data.slot + 1;
          const nftsCount = data.nftsData?.length;
          return (
            <WinnerBox
              activeClass={activeClass}
              selectedWinners={selectedWinners}
              winnerNumber={winnerNumber}
              tierId={tier.id}
              nftsCount={nftsCount}
              index={index}
              setSelectedWinners={setSelectedWinners}
            />
          );
        })}
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
