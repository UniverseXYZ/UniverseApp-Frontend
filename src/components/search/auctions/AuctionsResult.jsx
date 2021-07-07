import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AuctionsResult.scss';
import uuid from 'react-uuid';
import moment from 'moment';
import Button from '../../button/Button.jsx';

const AuctionsResult = ({ query, data }) => {
  const [showEndedAuctions, setShowEndedAuctions] = useState(false);

  return (
    <div className="auctions--search--result">
      <div className="show--ended--auctions">
        <p>Show Ended Auctions</p>
        <label className="switch">
          <input
            type="checkbox"
            value={showEndedAuctions}
            checked={showEndedAuctions}
            onChange={(e) => setShowEndedAuctions(e.target.checked)}
          />
          <span className="slider round" />
        </label>
      </div>
      {data
        .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
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
          const hours = startsIn ? startsIn.hours() : timeLeft ? timeLeft.hours() : endedOn.hours();
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
                <img src={auction.photo} alt={auction.title} />
                <div className="date">
                  <label>{startsIn ? 'Starts in' : timeLeft ? 'Time left' : 'Ended on'}</label>
                  <span>{`${Math.abs(days)}d ${Math.abs(hours)}h ${Math.abs(minutes)}m ${Math.abs(
                    seconds
                  )}s`}</span>
                </div>
              </div>
              <div className="auction--box--details">
                <div className="title">
                  <h2>{auction.title}</h2>
                  {timeLeft && <Button className="light-button">View Auction</Button>}
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
                    <label>NFTs Per Winner:</label>
                    <p>{auction.nftsPerWinner}</p>
                  </div>
                  {auction.highestWinningBid && (
                    <div>
                      <label>Highest Winning Bid:</label>
                      <p>
                        {`${auction.highestWinningBid} ETH`} <span>~$120,594</span>
                      </p>
                    </div>
                  )}
                  {auction.lowestWinningBid && (
                    <div>
                      <label>Lowest Winning Bid:</label>
                      <p>
                        {`${auction.lowestWinningBid} ETH`}
                        <span>~$41,594</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
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
