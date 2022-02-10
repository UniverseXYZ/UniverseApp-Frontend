import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import uuid from 'react-uuid';
import './WinnersList.scss';
import PendingPrevArrow from '../../myNFTs/pendingDropdown/misc/PendingPrevArrow';
import PendingNextArrow from '../../myNFTs/pendingDropdown/misc/PendingNextArrow';
import WinnerCard from './WinnerCard';
import Input from '../../input/Input.jsx';
import ETHIcon from '../../../assets/images/bid_icon.svg';
import { ReactComponent as ErrorIcon } from '../../../assets/images/Vector.svg';
import { ReactComponent as WinnerIcon } from '../../../assets/images/winner-icon.svg';
import { useAuctionContext } from '../../../contexts/AuctionContext';
import { getBidTypeByValue } from '../../../utils/fixtures/BidOptions';

const MAX_WINNERS_SHOWN = 6;

const WinnersList = ({
  winnersData,
  setWinnersData,
  selectedWinner,
  setSelectedWinner,
  showReservePrice,
  compareSlotMinBidValueWithExistingTiers,
}) => {
  const { bidtype, options } = useAuctionContext();
  const [maxWinnersShown, setMaxWinnersShown] = useState(MAX_WINNERS_SHOWN);
  const [sliderSettings, setSliderSettings] = useState({
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  });

  const currencyImg = getBidTypeByValue(bidtype, options).img;

  const handleReservePriceChange = (value, idx) => {
    const winnersCopy = [...winnersData];
    const prevWinner = winnersCopy[idx - 1];

    const validComparedToPrevTiers = compareSlotMinBidValueWithExistingTiers(value);
    if (!validComparedToPrevTiers) return;

    if (prevWinner) {
      const validMinBid = prevWinner.minimumBid >= Number(value);
      if (!validMinBid) return;
    }

    winnersCopy[idx].minimumBid = value;
    setWinnersData(winnersCopy);
  };

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
      <>
        {winnersData.map((data, i) => {
          const winnerNumber = i + 1;
          return (
            <WinnerCard
              data={data}
              setWinnersData={setWinnersData}
              winnerNumber={winnerNumber}
              index={index}
              selectedWinner={selectedWinner}
              setSelectedWinner={setSelectedWinner}
              showReservePrice={showReservePrice}
              setReservedPrice={handleReservePriceChange}
              currencyImg={currencyImg}
            />
          );
        })}
      </>
    </div>
  );
};

WinnersList.propTypes = {
  winnersData: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setWinnersData: PropTypes.func.isRequired,
  selectedWinner: PropTypes.number.isRequired,
  setSelectedWinner: PropTypes.func.isRequired,
  showReservePrice: PropTypes.bool.isRequired,
  compareSlotMinBidValueWithExistingTiers: PropTypes.func.isRequired,
};

export default WinnersList;
