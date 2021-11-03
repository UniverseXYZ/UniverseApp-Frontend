import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './AuctionsResult.scss';
import uuid from 'react-uuid';
import { intervalToDuration } from 'date-fns';
import Button from '../../button/Button.jsx';
import Pagination from '../../pagination/Pagionation.jsx';
import ItemsPerPageDropdown from '../../pagination/ItemsPerPageDropdown.jsx';
import arrowDown from '../../../assets/images/browse-nft-arrow-down.svg';
import { isAfterNow, isBeforeNow } from '../../../utils/dates';

const AuctionsResult = ({ query, data }) => {
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(12);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDropdownIndex, setSelectedDropdownIndex] = useState(0);
  const ref = useRef(null);
  const dropdownItems = ['Active Auctions', 'Future Auctions', 'Past Auctions'];

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <div className="auctions--search--result">
      <div
        className={`dropdown ${showDropdown ? 'open' : ''}`}
        aria-hidden="true"
        onClick={() => setShowDropdown(!showDropdown)}
        ref={ref}
      >
        <span>{dropdownItems[selectedDropdownIndex]}</span>
        <img src={arrowDown} alt="Arrow down" className={showDropdown ? 'rotate' : ''} />
        {showDropdown ? (
          <div className="dropdown--items">
            {dropdownItems.map((item, index) => (
              <div
                className="dropdown--item"
                key={uuid()}
                aria-hidden="true"
                onClick={() => setSelectedDropdownIndex(index)}
              >
                {item}
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="auctions--search--result--grid">
        {data
          .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
          .filter((item) =>
            selectedDropdownIndex === 0
              ? isBeforeNow(item.startDate) && isAfterNow(item.endDate)
              : selectedDropdownIndex === 1
              ? isAfterNow(item.startDate)
              : isBeforeNow(item.endDate)
          )
          .slice(offset, offset + perPage)
          .map((auction) => {
            let startsIn = null;
            let timeLeft = null;
            let endedOn = null;
            if (isAfterNow(auction.startDate)) {
              startsIn = intervalToDuration({
                start: new Date(auction.startDate),
                end: new Date(),
              });
            }

            if (isBeforeNow(auction.startDate) && isAfterNow(auction.endDate)) {
              timeLeft = intervalToDuration({
                start: new Date(auction.startDate),
                end: new Date(),
              });
            }

            if (isBeforeNow(auction.endDate)) {
              endedOn = intervalToDuration({
                start: new Date(auction.endDate),
                end: new Date(),
              });
            }

            const days = startsIn
              ? parseInt(startsIn.days, 10)
              : timeLeft
              ? parseInt(timeLeft.days, 10)
              : parseInt(endedOn.days, 10);
            const hours = startsIn ? startsIn.hours : timeLeft ? timeLeft.hours : endedOn.hours;
            const minutes = startsIn
              ? startsIn.minutes
              : timeLeft
              ? timeLeft.minutes
              : endedOn.minutes;
            const seconds = startsIn
              ? startsIn.seconds
              : timeLeft
              ? timeLeft.seconds
              : endedOn.seconds;

            return (
              <div className="auction--box" key={uuid()}>
                <div
                  className={`auction--box--image ${
                    timeLeft ? 'timeLeft' : endedOn ? 'endedOn' : ''
                  }`}
                >
                  <img src={auction.photo} alt={auction.name} />
                  <div className="date">
                    <label>{startsIn ? 'Starts in' : timeLeft ? 'Time left' : 'Ended on'}</label>
                    <span>{`${Math.abs(days)}d ${Math.abs(hours)}h ${Math.abs(minutes)}m ${Math.abs(
                      seconds
                    )}s`}</span>
                  </div>
                </div>
                <div className="auction--box--details">
                  <div className="title">
                    <h2>{auction.name}</h2>
                  </div>
                  <div className="creator">
                    <img src={auction.creator.avatar} alt={auction.creator.name} />
                    <span>by</span>
                    <a>{auction.creator.name}</a>
                  </div>
                  <div className="statistics">
                    <div>
                      <label>Winners</label>
                      <p>{auction.winners}</p>
                    </div>
                    <div>
                      <label>Highest Winning Bid:</label>
                      <p>
                        {`${auction.highestWinningBid} ETH`} <span>~$120,594</span>
                      </p>
                    </div>
                    <div>
                      <label>NFTs Per Winner:</label>
                      <p>{auction.nftsPerWinner}</p>
                    </div>
                    <div>
                      <label>Lowest Winning Bid:</label>
                      <p>
                        {`${auction.lowestWinningBid} ETH`}
                        <span>~$41,594</span>
                      </p>
                    </div>
                  </div>
                  {timeLeft && (
                    <Button className="light-button w-100 view--auction--btn">View Auction</Button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
      {data.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())).length ? (
        <div className="pagination__container">
          <Pagination data={data} perPage={perPage} setOffset={setOffset} />
          <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

AuctionsResult.propTypes = {
  query: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.array]),
};

AuctionsResult.defaultProps = {
  query: '',
  data: [],
};

export default AuctionsResult;
