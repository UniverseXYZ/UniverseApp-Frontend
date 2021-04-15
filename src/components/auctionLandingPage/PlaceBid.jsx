import React from 'react'
import gradientArrow from '../../assets/images/gradient-arrow.svg';
import Popup from "reactjs-popup"
import PlaceBidPopup from '../popups/PlaceBidPopup';

const PlaceBid = ({auction, bidders, setBidders}) => {
    return (
        <div className='place__bid__section'>
            <div className='place__bid__section__container'>
                <div>
                    <h1 className='title'>Place a Bid</h1>
                    <p className='desc'>Bid to win 1 of {auction.totalNFTs} NFT bundles</p>
                </div>
                <div className='place__bid__btn'>
                    <Popup
                        trigger={
                            <button>
                                <span>Place a bid</span>
                                <img src={gradientArrow} alt='Arrow' />
                            </button>
                        }
                    >
                        {
                            (close) => (
                                <PlaceBidPopup
                                    onClose={close}
                                    onAuctionId={auction.id}
                                    onAuctionTitle={auction.title}
                                    onArtistName={auction.artist.name}
                                    onBidders={bidders}
                                    onSetBidders={setBidders}
                                />
                            )
                        }
                    </Popup>
                </div>
            </div>
        </div>
    )
}

export default PlaceBid;