import React from 'react';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import auctionLengthIcon from '../../assets/images/auction-length.svg';
import biddingCurrencyIcon from '../../assets/images/bidding-currency.svg';
import placingBidsIcon from '../../assets/images/placing-bids.svg';
import multipleNFTsIcon from '../../assets/images/multiple-nfts.svg';

const UniverseAuctionDetails = () => {
    return (
        <div className='universe__auction__details__section'>
            <div className='universe__auction__details__section__container'>
                <AnimatedOnScroll animationIn='zoomIn'>
                    <h1 className='title'>Universe Auction Details</h1>
                    <p className='desc'>Here are some tips about the Universe</p>
                </AnimatedOnScroll>
                <div className='boxes'>
                    <AnimatedOnScroll animationIn='fadeInUp' animationInDelay={500}>
                        <div className='box'>
                            <div className='nowrap__mobile'>
                                <img src={auctionLengthIcon} alt='Auction Length' />
                                <h2 className='sub__title'>Auction Length</h2>
                            </div>
                            <p className='sub__desc'>This Auction will last 24 hours and will be extended 3 minutes after every bid with 3 minutes left on the auction. This gives everyone ample time to place a bid and have a fair chance at the auction.</p>
                        </div>
                    </AnimatedOnScroll>
                    <AnimatedOnScroll animationIn='fadeInUp' animationInDelay={1000}>
                        <div className='box'>
                            <div className='nowrap__mobile'>
                                <img src={biddingCurrencyIcon} alt='Bidding Currency' />
                                <h2 className='sub__title'>Bidding Currency</h2>
                            </div>
                            <p className='sub__desc'>We have allowed you to pay with almost any ERC-20 by the contract address. This means you will be able to Bid with any currency in your wallet which means no more wasting gas on failed swaps to get a bid placed in time.</p>
                        </div>
                    </AnimatedOnScroll>
                    <AnimatedOnScroll animationIn='fadeInUp' animationInDelay={1500}>
                        <div className='box'>
                            <div className='nowrap__mobile'>
                                <img src={placingBidsIcon} alt='Placing Bids' />
                                <h2 className='sub__title'>Placing Bids</h2>
                            </div>
                            <p className='sub__desc'>Placing a bid is easy and seamless. Just connect your wallet and and follow the on screen instructions to place a bid. You may have to place a few bids to win and this may require a multiple gas fees.</p>
                        </div>
                    </AnimatedOnScroll>
                    <AnimatedOnScroll animationIn='fadeInUp' animationInDelay={2000}>
                        <div className='box'>
                            <div className='nowrap__mobile'>
                                <img src={multipleNFTsIcon} alt='Multiple NFTs & Winners' />
                                <h2 className='sub__title'>Multiple NFTs & Winners</h2>
                            </div>
                            <p className='sub__desc'>This auction styler allows multiple winners to win multiple NFTs. Each Tier is strategically set up so that a specific slot has specific NFTs, usually the best tier will be slot 1 which has the best NFTs and lowest edition numbers.</p>
                        </div>
                    </AnimatedOnScroll>
                </div>
            </div>
        </div>
    )
}

export default UniverseAuctionDetails;