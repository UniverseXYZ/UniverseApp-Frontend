import React from 'react'
import ellipses from '../../../assets/images/ellipses.svg';

const Welcome = () => {
    return (
        <div className='welcome__section'>
            <img className='ellipse-l' src={ellipses} alt='Ellipses' />
            <img className='ellipse-r' src={ellipses} alt='Ellipses' />
            <div className='welcome__section__container'>
                <h1 className='title'>Welcome to the Auction Marketplace</h1>
                <p className='desc'>Check out on creative releases from artists that partnered with us</p>
            </div>
        </div>
    )
}

export default Welcome;