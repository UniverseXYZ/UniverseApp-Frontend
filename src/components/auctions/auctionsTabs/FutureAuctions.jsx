import Button from "../../button/Button"
import arrowUp from '../../../assets/images/Arrow_Up.svg'
import arrowDown from '../../../assets/images/ArrowDown.svg'
import infoIconRed from '../../../assets/images/Vector.svg'
import doneIcon from '../../../assets/images/Completed.svg'
import {AUCTIONS_DATA} from '../../../auctionsData/Data'
import { useState } from "react"
import Moment from 'react-moment'
import moment from 'moment'
import '../../pagination/Pagination.scss'
import Pagination from '../../pagination/Pagionation'


const FutureAuctions = () => {

    const [hideLaunchIcon, setHideLaunchIcon] = useState(true)
    const [hideEndIcon, setHideEndIcon] = useState(true)
    const [shownActionId, setshownActionId] = useState(null)
    const [offset, setOffset] = useState(0);
    const [perPage, setPerPage] = useState(10);
    var today=new Date();
    console.log(today.getUTCMonth())

    return (
        <div className='future-auctions'>
            {AUCTIONS_DATA.slice(offset,offset+perPage).map(future_auction => {
                return (
                    <div className="auction" key={future_auction.id}>
                        <div className="auction-header">
                            <h3>{future_auction.name}</h3>
                            <div className="launch-auction">
                                <Button className="light-button" disabled>LAUNCH AUCTION</Button>
                                <div className="line"></div>
                                {shownActionId === future_auction.id ?
                                    <img src={arrowUp} onClick={() =>setshownActionId(null)}/>
                                    :
                                <img src={arrowDown} onClick={() =>setshownActionId(future_auction.id)}/>
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
                        <div hidden={shownActionId !== future_auction.id} className="auctions-tier">
                            <div className="tier">
                                <div className="tier-header">
                                    <h3>{future_auction.platinumTier.name}</h3>
                                    <p>NFTs per winner: <b>{future_auction.platinumTier.nftsPerWinner}</b></p>
                                    <p>Winners: <b>{future_auction.platinumTier.winners}</b></p>
                                    <p>Total NFTs: <b>{future_auction.platinumTier.totalNFTs}</b></p>
                                </div>
                                <div className="tier-body">
                                    {future_auction.platinumTier.nfts.map((nft, index) => {
                                        return (
                                            <div className="tier-image" key={index}>
                                                <div className="tier-image-second"></div>
                                                <div className="tier-image-first"></div>
                                                <div className="tier-image-main">
                                                    <img src={nft}/>
                                                </div>    
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="tier">
                                <div className="tier-header">
                                    <h3>{future_auction.goldTier.name}</h3>
                                    <p>NFTs per winner: <b>{future_auction.goldTier.nftsPerWinner}</b></p>
                                    <p>Winners: <b>{future_auction.goldTier.winners}</b></p>
                                    <p>Total NFTs: <b>{future_auction.goldTier.totalNFTs}</b></p>
                                </div>
                                <div className="tier-body">
                                    {future_auction.goldTier.nfts.map((nft, index) => {
                                        return (
                                            <div className="tier-image" key={index}>
                                                <div className="tier-image-second"></div>
                                                <div className="tier-image-first"></div>
                                                <div className="tier-image-main">
                                                    <img src={nft}/>
                                                </div>    
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="tier">
                                <div className="tier-header">
                                    <h3>{future_auction.silverTier.name}</h3>
                                    <p>NFTs per winner: <b>{future_auction.silverTier.nftsPerWinner}</b></p>
                                    <p>Winners: <b>{future_auction.silverTier.winners}</b></p>
                                    <p>Total NFTs: <b>{future_auction.silverTier.totalNFTs}</b></p>
                                </div>
                                <div className="tier-body">
                                    {future_auction.silverTier.nfts.map((nft, index) => {
                                        return (
                                            <div className="tier-image" key={index}>
                                                <div className="tier-image-second"></div>
                                                <div className="tier-image-first"></div>
                                                <div className="tier-image-main">
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
            <div className='pagination__container'>
                                <Pagination data={AUCTIONS_DATA} perPage={perPage} setOffset={setOffset} />
            </div>
        </div>
        
    )
}

export default FutureAuctions;