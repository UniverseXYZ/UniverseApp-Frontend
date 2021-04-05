import Button from "../../button/Button"
import arrowUp from '../../../assets/images/Arrow_Up.svg'
import arrowDown from '../../../assets/images/ArrowDown.svg'
import infoIconRed from '../../../assets/images/Vector.svg'
import doneIcon from '../../../assets/images/Completed.svg'
import nft3 from '../../../assets/images/ntf3.svg'
import nft6 from '../../../assets/images/ntf6.svg'
import nft5 from '../../../assets/images/ntf5.svg'
import { useState } from "react"

const FutureAuctions = () => {

    const [hideLaunchIcon, setHideLaunchIcon] = useState(true)
    const [hideEndIcon, setHideEndIcon] = useState(true)
    const [auctionHide, setAuctionHide] = useState(true)
    var today=new Date();
    console.log(today.getUTCMonth())
    const PLACEHOLDER_FUTURE_AUCTIONS = [
        {
            id: 1,
            name: 'Auction 1',
            totalNFTs: 45,
            launchDate: 'Apr 4, 00:00 EST',
            endDate: 'Apr 10, 00:00 EST',
            platinumTier: {
                name: 'Platinum Tier',
                nftsPerWinner: 3,
                winners: 5,
                totalNFTs: 15,
                nfts: [nft3, nft6, nft5],
            },
            goldTier: {
                name: 'Gold Tier',
                nftsPerWinner: 2,
                winners: 10,
                totalNFTs: 20,
                nfts: [nft3, nft6],
            },
            silverTier: {
                name: 'Silver Tier',
                nftsPerWinner: 1,
                winners: 20,
                totalNFTs: 20,
                nfts: [nft3],
            },
        },
        {
            id: 2,
            name: 'Auction 2',
            totalNFTs: 45,
            launchDate: 'Apr 4, 00:00 EST',
            endDate: 'Apr 10, 00:00 EST',
            platinumTier: {
                name: 'Platinum Tier',
                nftsPerWinner: 3,
                winners: 5,
                totalNFTs: 15,
                nfts: [nft3, nft6, nft5],
            },
            goldTier: {
                name: 'Gold Tier',
                nftsPerWinner: 2,
                winners: 10,
                totalNFTs: 20,
                nfts: [nft3, nft6],
            },
            silverTier: {
                name: 'Silver Tier',
                nftsPerWinner: 1,
                winners: 20,
                totalNFTs: 20,
                nfts: [nft3],
            },
        },
        {
            id: 3,
            name: 'Auction 3',
            totalNFTs: 45,
            launchDate: 'May 15, 00:00 EST',
            endDate: 'May 18, 00:00 EST',
            platinumTier: {
                name: 'Platinum Tier',
                nftsPerWinner: 3,
                winners: 5,
                totalNFTs: 15,
                nfts: [nft3, nft6, nft5],
            },
            goldTier: {
                name: 'Gold Tier',
                nftsPerWinner: 2,
                winners: 10,
                totalNFTs: 20,
                nfts: [nft3, nft6],
            },
            silverTier: {
                name: 'Silver Tier',
                nftsPerWinner: 1,
                winners: 20,
                totalNFTs: 20,
                nfts: [nft3],
            },
        },
    ]

    return (
        <div className='future-auctions'>
            {PLACEHOLDER_FUTURE_AUCTIONS.map(future_auction => {
                return (
                    <div className="auction" key={future_auction.id}>
                        <div className="auction-header">
                            <h3>{future_auction.name}</h3>
                            <div className="launch-auction">
                                <Button className="light-button" disabled>LAUNCH AUCTION</Button>
                                <div className="line"></div>
                                {auctionHide?
                                    <img src={arrowDown} onClick={() =>setAuctionHide(false)}/>
                                :
                                    <img src={arrowUp} onClick={() =>setAuctionHide(true)}/>
                                }  
                            </div>
                        </div>
                        <div className="auctions-launch-dates">
                            <div className="total-dates">
                                <p>Total NFTs: <b>{future_auction.totalNFTs}</b></p>
                            </div>
                            <div className="total-dates">
                                <p>Launch date: <b>{future_auction.launchDate}</b> <img src={infoIconRed} onMouseOver={()=>setHideLaunchIcon(false)} onMouseLeave={() => setHideLaunchIcon(true)}/></p>
                                <div hidden={hideLaunchIcon} className="launch-info">Your launch date has already passed. Go to Edit Auction and adjust the launch and end dates.</div>
                            </div>
                            <div className="total-dates">
                                <p>End date: <b>{future_auction.endDate}</b> <img src={infoIconRed} onMouseOver={() => setHideEndIcon(false)} onMouseLeave={() => setHideEndIcon(true)}/></p>
                                <div hidden={hideEndIcon} className="end-info">Your launch and end date has already passed. Go to Edit Auction and adjust the launch and end dates.</div>
                            </div>
                        </div>
                        <div className="auctions-steps">
                            <div className="step-1">
                                <h6>Step 1</h6>
                                <h4>Auction Set Up</h4>
                                <div className="circle">
                                    <img src={doneIcon}/>
                                    <div className="hz-line"></div>
                                </div>
                                <Button className="light-border-button">EDIT AUCTION</Button>
                            </div>
                            <div className="step-2">
                                <h6>Step2</h6>
                                <h4>NFT Minting</h4>
                                <div className="circle">
                                    <img hidden={true} src={doneIcon}/>
                                    <div className="hz-line"></div>
                                </div>
                                <Button className="light-button">MINT NFTS</Button>
                            </div>
                            <div className="step-3">
                                <h6>Step 3</h6>
                                <h4>Landing Page Customization</h4>
                                <div className="circle">
                                    <img hidden={true} src={doneIcon}/>
                                </div>
                                <Button className="light-button" disabled>SET UP LANDING PAGE</Button>
                            </div>
                        </div>
                        <div hidden={auctionHide} className="auctions-future-tier">
                            <div className="future-tier">
                                <div className="future-tier-header">
                                    <h3>{future_auction.platinumTier.name}</h3>
                                    <p>NFTs per winner: <b>{future_auction.platinumTier.nftsPerWinner}</b></p>
                                    <p>Winners: <b>{future_auction.platinumTier.winners}</b></p>
                                    <p>Total NFTs: <b>{future_auction.platinumTier.totalNFTs}</b></p>
                                </div>
                                <div className="future-tier-body">
                                    {future_auction.platinumTier.nfts.map((nft, index) => {
                                        return (
                                            <div className="future-tier-image" key={index}>
                                                <div className="future-tier-image-second"></div>
                                                <div className="future-tier-image-first"></div>
                                                <div className="future-tier-image-main">
                                                    <img src={nft}/>
                                                </div>    
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="future-tier">
                                <div className="future-tier-header">
                                    <h3>{future_auction.goldTier.name}</h3>
                                    <p>NFTs per winner: <b>{future_auction.goldTier.nftsPerWinner}</b></p>
                                    <p>Winners: <b>{future_auction.goldTier.winners}</b></p>
                                    <p>Total NFTs: <b>{future_auction.goldTier.totalNFTs}</b></p>
                                </div>
                                <div className="future-tier-body">
                                    {future_auction.goldTier.nfts.map((nft, index) => {
                                        return (
                                            <div className="future-tier-image" key={index}>
                                                <div className="future-tier-image-second"></div>
                                                <div className="future-tier-image-first"></div>
                                                <div className="future-tier-image-main">
                                                    <img src={nft}/>
                                                </div>    
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="future-tier">
                                <div className="future-tier-header">
                                    <h3>{future_auction.silverTier.name}</h3>
                                    <p>NFTs per winner: <b>{future_auction.silverTier.nftsPerWinner}</b></p>
                                    <p>Winners: <b>{future_auction.silverTier.winners}</b></p>
                                    <p>Total NFTs: <b>{future_auction.silverTier.totalNFTs}</b></p>
                                </div>
                                <div className="future-tier-body">
                                    {future_auction.silverTier.nfts.map((nft, index) => {
                                        return (
                                            <div className="future-tier-image" key={index}>
                                                <div className="future-tier-image-second"></div>
                                                <div className="future-tier-image-first"></div>
                                                <div className="future-tier-image-main">
                                                    <img src={nft}/>
                                                </div>    
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <Button className="light-border-button">REMOVE</Button>
                        </div>
                    </div>
                )
            })}
        </div>
        
    )
}

export default FutureAuctions;