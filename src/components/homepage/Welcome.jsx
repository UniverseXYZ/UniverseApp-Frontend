import { useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import {AnimatedOnScroll} from "react-animated-css-onscroll";
import Popup from "reactjs-popup";
import welcomeImg from '../../assets/images/homepage-welcome.png';
import ellipses from '../../assets/images/ellipses.svg';
import Button from '../button/Button';
import SubscribePopup from "../popups/SubscribePopup";

const Welcome = () => {
    const [loaded, setLoaded] = useState(false);
    
    return (
        <div className='welcome__section'>
            <img className='ellipse-l' src={ellipses} alt='Ellipses' />
            <img className='ellipse-r' src={ellipses} alt='Ellipses' />
            <AnimatedOnScroll animationIn="fadeInUp">
                <div className='welcome__section__container'>
                    <div className='left'>
                        <h1 className='title'>Welcome to the NFT Universe built on Ethereum</h1>
                        <p className='desc'>Launch your own community-driven NFT universe baked with social tools, media services, and distribution - underpinned by the native $KEK token.</p>
                        <div className='links'>
                            <Button className='light-button'>Whitepaper</Button>
                            <Popup
                                trigger={<button className='light-border-button'>Join newsletter</button>}
                            >
                                {
                                    (close) => (
                                        <SubscribePopup close={close} />
                                    )
                                }
                            </Popup>
                        </div>
                    </div>
                    <div className='right'>
                        {!loaded &&
                            <SkeletonTheme color="#202020" highlightColor="#444">
                                <Skeleton circle={true} height={300} width={300} />
                            </SkeletonTheme>
                        }
                        <img src={welcomeImg} alt='Welcome' onLoad={() => setLoaded(true)} style={{ display: loaded ? 'block' : 'none' }} />
                    </div>
                </div>
            </AnimatedOnScroll>
        </div>
    )
}

export default Welcome;