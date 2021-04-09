import {useEffect, useState} from 'react'
import { useLocation } from 'react-router';
import Button from '../../../button/Button';
import Skeleton from 'react-loading-skeleton';

const ActiveAuctionsList = ({ data }) => {
    const location = useLocation();
    const artistActiveAuctions = data.filter(auction => auction.artist.id === location.state.id);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Here need to get all active auctions for artist
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [])

    return (
        <div className='active__auctions__list'>
            {artistActiveAuctions.map(auction => {
                return !loading ? (
                    <div className='active__auction__item' key={auction.id}>
                        <div className='title'>
                            <h1>{auction.title}</h1>
                            <div className='artist__details'>
                                <img src={auction.artist.avatar} alt={auction.artist.name} />
                                <span>by</span>
                                <button>{auction.artist.name}</button>
                            </div>
                        </div>
                        <div className='view__auction'>
                            <Button className='light-button'>View Auction</Button>
                        </div>
                        <div className='auction__img'>
                            <img src={auction.image} alt={auction.title} />
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
                            <Skeleton height={200} />
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

export default ActiveAuctionsList;