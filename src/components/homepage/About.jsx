import { useEffect } from 'react';
import Popup from "reactjs-popup";
import {AnimatedOnScroll} from "react-animated-css-onscroll";
import { useHistory } from "react-router";
import circleImg from '../../assets/images/circle.svg';
import blockOne from '../../assets/images/homepage-block1.png';
import blockTwo from '../../assets/images/homepage-block2.png';
import blockThree from '../../assets/images/homepage-block3.png';
import universeMintingLogo from '../../assets/images/universe-minting.svg';
import universeAuctionsLogo from '../../assets/images/universe-auctions.svg';
import Button from '../button/Button';
import SubscribePopup from "../popups/SubscribePopup";

const About = () => {
    const history = useHistory();

    useEffect(() => {
        var circleR = document.querySelector("#circle-r");
        var circleL = document.querySelector("#circle-l");

        window.addEventListener("DOMContentLoaded", scrollLoop, false);
        
        function scrollLoop() {
            const yScrollPosition = window.scrollY;

            circleR.style.transform = "translate3d(" + yScrollPosition * -0.05 + "px, " + yScrollPosition * -0.2 + "px, 0)";
            circleL.style.transform = "translate3d(" + yScrollPosition * -0.05 + "px, " + yScrollPosition * -0.2 + "px, 0) rotate(180deg)";
        
            requestAnimationFrame(scrollLoop);
        }
    }, [])

    return (
        <div className='describe__section'>
            <div className='universe__protocol__section'>
                <img id='circle-r' className='circle-r' src={circleImg} alt='Circle' />
                <img id='circle-l' className='circle-l' src={circleImg} alt='Circle' />
                <div className='universe__protocol__section__container'>
                    <AnimatedOnScroll animationIn="fadeInUp">
                        <div className='universe__protocol'>
                            <h1 className='title'>Universe Protocol and the kekDAO</h1>
                            <p className='info'>Meta: To create a system that doesn’t live off the backs of artists and creates a sustainable ecosystem for artists and fans alike.</p>
                            <p className='desc'>Universe Protocol is the all binding protocol of the creative cosmic dust that is all around us. The unifying force of Kek is what governs the creative cosmic dust and brings order through governance in the Decentralized Autonomous Organization to the Universe. There are two main functions of the Universe Protocol, the first being that of minting new galaxies and the second auctioning off of said galaxies. The kekDAO governs the parameters of the Universe Protocols functions.</p>
                        </div>
                    </AnimatedOnScroll>
                </div>
            </div>
            <div className='about__section'>
                <div className='about__section__container'>

                    <div className='blocks'>

                        {/* Block 1 */}
                        <AnimatedOnScroll animationIn="fadeInUp">
                            <img className='show__on__mobile' src={universeMintingLogo} alt='Universe Minting' />
                            <img src={blockOne} alt='Block' style={{ filter: 'drop-shadow(0px 10px 40px rgba(136, 120, 172, 0.2))', borderRadius: '12px' }} />
                        </AnimatedOnScroll>
                        <AnimatedOnScroll animationIn="fadeInUp">
                            <img className='hide__on__mobile' src={universeMintingLogo} alt='Universe Minting' />
                            <p className='desc'>Galaxies are a collection of minted NFT's these galaxies represent the IP of that particular item in the universe and its community can create art for: shows, merch, music festivals, etc. These Galaxies can also contain other planets within them, other NFT collections of art, shows, merch and music festivals. For future build outs, we hope to one day turn these into mini DAOs along with an integrated social network.</p>
                            <Button className='light-button' onClick={() => history.push('/minting-and-auctions/about')}>Learn more</Button>
                        </AnimatedOnScroll>

                        {/* Block 2 */}
                        <AnimatedOnScroll animationIn="fadeInUp">
                            <img className='hide__on__mobile' src={universeAuctionsLogo} alt='Universe Auctions' />
                            <p className='desc'>We are developing a trustless and decentralized auction house for NFTs where anyone holding an NFT can put the Galaxy and/or the collection of Planets up for auction. These auctions can also facilitate swaps of other tokens. You will be able to pay with specific ERC-20 and ETH. The kekDAO will take a small fee of every auction.</p>
                            <Button className='light-button' onClick={() => history.push('/minting-and-auctions/about')}>Learn more</Button>
                        </AnimatedOnScroll>
                        <AnimatedOnScroll animationIn="fadeInUp">
                            <img className='show__on__mobile' src={universeAuctionsLogo} alt='Universe Auctions' />
                            <img className='universe__auctions__img' src={blockTwo} alt='Block' />
                        </AnimatedOnScroll>

                        {/* Block 3 */}
                        <AnimatedOnScroll animationIn="fadeInUp" style={{ display: 'flex', justifyContent: 'center' }}>
                            <img className='universe__original__characters__img' src={blockThree} alt='Block' />
                        </AnimatedOnScroll>
                        <AnimatedOnScroll animationIn="fadeInUp">
                            <h1 className='title'>Universe Original Characters and Lore</h1>
                            <span className='coming__soon'>Coming soon</span>
                            <p className='desc'>We are creating a whole universe of 69 original characters with stories and lore to lay the framework and showcase the potential for KekDAO. We will show you how to create a universe of your own, build with us and help the Universe of NFTs expand infinitely.</p>
                            <div className='subscribe__form'>
                                <label htmlFor='subscribeInp'>Subscribe to stay updated on the latest news</label>
                                <div className='form__group'>
                                    <input id='subscribeInp' type='email' placeholder='Enter your email' />
                                    <Popup
                                        trigger={<button className='light-button'>Subscribe</button>}
                                    >
                                        {
                                            (close) => (
                                                <SubscribePopup close={close} />
                                            )
                                        }
                                    </Popup>
                                </div>
                            </div>
                        </AnimatedOnScroll>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;