import React from 'react'
import Button from '../../../../button/Button'

const ActiveAuctionsList = ({ data, perPage, offset }) => {
    const sliceData = data.slice(offset, offset + perPage);

    return (
        <div className='active__auctions__list'>
            {sliceData.map(auction => {
                return (
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
                )
            })}
        </div>
    )
}

export default ActiveAuctionsList;