import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Animated } from "react-animated-css";
import PropTypes from 'prop-types';

const PastAuctionsList = ({data, perPage, offset}) => {
    const sliceData = data.slice(offset, offset + perPage);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Here need to get all past auctions for artist
        let timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [])

    return (
        <div className='active__auctions__list past'>
            {sliceData.map(auction => {
                return !loading ? (
                    <Animated animationIn="fadeInUp" key={auction.id}>
                        <div className='active__auction__item'>
                            <div className='title'>
                                <h1>{auction.title}</h1>
                                <div className='artist__details'>
                                    <img src={auction.artist.avatar} alt={auction.artist.name} />
                                    <span>by</span>
                                    <button>{auction.artist.name}</button>
                                </div>
                            </div>
                            <div className={`auction__img ${auction.image ? '' : 'show__avatar'}`}>
                                <img className='original' src={auction.image} alt={auction.title} />
                                <img className='artist__image' src={auction.artist.avatar} alt={auction.title} />
                            </div>
                            <div className='auction__details'>
                                <div>
                                    <div className='auction__details__box'>
                                        <p>Time Left:</p>
                                        <h3>{auction.timeLeft}</h3>
                                    </div>
                                    <div className='auction__details__box'>
                                            <p>Winners</p>
                                            <h3>{auction.winners}</h3>
                                    </div>
                                    <div className='auction__details__box'>
                                        <p>NFTs Per Winner:</p>
                                        <h3>{auction.nftsPerWinner}</h3>
                                    </div>
                                </div>
                                <div>
                                    <div className='auction__details__box'>
                                            <p>Highest Winning Bid:</p>
                                            <h3>{`${auction.highestWinningBid} ETH `}<span>{`~$${auction.highestWinningBid * 2031}`}</span></h3>
                                    </div>
                                    <div className='auction__details__box'>
                                        <p>Lowest Winning Bid:</p>
                                        <h3>{`${auction.lowestWinningBid} ETH `}<span>{`~$${auction.highestWinningBid * 2031}`}</span></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Animated>
                ) : (
                    <div className='active__auction__item' key={auction.id}>
                        <div className='title'>
                            <h1><Skeleton width={150} /></h1>
                            <div className='artist__details'>
                                <Skeleton circle={true} width={22} height={22} />
                                <Skeleton width={150} />
                            </div>
                        </div>
                        <div className='auction__img'>
                            <Skeleton height={200} width={200} />
                        </div>
                        <div className='auction__details'>
                            <div>
                                <div className='auction__details__box'>
                                    <h3><Skeleton /></h3>
                                </div>
                                <div className='auction__details__box'>
                                        <h3><Skeleton /></h3>
                                </div>
                                <div className='auction__details__box'>
                                    <h3><Skeleton /></h3>
                                </div>
                            </div>
                            <div>
                                <div className='auction__details__box'>
                                    <h3><Skeleton /></h3>
                                </div>
                                <div className='auction__details__box'>
                                    <h3><Skeleton /></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

PastAuctionsList.propTypes = {
    data: PropTypes.array,
    perPage: PropTypes.number,
    offset: PropTypes.number,
}

export default PastAuctionsList;