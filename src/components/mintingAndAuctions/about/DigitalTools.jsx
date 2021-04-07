import blockOne from '../../../assets/images/about-page-block1.png';
import blockTwo from '../../../assets/images/about-page-block2.png';
import blockThree from '../../../assets/images/about-page-block3.png';
import Button from '../../button/Button';

const DigitalTools = () => {
    return (
        <div className='digital__tools__section'>
            <div className='digital__tools__section__container'>
                <h1 className='title'>Digital Tools to Empower Artists</h1>
                <div className='blocks'>

                    {/* Block 1 */}
                    <div>
                        <img src={blockOne} alt='Block' />
                    </div>
                    <div>
                        <h2 className='title'>Efficient collection curating and launching</h2>
                        <p className='desc'>Curate large collection of 100s or even 1000s of NFTs. Our tools allow you to easily customize and curate collections so that they are perfect before you launch. Launching 100s of NFTs at one time can be extremely difficult but our step by step set up and review process easily allows you to prevent mistakes and launch a beautiful and consistent collection.</p>
                        <Button className='light-border-button'>create nft collection</Button>
                    </div>

                    {/* Block 2 */}
                    <div>
                        <h2 className='title'>Easy to use UI for minting and selling NFTs</h2>
                        <p className='desc'>We have combined UI and flows from industry leaders and tweaked it slightly to make an easy to use system for minting and selling NFTs. <br/><br/> We offer step by step instructions for steps so you dont get stuck or confused.</p>
                        <Button className='light-border-button'>set up auction</Button>
                    </div>
                    <div>
                        <img src={blockTwo} alt='Block' />
                    </div>

                    {/* Block 3 */}
                    <div>
                        <img src={blockThree} alt='Block' />
                    </div>
                    <div>
                        <h2 className='title'>Powerful platform for auctioning NFTs</h2>
                        <p className='desc'>Sell any NFT in your collection whether you created it or bought it on the secondary market or another platform. You will be able to bundle an Euler beat with a Hashmask or a Punk then sell it to the highest bidder and give the second highest bidder a participation trophy you minted on Rarible or Opensea. This Auction will allow you to mix and match 100s of NFTs in tiers to be bid on.</p>
                        <Button className='light-border-button'>open marketplace</Button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DigitalTools;