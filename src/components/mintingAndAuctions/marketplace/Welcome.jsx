import React from 'react'
import ellipses from '../../../assets/images/ellipses.svg';
import {AnimatedOnScroll} from "react-animated-css-onscroll";

const Welcome = () => {
    return (
        <div className='welcome__section'>
            <img className='ellipse-l' src={ellipses} alt='Ellipses' />
            <img className='ellipse-r' src={ellipses} alt='Ellipses' />
                <div className='welcome__section__container'>
                    <AnimatedOnScroll animationIn="fadeInUp" animationInDelay={200}>
                        <h1 className='title'>Welcome to the</h1>
                    </AnimatedOnScroll>
                    <AnimatedOnScroll animationIn="fadeInUp" animationInDelay={600}>
                        <h1 className='title'>Auction House</h1>
                    </AnimatedOnScroll>
                    <AnimatedOnScroll animationIn="fadeInUp" animationInDelay={1000}>
                        <p className='desc'>Check out creative releases from artists that have partnered with us</p>
                    </AnimatedOnScroll>
                </div>
        </div>
    )
}

export default Welcome;