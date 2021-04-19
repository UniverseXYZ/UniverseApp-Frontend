import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import sizeUpIcon from '../../assets/images/size-up.svg';
import sizeDownIcon from '../../assets/images/size-down.svg';
import closeIcon from '../../assets/images/close-menu.svg';
import arrowIcon from '../../assets/images/arrow.svg';

const PreviewNFTsPopup = ({ onClose, onTier }) => {
    const [selectedNFTIndex, setSelectedNFTIndex] = useState(0);
    const [fullScreen, setFullScreen] = useState(false);

    const handleArrowClick = (direction) => {
        if (direction === 'right') {
            if (selectedNFTIndex + 1 < onTier.nfts.length) {
                setSelectedNFTIndex(selectedNFTIndex + 1);
            } else {
                setSelectedNFTIndex(0);
            }
        } else {
            if (selectedNFTIndex > 0) {
                setSelectedNFTIndex(selectedNFTIndex - 1);
            } else {
                setSelectedNFTIndex(onTier.nfts.length-1);
            }
        }
    }

    useEffect(() => {
        document.body.classList.add('no__scroll');

        return () => document.body.classList.remove('no__scroll');
    }, [])
    
    return (
        <div className={`preview__nfts__popup ${fullScreen ? 'fullscreen' : ''}`}>
            <div className='slider'>
                {fullScreen ? 
                    <img className='full__screen' src={sizeDownIcon} alt='Exit Full Screen' onClick={() => setFullScreen(false)} /> :
                    <img className='full__screen' src={sizeUpIcon} alt='Show Full Screen' onClick={() => setFullScreen(true)} />
                }
                <img className='close' src={closeIcon} alt='Close' onClick={onClose} />
                
                <div className='slider__left__arrow' onClick={() => handleArrowClick('left')}>
                    <img src={arrowIcon} alt='Slide left' />
                </div>
                <div className='slider__right__arrow' onClick={() => handleArrowClick('right')}>
                    <img src={arrowIcon} alt='Slide right' />
                </div>

                <div className='show__selected__nft__image'>
                    <Animated animationIn='zoomIn' key={onTier.nfts[selectedNFTIndex].id} style={{ height: '100%' }}>
                        <img src={onTier.nfts[selectedNFTIndex].image} />
                    </Animated>
                </div>
            </div>
            <div className='details'>
                <div className='tier__details'>
                    <div className='tier__title'>
                        <span style={{ backgroundColor: onTier.type === 'platinum' ? '#80CCDF' : onTier.type === 'gold' ? '#DDBC45' : '#BCBCBC' }}></span>
                        <h2>{onTier.type === 'platinum' ? 'Platinum Tier' : onTier.type === 'gold' ? 'Gold Tier' : 'Silver Tier'}</h2>
                    </div>
                    <div className='tier__info'>
                        <span>{`Bidders #${onTier.bidders}`}</span>
                        <span>{`${onTier.nftsPerWinner} NFTs per winner`}</span>
                        <span>{`Minimum bid: ${onTier.minimumBid} ETH`}</span>
                    </div>
                    <div className='tier__nfts'>
                        {onTier.nfts.map((nft, index) => {
                            return (
                                <div className={`nft__image ${selectedNFTIndex === index ? 'selected' : ''}`} key={nft.id} onClick={() => setSelectedNFTIndex(index)}>
                                    <img src={nft.image} alt={nft.name} />
                                </div>)
                        })}
                    </div>
                </div>
                <div className='nft__details'>
                    <h2 className='nft__title'>{onTier.nfts[selectedNFTIndex].title}</h2>
                    <div className='nft__released'>
                        <div className='item'>
                            <label>Released</label>
                            <p>{onTier.nfts[selectedNFTIndex].releasedDate}</p>
                        </div>
                        <div className='item'>
                            <label>Collection</label>
                            <p>
                                <img src={onTier.nfts[selectedNFTIndex].collectionAvatar} alt={onTier.nfts[selectedNFTIndex].collectionName} />
                                {onTier.nfts[selectedNFTIndex].collectionName}
                            </p>
                        </div>
                    </div>
                    <div className='description'>{onTier.description}</div>
                </div>
            </div>
        </div>
    )
}

PreviewNFTsPopup.propTypes = {
    onClose: PropTypes.func,
    onTier: PropTypes.object,
}

export default PreviewNFTsPopup;