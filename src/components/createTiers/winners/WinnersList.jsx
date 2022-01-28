import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import './WinnersList.scss';
import PendingPrevArrow from '../../myNFTs/pendingDropdown/misc/PendingPrevArrow';
import PendingNextArrow from '../../myNFTs/pendingDropdown/misc/PendingNextArrow';
import WinnerCard from './WinnerCard';

const MAX_WINNERS_SHOWN = 6;

const WinnersList = ({
  winnersData,
  setWinnersData,
  selectedWinner,
  setSelectedWinner,
  showReservePrice,
}) => {
  const [maxWinnersShown, setMaxWinnersShown] = useState(MAX_WINNERS_SHOWN);
  const [sliderSettings, setSliderSettings] = useState({
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  });

  useEffect(() => {
    if (winnersData.length > maxWinnersShown) {
      setSliderSettings({
        ...sliderSettings,
        infinite: true,
        nextArrow: <PendingNextArrow />,
        prevArrow: <PendingPrevArrow />,
      });
    } else {
      setSliderSettings({
        ...sliderSettings,
        infinite: false,
        nextArrow: null,
        prevArrow: null,
      });
    }
  }, [winnersData]);

  return (
    <div
      className={`winner__lists${
        winnersData.length > maxWinnersShown ? ' isSlider' : ' notSlider'
      }`}
    >
      {winnersData.length > maxWinnersShown ? (
        <Slider {...sliderSettings}>
          <WinnerCard
            winnersData={winnersData}
            setWinnersData={setWinnersData}
            selectedWinner={selectedWinner}
            setSelectedWinner={setSelectedWinner}
            showReservePrice={showReservePrice}
          />
        </Slider>
      ) : (
        <WinnerCard
          winnersData={winnersData}
          setWinnersData={setWinnersData}
          selectedWinner={selectedWinner}
          setSelectedWinner={setSelectedWinner}
          showReservePrice={showReservePrice}
        />
      )}
    </div>
  );
};

WinnersList.propTypes = {
  winnersData: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setWinnersData: PropTypes.func.isRequired,
  selectedWinner: PropTypes.number.isRequired,
  setSelectedWinner: PropTypes.func.isRequired,
  showReservePrice: PropTypes.bool.isRequired,
};

export default WinnersList;
