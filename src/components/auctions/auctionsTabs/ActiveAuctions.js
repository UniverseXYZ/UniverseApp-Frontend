import Button from "../../button/Button"
import arrowUp from '../../../assets/images/Arrow_Up.svg'
import arrowDown from '../../../assets/images/ArrowDown.svg'
import infoIconRed from '../../../assets/images/Vector.svg'
import doneIcon from '../../../assets/images/Completed.svg'
import {AUCTIONS_DATA} from '../../../auctionsData/Data'
import icon from '../../../assets/images/auction_icon.svg'
import bid_icon from '../../../assets/images/bid_icon.svg'
import copyIcon from '../../../assets/images/copy.svg'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from "react"
import Moment from 'react-moment';
import moment from 'moment';
import '../../pagination/Pagination.scss';
import Pagination from '../../pagination/Pagionation';

const ActiveAuctions = () => {

    const [shownActionId, setShownActionId] = useState(null)
    const [copied, setCopied] = useState(false);
    const [offset, setOffset] = useState(0);
    const [perPage, setPerPage] = useState(10);

    return (
        <div className='active-auctions'>
            {AUCTIONS_DATA.slice(offset, offset +perPage).map(active_auction => {
                return (
                    <div className="auction active-auction" key={active_auction.id}>
                        <div className="auction-header">
                            <div className="img_head">
                            <img className='auctionIcon' src={icon} alt='auction'/>
                            <h3>{active_auction.name}</h3>
                            <div className="copy-div">
                                        <div className='copy' title='Copy to clipboard'>
                                            <CopyToClipboard text={active_auction.auctionLink} onCopy={() => { setCopied(true); setTimeout(() => { setCopied(false) }, 1000) }}>
                                                <span><img src={copyIcon} alt='Copy to clipboard icon' className='copyImg'/>{copied ? 'Copied!' : 'Copy URL'}</span>
                                            </CopyToClipboard>
                                        </div>
                                    </div>
                            </div>
                            <div className="launch-auction">
                                {shownActionId === active_auction.id ?
                                    <img src={arrowUp} onClick={() => setShownActionId(null)}/>
                                :
                                    <img src={arrowDown} onClick={() => setShownActionId(active_auction.id)}/>
                                }  
                            </div>
                        </div>
                        <div className="auctions-launch-dates">
                            <div className="total-dates">
                                <p>Total NFTs: <b>{active_auction.totalNFTs}</b></p>
                            </div>
                            <div className="total-dates">
                                <p>Auction ends in <b>
                               
                                { moment.utc(moment(active_auction.endDate).diff(moment(active_auction.launchDate))).format('H : mm : ss')}
                                {/* <Moment from={active_auction.launchDate}>{active_auction.endDate}</Moment> */}
                                    </b></p>
                            </div>
                            <div className="total-dates">
                                <p>Launch date: <b> <Moment format="MMMM DD, hh:mm">{active_auction.launchDate}</Moment></b></p>
                            </div>
                            <div className="total-dates">
                                <p>End date: <b><Moment format="MMMM DD, hh:mm">{active_auction.endDate}</Moment></b></p>
                            </div>
                        </div>
                        <div className='bid_info'>
                            
                           <div className='bids first'>
                               <div className='boredred-div'> 
                                   <span className='head'>Total bids</span> 
                                   <span className='value'>{active_auction.total_bids}</span>
                               </div>
                               <div> 
                                   <span className='head'>Highest winning bid</span>
                                   <span className='value'><img src={bid_icon} alt="Highest winning bid"/> {active_auction.highest_winning_bid} ETH <span className='dollar-val'> ~$41,594</span></span>
                               </div>
                           </div>

                           <div className='bids'>
                               <div className='boredred-div'> 
                                   <span className='head'>Total bids amount</span>
                                   <span className='value'><img src={bid_icon} alt="Total bids amount"/>{active_auction.total_bids_amount} ETH <span className='dollar-val'> ~$41,594</span></span>
                               </div>
                               <div> 
                                   <span className='head'>Lower winning bid</span>
                                   <span className='value'><img src={bid_icon} alt="Lower winning bid"/>{active_auction.lower_winning_bid} ETH <span className='dollar-val'> ~$41,594</span></span>
                               </div>
                           </div>
                            
                        </div>
                        <div hidden={shownActionId !== active_auction.id} className="auctions-tier">
                            <div className="tier">
                                <div className="tier-header">
                                    <h3>{active_auction.platinumTier.name}</h3>
                                    <p>NFTs per winner: <b>{active_auction.platinumTier.nftsPerWinner}</b></p>
                                    <p>Winners: <b>{active_auction.platinumTier.winners}</b></p>
                                    <p>Total NFTs: <b>{active_auction.platinumTier.totalNFTs}</b></p>
                                </div>
                                <div className="tier-body">
                                    {active_auction.platinumTier.nfts.map((nft, index) => {
                                        return (
                                            <div className="tier-image" key={index}>
                                                <div className="tier-image-second"></div>
                                                <div className="tier-image-first"></div>
                                                <div className="tier-image-main">
                                                    <img src={nft} alt='image'/>
                                                </div>    
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="tier">
                                <div className="tier-header">
                                    <h3>{active_auction.goldTier.name}</h3>
                                    <p>NFTs per winner: <b>{active_auction.goldTier.nftsPerWinner}</b></p>
                                    <p>Winners: <b>{active_auction.goldTier.winners}</b></p>
                                    <p>Total NFTs: <b>{active_auction.goldTier.totalNFTs}</b></p>
                                </div>
                                <div className="tier-body">
                                    {active_auction.goldTier.nfts.map((nft, index) => {
                                        return (
                                            <div className="tier-image" key={index}>
                                                <div className="tier-image-second"></div>
                                                <div className="tier-image-first"></div>
                                                <div className="tier-image-main">
                                                    <img src={nft} alt='image'/>
                                                </div>    
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="tier">
                                <div className="tier-header">
                                    <h3>{active_auction.silverTier.name}</h3>
                                    <p>NFTs per winner: <b>{active_auction.silverTier.nftsPerWinner}</b></p>
                                    <p>Winners: <b>{active_auction.silverTier.winners}</b></p>
                                    <p>Total NFTs: <b>{active_auction.silverTier.totalNFTs}</b></p>
                                </div>
                                <div className="tier-body">
                                    {active_auction.silverTier.nfts.map((nft, index) => {
                                        return (
                                            <div className="tier-image" key={index}>
                                                <div className="tier-image-second"></div>
                                                <div className="tier-image-first"></div>
                                                <div className="tier-image-main">
                                                    <img src={nft} alt='image'/>
                                                </div>    
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
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

export default ActiveAuctions;