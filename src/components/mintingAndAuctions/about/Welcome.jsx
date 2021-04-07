import { useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ellipses from '../../../assets/images/ellipses.svg';
import Button from '../../button/Button';
import welcomeImg from '../../../assets/images/about-page-welcome.png';

const Welcome = () => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className='welcome__section'>
            <img className='ellipse-l' src={ellipses} alt='Ellipses' />
            <img className='ellipse-r' src={ellipses} alt='Ellipses' />
            <div className='welcome__section__container'>
                <div className='left'>
                    <h1 className='title'>Welcome to a Universe made for Artists by Artists</h1>
                    <p className='desc'>Mint single or multiple NFTs, create and edit NFT Collections, and run auctions with multiple NFTs per winner. In this Universe anything is possible.</p>
                    <div className='links'>
                        <Button className='light-button'>Set up auction</Button>
                        <Button className='light-border-button'>Open marketplace</Button>
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
        </div>
    )
}

export default Welcome;