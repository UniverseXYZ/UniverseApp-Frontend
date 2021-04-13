import buyUniverseNFTsImg from '../../assets/images/buy-universe-nft.png';
import {AnimatedOnScroll} from "react-animated-css-onscroll";

const BuyUniverseNFTs = () => {
    return (
        <div className='buy__universe__nfts__section'>
            <AnimatedOnScroll animationIn="flipInX">
                <div className='buy__universe__nfts__section__container'>
                    <div>
                        <h1 className='title'>Buy Universe NFTs</h1>
                        <p className='desc'>A constant stream of default tokens are released every day. These tokens are distributed between investors, contributors, and the community.</p>
                        <span className='coming__soon'>Coming soon</span>
                    </div>
                    <div>
                        <img src={buyUniverseNFTsImg} alt='Buy Universe NFTs' />
                    </div>
                </div>
            </AnimatedOnScroll>
        </div>
    )
}

export default BuyUniverseNFTs;