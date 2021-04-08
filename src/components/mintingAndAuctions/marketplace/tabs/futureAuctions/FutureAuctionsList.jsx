import React from 'react'

const FutureAuctionsList = ({ data, perPage, offset }) => {
    const sliceData = data.slice(offset, offset + perPage);

    return (
        <div className='future__auctions__list'>
            {sliceData.map(auction => {
                return (
                    <div className='future__auction__item' key={auction.id}>
                        <div className='auction__img'>
                            <img src={auction.image} alt={auction.title} />
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
                )
            })}
        </div>
    )
}

export default FutureAuctionsList;