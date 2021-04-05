import Button from "../../Button"
import arrowUp from '../../../assets/images/Arrow_Up.svg'
import infoIconRed from '../../../assets/images/Vector.svg'
import doneIcon from '../../../assets/images/Completed.svg'
import nft3 from '../../../assets/images/nft3.png'
import nft6 from '../../../assets/images/nft6.png'
import nft5 from '../../../assets/images/nft5.png'
import { useState } from "react"

const FutureAuctions = () => {

    const [hideLaunchIcon, setHideLaunchIcon] = useState(true)
    const [hideEndIcon, setHideEndIcon] = useState(true)
    const [auctionHide, setAuctionHide] = useState(true)

    return (
        <div className='future-auctions'>
            <div className="auction-header">
                <h3>Auction 1</h3>
                <div className="launch-auction">
                    <Button className="light-button" disabled>LAUNCH AUCTION</Button>
                    <div className="line"></div>
                    <img src={arrowUp}/>
                </div>
            </div>
            <div className="auctions-launch-dates">
                <div className="total-dates">
                    <p>Total NFTs: <b>45</b></p>
                </div>
                <div className="launch-date-error">
                    <p>Launch date: <b>Mar 15, 00:00 EST</b> <img src={infoIconRed} onMouseOver={()=>setHideLaunchIcon(false)} onMouseLeave={() => setHideLaunchIcon(true)}/></p>
                    <div hidden={hideLaunchIcon} className="launch-info">Your launch date has already passed. Go to Edit Auction and adjust the launch and end dates.</div>
                </div>
                <div className="end-date-error">
                    <p>End date: <b>Mar 15, 00:00 EST</b> <img src={infoIconRed} onMouseOver={() => setHideEndIcon(false)} onMouseLeave={() => setHideEndIcon(true)}/></p>
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
            <div className="auctions-future-tier">
                <div className="future-tier">
                    <div className="future-tier-header">
                        <h3>Platinum Tier</h3>
                        <p>NFTs per winner: <b>3</b></p>
                        <p>Winners: <b>5</b></p>
                        <p>Total NFTs: <b>15</b></p>
                    </div>
                    <div className="future-tier-body">
                        <div className="future-tier-image">
                            <div className="future-tier-image-second"></div>
                            <div className="future-tier-image-first"></div>
                            <div className="future-tier-image-main">
                                <img src={nft3}/>
                            </div>    
                        </div>
                        <div className="future-tier-image">
                            <div className="future-tier-image-second"></div>
                            <div className="future-tier-image-first"></div>
                            <div className="future-tier-image-main">
                                <img src={nft6}/>
                            </div>    
                        </div>
                        <div className="future-tier-image">
                            <div className="future-tier-image-second"></div>
                            <div className="future-tier-image-first"></div>
                            <div className="future-tier-image-main">
                                <img src={nft5}/>
                            </div>    
                        </div>
                    </div>
                </div>
                <div className="future-tier">
                    <div className="future-tier-header">
                        <h3>Gold Tier</h3>
                        <p>NFTs per winner: <b>2</b></p>
                        <p>Winners: <b>10</b></p>
                        <p>Total NFTs: <b>20</b></p>
                    </div>
                    <div className="future-tier-body">
                        <div className="future-tier-image">
                            <div className="future-tier-image-second"></div>
                            <div className="future-tier-image-first"></div>
                            <div className="future-tier-image-main">
                                <img src={nft3}/>
                            </div>    
                        </div>
                        <div className="future-tier-image">
                            <div className="future-tier-image-second"></div>
                            <div className="future-tier-image-first"></div>
                            <div className="future-tier-image-main">
                                <img src={nft6}/>
                            </div>    
                        </div>
                    </div>
                </div>
                <div className="future-tier">
                    <div className="future-tier-header">
                        <h3>Silver Tier</h3>
                        <p>NFTs per winner: <b>1</b></p>
                        <p>Winners: <b>20</b></p>
                        <p>Total NFTs: <b>20</b></p>
                    </div>
                    <div className="future-tier-body">
                        <div className="future-tier-image">
                            <div className="future-tier-image-second"></div>
                            <div className="future-tier-image-first"></div>
                            <div className="future-tier-image-main">
                                <img src={nft3}/>
                            </div>    
                        </div>
                    </div>
                </div>
                <Button className="light-border-button">REMOVE</Button>
            </div>
        </div>
    )
}

export default FutureAuctions;