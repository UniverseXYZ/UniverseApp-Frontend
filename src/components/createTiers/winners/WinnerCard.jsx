import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import Input from '../../input/Input.jsx';
import ETHIcon from '../../../assets/images/bid_icon.svg';
import { ReactComponent as ErrorIcon } from '../../../assets/images/Vector.svg';
import { ReactComponent as WinnerIcon } from '../../../assets/images/winner-icon.svg';

const WinnerCard = ({
  winnersData,
  setWinnersData,
  selectedWinner,
  setSelectedWinner,
  showReservePrice,
}) => {
  const handleReservePriceChange = (value, idx) => {
    // TODO:: need to add validation logic for the reserve price
    const winnersCopy = [...winnersData];
    winnersCopy[idx].reservePrice = value ? Number(value) : '';
    setWinnersData(winnersCopy);
  };

  return (
    <>
      {winnersData.map((data, i) => {
        const winnerNumber = i + 1;
        return (
          <div
            className={`winner-box${selectedWinner === i ? ' selected' : ''}`}
            key={uuid()}
            onClick={() => setSelectedWinner(i)}
            aria-hidden
            style={{ width: 160 }}
          >
            <WinnerIcon className="winner--icon" />
            <p>{`Winner #${winnerNumber}`}</p>
            <span>{`${data.nftsData?.length} NFTs`}</span>
            {showReservePrice && (
              <div className="reserve--price">
                <label>Reserve price</label>
                <div className="reserve--price--field">
                  <img className="eth--icon" src={ETHIcon} alt="eth" />
                  <Input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={data.reservePrice}
                    onChange={(e) => handleReservePriceChange(e.target.value, i)}
                    disabled={selectedWinner !== i}
                    error={data.reservePriceError}
                    hoverBoxShadowGradient
                  />
                  {/* TODO:: need to add validation logic for the reserve price */}
                  {data.reservePriceError && (
                    <div className="reserve--price--error">
                      <ErrorIcon className="error--icon" />
                      <div className="tooltip">
                        The reserve price for this slot cannot be higher than for the slot above
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="box--shadow--effect--block" />
          </div>
        );
      })}
    </>
  );
};

WinnerCard.propTypes = {
  winnersData: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setWinnersData: PropTypes.func.isRequired,
  selectedWinner: PropTypes.number.isRequired,
  setSelectedWinner: PropTypes.func.isRequired,
  showReservePrice: PropTypes.bool.isRequired,
};

export default WinnerCard;
