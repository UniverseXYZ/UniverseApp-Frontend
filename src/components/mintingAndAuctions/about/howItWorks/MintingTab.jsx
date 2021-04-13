import { useState } from 'react';
import {Animated} from "react-animated-css";
import mintingAccordionOne from '../../../../assets/images/minting-accordion1.png';
import mintingAccordionTwo from '../../../../assets/images/minting-accordion2.png';
import mintingAccordionThree from '../../../../assets/images/minting-accordion3.png';
import Button from '../../../button/Button';

const MintingTab = () => {
    const [isFirstAccordionOpened, setIsFirstAccordionOpened] = useState(false);
    const [isSecondAccordionOpened, setIsSecondAccordionOpened] = useState(false);
    const [isThirdAccordionOpened, setIsThirdAccordionOpened] = useState(false);

    return (
        <div className='accordion'>
                <Animated animationIn="bounceInLeft" animationInDuration={500}>
                    <div className='accordion__item' onClick={() => setIsFirstAccordionOpened(!isFirstAccordionOpened)}>
                        <div className='accordion__item__header'>
                            <h2 className='title'>1. Create Single NFTs or Organise NFT Collections</h2>
                            <div className='toggle'>
                                <span className='horizontal'></span>
                                {!isFirstAccordionOpened &&
                                    <span className='vertical'></span>
                                }
                            </div>
                        </div>
                        {isFirstAccordionOpened &&
                            <Animated animationIn="zoomIn">
                                <div className='accordion__item__body'>
                                    <p className='desc'>
                                        Create a single NFT or mint a large collection that you have been creating for months. Our tools give you the easy formating and editing options to easily curate a perfect collection before you launch. Eliminate mistakes with our review process.
                                    </p>
                                    <img src={mintingAccordionOne} alt='Create Single NFTs or Organise NFT Collections' />
                                </div>
                            </Animated>
                        }
                    </div>
                </Animated>
                <Animated animationIn="bounceInLeft" animationInDuration={700}>
                    <div className='accordion__item' onClick={() => setIsSecondAccordionOpened(!isSecondAccordionOpened)}>
                        <div className='accordion__item__header'>
                            <h2 className='title'>2. Upload Images, Audio or Video, and Fill the Meta Data</h2>
                            <div className='toggle'>
                                <span className='horizontal'></span>
                                {!isSecondAccordionOpened &&
                                    <span className='vertical'></span>
                                }
                            </div>
                        </div>
                        {isSecondAccordionOpened &&
                            <Animated animationIn="zoomIn">
                                <div className='accordion__item__body'>
                                    <p className='desc'>
                                        NFTs are empowering because they do not limit any type of artists, files are not limited and you can turn a painting, a video, a song, a beat, a sound, a picture, a drawing,  a gif or anything that your creative mind can think of into an NFT. The possibilities are endless with art and the Universe. 
                                    </p>
                                    <img src={mintingAccordionTwo} alt='Upload Images, Audio or Video, and Fill the Meta Data' />
                                </div>
                            </Animated>
                        }
                    </div>
                </Animated>
                <Animated animationIn="bounceInLeft" animationInDuration={1000}>
                    <div className='accordion__item last' onClick={() => setIsThirdAccordionOpened(!isThirdAccordionOpened)}>
                        <div className='accordion__item__header'>
                            <h2 className='title'>3. Mint NFTs or Save for Later</h2>
                            <div className='toggle'>
                                <span className='horizontal'></span>
                                {!isThirdAccordionOpened &&
                                    <span className='vertical'></span>
                                }
                            </div>
                        </div>
                        {isThirdAccordionOpened &&
                            <Animated animationIn="zoomIn">
                                <div className='accordion__item__body'>
                                    <p className='desc'>
                                        This is where the magic happens. Mint NFTs instantly or save them for later for a collection or maybe it’s just not ready yet.
                                    </p>
                                    <img src={mintingAccordionThree} alt='Mint NFTs or Save for Later' />
                                </div>
                            </Animated>
                        }
                    </div>
                </Animated>

                <div className='launch__app__btn'>
                    <Button className='light-button'>Launch app</Button>
                </div>
            </div>
    )
}

export default MintingTab;