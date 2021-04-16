import {useEffect, useState} from 'react'
import { useLocation } from 'react-router';
import Skeleton from 'react-loading-skeleton';
import {Animated} from "react-animated-css";

const FutureAuctionsList = ({ data, perPage, offset }) => {
    const location = useLocation();
    const artistFutureAuctions = data.filter(auction => auction.artist.id === location.state.id);
    const sliceData = artistFutureAuctions.slice(offset, offset + perPage);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Here need to get all future auctions for artist
        let timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [])

    return (
        <div className='future__auctions__list'>
            {sliceData.map(auction => {
                return !loading ? (
                    <Animated animationIn="fadeInUp" key={auction.id}>
                        <div className='future__auction__item'>
                            <div className={`auction__img ${auction.image ? '' : 'show__avatar'}`}>
                                <img className='original' src={auction.image} alt={auction.title} />
                                <img className='artist__image' src={auction.artist.avatar} alt={auction.title} />
                            </div>
                            <div className='title'>
                                <h1>{auction.title}</h1>
                                <div className='artist__details'>
                                    <img src={auction.artist.avatar} alt={auction.artist.name} />
                                    <span>by</span>
                                    <button>{auction.artist.name}</button>
                                </div>
                            </div>
                            <div className='auction__details'>
                                <div className='auction__details__box'>
                                    <p>Starts in:</p>
                                    <h3>{auction.startsIn}</h3>
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
                        </div>
                    </Animated>
                ) : (
                    <div className='future__auction__item' key={auction.id}>
                        <div className='auction__img'>
                            <Skeleton height={200} />
                        </div>
                        <div className='title'>
                            <h1><Skeleton width={150} /></h1>
                            <div className='artist__details'>
                                <Skeleton circle={true} width={22} height={22} />
                                <Skeleton width={150} />
                            </div>
                        </div>
                        <div className='auction__details'>
                            <div className='auction__details__box'>
                                <h3><Skeleton height={20} width={50} /></h3>
                            </div>
                            <div className='auction__details__box'>
                                    <h3><Skeleton height={20} width={50} /></h3>
                            </div>
                            <div className='auction__details__box'>
                                <h3><Skeleton height={20} width={50} /></h3>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default FutureAuctionsList;