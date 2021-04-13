import React from 'react'
import ellipses from '../../../assets/images/ellipses.svg';
import {AnimatedOnScroll} from "react-animated-css-onscroll";

const Welcome = () => {
    return (
        <div className='welcome__section'>
            <img className='ellipse-l' src={ellipses} alt='Ellipses' />
            <img className='ellipse-r' src={ellipses} alt='Ellipses' />
            <AnimatedOnScroll animationIn="fadeInUp">
                <div className='welcome__section__container'>
                    <h1 className='title'>Welcome to the Auction Marketplace</h1>
                    <p className='desc'>Check out on creative releases from artists that partnered with us</p>
                </div>
            </AnimatedOnScroll>
        </div>
    )
}

export default Welcome;