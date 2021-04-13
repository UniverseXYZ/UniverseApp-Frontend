import {AnimatedOnScroll} from "react-animated-css-onscroll";
import TimKangImg from '../../../assets/images/Tim-Kang.png';
import TylerWardImg from '../../../assets/images/Tyler-Ward.png';
import TroyMurrayImg from '../../../assets/images/Troy-Murray.png';
import JustinBlauImg from '../../../assets/images/Justin-Blau.png';
import RyanShtirmerImg from '../../../assets/images/Ryan-Shtirmer.png';

const OurTeam = () => {
    return (
        <div className='our__team__section'>
            <div className='our__team__section__container'>
                <h1 className='title'>Our Team</h1>
                <div className='team__members'>
                    <AnimatedOnScroll animationIn="zoomIn" animationInDuration={400}>
                        <div className='member'>
                            <img src={TimKangImg} alt='Tim Kang' />
                            <h3>Tim Kang</h3>
                        </div>
                    </AnimatedOnScroll>
                    <AnimatedOnScroll animationIn="zoomIn" animationInDuration={800}>
                        <div className='member'>
                            <img src={TylerWardImg} alt='Tyler Ward' />
                            <h3>Tyler Ward</h3>
                        </div>
                    </AnimatedOnScroll>
                    <AnimatedOnScroll animationIn="zoomIn" animationInDuration={1200}>
                        <div className='member'>
                            <img src={TroyMurrayImg} alt='Troy Murray' />
                            <h3>Troy Murray</h3>
                        </div>
                    </AnimatedOnScroll>
                    <AnimatedOnScroll animationIn="zoomIn" animationInDuration={1600}>
                        <div className='member'>
                            <img src={JustinBlauImg} alt='Justin 3LAU' />
                            <h3>Justin 3LAU</h3>
                        </div>
                    </AnimatedOnScroll>
                    <AnimatedOnScroll animationIn="zoomIn" animationInDuration={2000}>
                        <div className='member'>
                            <img src={RyanShtirmerImg} alt='Ryan Shtirmer' />
                            <h3>Ryan Shtirmer</h3>
                        </div>
                    </AnimatedOnScroll>
                </div>
                <div className='see__full__team'>
                    <button>See the full team</button>
                </div>
            </div>
        </div>
    )
}

export default OurTeam;