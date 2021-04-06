import circleImg from '../../assets/images/circle.svg';

const About = () => {
    return (
        <div className='about__section'>
            <img className='circle-r' src={circleImg} alt='Circle' />
            <img className='circle-l' src={circleImg} alt='Circle' />
            <div className='about__section__container'>
                <div className='universe__protocol'>
                    <h1 className='title'>Universe Protocol and the kekDAO</h1>
                    <p className='info'>Meta: To create a system that doesn’t live off the backs of artists and creates a sustainable ecosystem for artists and fans alike.</p>
                    <p className='desc'>Universe Protocol is the all binding protocol of the creative cosmic dust that is all around us. The unifying force of Kek is what governs the creative cosmic dust and brings order through governance in the Decentralized Autonomous Organization to the Universe. There are two main functions of the Universe Protocol, the first being that of minting new galaxies and the second auctioning off of said galaxies. The kekDAO governs the parameters of the Universe Protocols functions.</p>
                </div>
            </div>
        </div>
    )
}

export default About;