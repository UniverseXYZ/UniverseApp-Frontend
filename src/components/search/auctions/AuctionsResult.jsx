import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './AuctionsResult.scss';
import uuid from 'react-uuid';
import moment from 'moment';
import Button from '../../button/Button.jsx';
import Pagination from '../../pagination/Pagionation.jsx';
import ItemsPerPageDropdown from '../../pagination/ItemsPerPageDropdown.jsx';
import arrowDown from '../../../assets/images/browse-nft-arrow-down.svg';

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
              ? moment(item.startDate).isBefore(moment.now()) &&
                moment(item.endDate).isAfter(moment.now())
              : selectedDropdownIndex === 1
              ? moment(item.startDate).isAfter(moment.now())
              : !moment(item.endDate).isAfter(moment.now())
          )
          .slice(offset, offset + perPage)
          .map((auction) => {
            const startsIn = moment(auction.startDate).isAfter(moment.now())
              ? moment.duration(moment(auction.startDate).diff(moment.now()))
              : null;
            const timeLeft =
              moment(auction.startDate).isBefore(moment.now()) &&
              moment(auction.endDate).isAfter(moment.now())
                ? moment.duration(moment(auction.startDate).diff(moment.now()))
                : null;
            const endedOn = !moment(auction.endDate).isAfter(moment.now())
              ? moment.duration(moment(auction.endDate).diff(moment.now()))
              : null;
            const days = startsIn
              ? parseInt(startsIn.asDays(), 10)
              : timeLeft
              ? parseInt(timeLeft.asDays(), 10)
              : parseInt(endedOn.asDays(), 10);
            const hours = startsIn
              ? startsIn.hours()
              : timeLeft
              ? timeLeft.hours()
              : endedOn.hours();
            const minutes = startsIn
              ? startsIn.minutes()
              : timeLeft
              ? timeLeft.minutes()
              : endedOn.minutes();
            const seconds = startsIn
              ? startsIn.seconds()
              : timeLeft
              ? timeLeft.seconds()
              : endedOn.seconds();
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
