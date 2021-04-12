import Button from "../../button/Button"
import arrowUp from '../../../assets/images/Arrow_Up.svg'
import arrowDown from '../../../assets/images/ArrowDown.svg'
import infoIconRed from '../../../assets/images/Vector.svg'
import searchIcon from '../../../assets/images/search-icon.svg'
import doneIcon from '../../../assets/images/Completed.svg'
import {AUCTIONS_DATA} from '../../../utils/fixtures/AuctionsDummyData'
import {PAST_ACTIONS_DATA} from '../../../utils/fixtures/AuctionsDummyData'
import icon from '../../../assets/images/auction_icon.svg'
import bid_icon from '../../../assets/images/bid_icon.svg'
import Input from '../../input/Input'
import copyIcon from '../../../assets/images/copy.svg'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useState } from "react"
import Moment from 'react-moment';
import moment from 'moment';
import '../../pagination/Pagination.scss';
import Pagination from '../../pagination/Pagionation';

const PastAuctions = () => {

    const [shownActionId, setShownActionId] = useState(null)
    const [copied, setCopied] = useState(false);
    const [offset, setOffset] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [searchByName,setSearchByName] =useState('');

    const handleSearch= (value) =>{
        setSearchByName(value)
    }
    return (
        <div className='past-auctions'>
            <div className='input-search'>
            <img src={searchIcon} alt='search'/>
            <Input className='searchInp'
            onChange={(e) => handleSearch(e.target.value)}
            value={searchByName}
            placeholder='Search by name'/>
            </div>
            {PAST_ACTIONS_DATA.slice(offset,offset+perPage).filter(item=>item.name.toLowerCase().includes(searchByName.toLowerCase())).map(past_auction => {
                return (
                    <div className="auction past-auction" key={past_auction.id}>
                        <div className="auction-header">
                            <div className="img_head">
                            <img className='auctionIcon' src={icon} alt='auction'/>
                            <h3>{past_auction.name}</h3>
                            <div className="copy-div">
                                        <div className='copy' title='Copy to clipboard'>
                                            <CopyToClipboard text={past_auction.auctionLink} onCopy={() => { setCopied(true); setTimeout(() => { setCopied(false) }, 1000) }}>
                                                <span><img src={copyIcon} alt='Copy to clipboard icon' className='copyImg'/>{copied ? 'Copied!' : 'Copy URL'}</span>
                                            </CopyToClipboard>
                                        </div>
                                    </div>
                            </div>
                            <div className="launch-auction">
                                {shownActionId === past_auction.id ?
                                    <img src={arrowUp} onClick={() => setShownActionId(null)}/>
                                :
                                    <img src={arrowDown} onClick={() => setShownActionId(past_auction.id)}/>
                                }  
                            </div>
                        </div>
                        <div className="auctions-launch-dates">
                            <div className="total-dates">
                                <p>Total NFTs: <b>{past_auction.totalNFTs}</b></p>
                            </div>
                            <div className="total-dates">
                                <p>Launch date: <b> <Moment format="MMMM DD, hh:mm">{past_auction.launchDate}</Moment></b></p>
                            </div>
                            <div className="total-dates">
                                <p>End date: <b><Moment format="MMMM DD, hh:mm">{past_auction.endDate}</Moment></b></p>
                            </div>
                        </div>
                        <div className='bid_info'>
                            
                           <div className='bids first'>
                               <div className='boredred-div'> 
                                   <span className='head'>Total bids</span> 
                                   <span className='value'>{past_auction.total_bids}</span>
                               </div>
                               <div> 
                                   <span className='head'>Highest winning bid</span>
                                   <span className='value'><img src={bid_icon} alt="Highest winning bid"/> {past_auction.highest_winning_bid} ETH <span className='dollar-val'> ~$41,594</span></span>
                               </div>
                           </div>

                           <div className='bids'>
                               <div className='boredred-div'> 
                                   <span className='head'>Total bids amount</span>
                                   <span className='value'><img src={bid_icon} alt="Total bids amount"/>{past_auction.total_bids_amount} ETH <span className='dollar-val'> ~$41,594</span></span>
                               </div>
                               <div> 
                                   <span className='head'>Lower winning bid</span>
                                   <span className='value'><img src={bid_icon} alt="Lower winning bid"/>{past_auction.lower_winning_bid} ETH <span className='dollar-val'> ~$41,594</span></span>
                               </div>
                           </div>
                            
                        </div>
                        <div hidden={shownActionId !== past_auction.id}className="auctions-tier">
                            <div className="tier">
                                <div className="header">
                                    <h3>{past_auction.platinumTier.name}</h3>
                                    <p>NFTs per winner: <b>{past_auction.platinumTier.nftsPerWinner}</b></p>
                                    <p>Winners: <b>{past_auction.platinumTier.winners}</b></p>
                                    <p>Total NFTs: <b>{past_auction.platinumTier.totalNFTs}</b></p>
                                </div>
                                <div className="tier-body">
                                    {past_auction.platinumTier.nfts.map((nft, index) => {
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
                                    <h3>{past_auction.goldTier.name}</h3>
                                    <p>NFTs per winner: <b>{past_auction.goldTier.nftsPerWinner}</b></p>
                                    <p>Winners: <b>{past_auction.goldTier.winners}</b></p>
                                    <p>Total NFTs: <b>{past_auction.goldTier.totalNFTs}</b></p>
                                </div>
                                <div className="tier-body">
                                    {past_auction.goldTier.nfts.map((nft, index) => {
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
                                    <h3>{past_auction.silverTier.name}</h3>
                                    <p>NFTs per winner: <b>{past_auction.silverTier.nftsPerWinner}</b></p>
                                    <p>Winners: <b>{past_auction.silverTier.winners}</b></p>
                                    <p>Total NFTs: <b>{past_auction.silverTier.totalNFTs}</b></p>
                                </div>
                                <div className="tier-body">
                                    {past_auction.silverTier.nfts.map((nft, index) => {
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
                                <Pagination data={PAST_ACTIONS_DATA} perPage={perPage} setOffset={setOffset} />
            </div>
        </div>
        
    )
}

export default PastAuctions;