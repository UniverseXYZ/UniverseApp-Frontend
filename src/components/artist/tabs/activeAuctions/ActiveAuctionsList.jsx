import { React, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import Skeleton from 'react-loading-skeleton';
import Button from '../../../button/Button.jsx';

const ActiveAuctionsList = ({ data, perPage, offset }) => {
  const sliceData = data.slice(offset, offset + perPage);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    // Here need to get all active auctions for artist
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="active__auctions__list">
      {sliceData.map((auction) =>
        !loading ? (
          <Animated animationIn="fadeIn" key={auction.id}>
            <div className="active__auction__item">
              <div className="title">
                <h1>{auction.title}</h1>
                <div className="artist__details">
                  <img src={URL.createObjectURL(auction.artist.avatar)} alt={auction.artist.name} />
                  <span>by</span>
                  <button type="button">{auction.artist.name}</button>
                </div>
              </div>
              <div className="view__auction">
                <Button
                  className="light-button"
                  onClick={() =>
                    history.push(`/${auction.artist.name.split(' ')[1]}/${auction.title}`, {
                      id: auction.id,
                    })
                  }
                >
                  View auction
                </Button>
              </div>
              <div className={`auction__img ${auction.image ? '' : 'show__avatar'}`}>
                <img className="original" src={auction.image} alt={auction.title} />
                <img className="artist__image" src={auction.artist.avatar} alt={auction.title} />
              </div>
              <div className="auction__details">
                <div>
                  <div className="auction__details__box">
                    <p>Time Left:</p>
                    <h3>{auction.timeLeft}</h3>
                  </div>
                  <div className="auction__details__box">
                    <p>Winners</p>
                    <h3>{auction.winners}</h3>
                  </div>
                  <div className="auction__details__box">
                    <p>NFTs Per Winner:</p>
                    <h3>{auction.nftsPerWinner}</h3>
                  </div>
                </div>
                <div>
                  <div className="auction__details__box">
                    <p>Highest Winning Bid:</p>
                    <h3>
                      {`${auction.highestWinningBid} ETH `}
                      <span>{`~$${auction.highestWinningBid * 2031}`}</span>
                    </h3>
                  </div>
                  <div className="auction__details__box">
                    <p>Lowest Winning Bid:</p>
                    <h3>
                      {`${auction.lowestWinningBid} ETH `}
                      <span>{`~$${auction.highestWinningBid * 2031}`}</span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </Animated>
        ) : (
          <div className="active__auction__item" key={auction.id}>
            <div className="title">
              <h1>
                <Skeleton width={150} />
              </h1>
              <div className="artist__details">
                <Skeleton circle width={22} height={22} />
                <Skeleton width={150} />
              </div>
            </div>
            <div className="auction__img">
              <Skeleton height={200} width={200} />
            </div>
            <div className="auction__details">
              <div>
                <div className="auction__details__box">
                  <h3>
                    <Skeleton />
                  </h3>
                </div>
                <div className="auction__details__box">
                  <h3>
                    <Skeleton />
                  </h3>
                </div>
                <div className="auction__details__box">
                  <h3>
                    <Skeleton />
                  </h3>
                </div>
              </div>
              <div>
                <div className="auction__details__box">
                  <h3>
                    <Skeleton />
                  </h3>
                </div>
                <div className="auction__details__box">
                  <h3>
                    <Skeleton />
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

ActiveAuctionsList.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
  perPage: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
};

export default ActiveAuctionsList;
