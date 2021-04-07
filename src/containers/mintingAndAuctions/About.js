import React from 'react'
import Welcome from '../../components/mintingAndAuctions/about/Welcome'
import '../../components/mintingAndAuctions/about/About.scss';
import DigitalTools from '../../components/mintingAndAuctions/about/DigitalTools';
import HowItWorks from '../../components/mintingAndAuctions/about/howItWorks/HowItWorks';

const About = () => {
    return (
        <div className='about__page'>
            <Welcome />
            <DigitalTools />
            <HowItWorks />
        </div>
    )
}

export default About;