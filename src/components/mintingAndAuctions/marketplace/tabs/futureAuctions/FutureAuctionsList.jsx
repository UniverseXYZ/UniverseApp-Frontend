import {useEffect, useState} from 'react';
import { useHistory } from 'react-router';
import {Animated} from "react-animated-css";
import Skeleton from 'react-loading-skeleton';

const FutureAuctionsList = ({ data, perPage, offset }) => {
    const sliceData = data.slice(offset, offset + perPage);
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Here need to get all future auctions
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
                            <div className='auction__img'>
                                <img src={auction.image} alt={auction.title} />
                            </div>
                            <div className='title'>
                                <h1>{auction.title}</h1>
                                <div className='artist__details'>
                                    <img src={auction.artist.avatar} alt={auction.artist.name} />
                                    <span>by</span>
                                    <button onClick={() => history.push(`/artist/${auction.artist.name.split(' ')[1]}`, {id: auction.artist.id})}>{auction.artist.name}</button>
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
                                <h3><Skeleton height={20} width={80} /></h3>
                            </div>
                            <div className='auction__details__box'>
                                    <h3><Skeleton height={20} width={80} /></h3>
                            </div>
                            <div className='auction__details__box'>
                                <h3><Skeleton height={20} width={80} /></h3>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default FutureAuctionsList;