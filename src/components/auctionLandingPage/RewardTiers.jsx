import React from 'react';
import PropTypes from 'prop-types';
import { AnimatedOnScroll } from 'react-animated-css-onscroll'
import Popup from "reactjs-popup"
import PreviewNFTsPopup from '../popups/PreviewNFTsPopup'

const RewardTiers = ({ auction }) => {
    
    return (
        <div className='reward__tiers__section'>
            <div className='reward__tiers__section__container'>
                <h1 className='title'>Reward Tiers</h1>
                <p className='desc'>Each Tier has different rewards and different winners! Look through the Tiers and the NFTs for each.</p>

                <div className='tiers__section'>
                    {auction.rewardTiers.map(tier => {
                        return (
                            <AnimatedOnScroll animationIn='fadeIn' animationInDelay={500} key={tier.id}>
                                <div className='tier__box'>
                                    <div className='tier__nfts__container'>
                                        <div className='tier__nfts'>
                                            {tier.nfts.map((nft, index) => {
                                                return index < 3 && (
                                                    <div className='nft__image' key={nft.id}>
                                                        <img src={nft.image} alt={nft.name} />
                                                        {index === 2 && <span className='show__more'>{`+${tier.nfts.length-3} more`}</span>}
                                                    </div>)
                                            })}
                                        </div>
                                    </div>
                                    <div className='tier__details'>
                                        <div className='tier__title'>
                                            <h2>{tier.type === 'platinum' ? 'Platinum Tier' : tier.type === 'gold' ? 'Gold Tier' : 'Silver Tier'}</h2>
                                            <span style={{ backgroundColor: tier.type === 'platinum' ? '#80CCDF' : tier.type === 'gold' ? '#DDBC45' : '#BCBCBC' }}></span>
                                        </div>
                                        <div className='tier__info'>
                                            <span>{`Bidders #${tier.bidders}`}</span>
                                            <span>{`${tier.nftsPerWinner} NFTs per winner`}</span>
                                            <span>{`Minimum bid: ${tier.minimumBid} ETH`}</span>
                                        </div>
                                        <div className='tier__description'>{tier.description}</div>
                                        <div className='preview__nfts'>
                                            <Popup
                                                trigger={<button className='light-button'>Preview NFTs</button>}
                                            >
                                                {
                                                    (close) => (
                                                        <PreviewNFTsPopup onClose={close} onTier={tier} />
                                                    )
                                                }
                                            </Popup>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedOnScroll>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

RewardTiers.propTypes = {
    auction: PropTypes.object,
}

export default RewardTiers;