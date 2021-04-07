import nfuSocialNetworkIcon from '../../assets/images/nfu-social-network.svg';
import nfuAuctionsIcon from '../../assets/images/nfu-auctions.svg';
import nfuMarketIcon from '../../assets/images/nfu-market.svg';
import nfuGamingIcon from '../../assets/images/nfu-gaming.svg';
import nfuMediaProtocolsIcon from '../../assets/images/nfu-media-protocols.svg';
import nfuGovernanceIcon from '../../assets/images/nfu-governance.svg';
import ellipses from '../../assets/images/ellipses.svg';

const NonFungibleUniverse = () => {
    return (
        <div className='non__fungible__universe__section'>
            <img className='ellipse-l' src={ellipses} alt='Ellipses' />
            <img className='ellipse-r' src={ellipses} alt='Ellipses' />
            <div className='non__fungible__universe__section__container'>
                <h1 className='title'>Non-Fungible Universe</h1>
                <div className='nfu__grid'>
                    <div className='nfu__grid__item'>
                        <img src={nfuSocialNetworkIcon} alt='NFT Social Network' />
                        <h2 className='title'>NFT Social Network</h2>
                        <p className='desc'>With the rise of decentralisation and blockchain technologies, the community needs a decentralized social forum where they can communicate ideas without fear of an idea or art being cencored.</p>
                    </div>
                    <div className='nfu__grid__item'>
                        <img src={nfuAuctionsIcon} alt='Auctions' />
                        <h2 className='title'>Auctions</h2>
                        <p className='desc'>Creating a decentralized NFT launch system that is made by artists for artists.</p>
                    </div>
                    <div className='nfu__grid__item'>
                        <img src={nfuMarketIcon} alt='NFT Market' />
                        <h2 className='title'>NFT Market</h2>
                        <p className='desc'>A universe of three initial planets with 23 OG characters each to memeify (69 total OG characters).</p>
                    </div>
                    <div className='nfu__grid__item'>
                        <img src={nfuGamingIcon} alt='Gaming' />
                        <h2 className='title'>Gaming</h2>
                        <p className='desc'>Games built with web 3.0 at their forefront, not added in as an afterthought.</p>
                    </div>
                    <div className='nfu__grid__item'>
                        <img src={nfuMediaProtocolsIcon} alt='Media Protocols' />
                        <h2 className='title'>Media Protocols</h2>
                        <p className='desc'>A meeting place where fans and artists can meet and discover new ways a decentralized community can support and interact with their favorite WEB3 media protocols.</p>
                    </div>
                    <div className='nfu__grid__item'>
                        <img src={nfuGovernanceIcon} alt='DAO and Governance' />
                        <h2 className='title'>DAO and Governance</h2>
                        <p className='desc'>kekDAO is intent on leading the way in the adoption of new approaches, technologies, and standards that have been proven superior to the established way of doing things.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NonFungibleUniverse
