import {Animated} from 'react-animated-css';
import Button from "../button/Button"
import arrowUp from '../../assets/images/Arrow_Up.svg'
import arrowDown from '../../assets/images/ArrowDown.svg'
import infoIconRed from '../../assets/images/Vector.svg'
import doneIcon from '../../assets/images/Completed.svg'
import searchIcon from '../../assets/images/search-icon.svg'
import emptyMark from '../../assets/images/emptyMark.svg'
import emptyWhite from '../../assets/images/emptyWhite.svg'
import {AUCTIONS_DATA} from '../../utils/fixtures/AuctionsDummyData'
import Input from '../input/Input'
import {FUTURE_ACTIONS_DATA} from '../../utils/fixtures/AuctionsDummyData'
import { useState } from "react"
import Moment from 'react-moment'
import moment from 'moment'
import '../pagination/Pagionation'
import Pagination from '../pagination/Pagionation'



const FutureAuctions = () => {

    const [hideLaunchIcon, setHideLaunchIcon] = useState(0)
    const [hideEndIcon, setHideEndIcon] = useState(true)
    const [shownActionId, setshownActionId] = useState(null)
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState(FUTURE_ACTIONS_DATA);
    const [perPage, setPerPage] = useState(10);
    const [searchByName, setSearchByName] = useState('');

    const handleRemove = (id) => {
            setData(data => data.filter(item => item.id !== id))
            console.log(data)
    }

    const handleSearch = (value) => {
        setSearchByName(value);
        }

    const clearInput = () =>{
            setSearchByName('')
        }
        

    return (
        <div className='future-auctions'>
            <div className='input-search'>
            <button onClick={clearInput} className="clear-input">Clear</button>
            <img src={searchIcon} alt='search'/>
            <Input className='searchInp'
            onChange={(e) => handleSearch(e.target.value)}
            value={searchByName}
            placeholder='Search by name'/>
            </div>
            {data.slice(offset,offset+perPage).filter(item => item.name.toLowerCase().includes(searchByName.toLowerCase())).map(future_auction => {
                return (
                    <div className="auction" key={future_auction.id}>
                        <div className="auction-header">
                            <h3>{future_auction.name}</h3>
                            <div className="launch-auction">
                                <Button className="light-button" disabled>Set up auction</Button>
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
                            <div className={"total-dates " + (moment(future_auction.launchDate).isBefore(moment.now()) ? 'dateError' : '')}>
                                <p onMouseOver={()=>setHideLaunchIcon(future_auction.id)} onMouseLeave={() => setHideLaunchIcon(0)}>Launch date: <b><Moment format="MMMM DD, hh:mm">{future_auction.launchDate}</Moment></b> 
                                {(moment(future_auction.launchDate).isBefore(moment.now()) &&
                                    <div className='launch__date__info'>
                                        {hideLaunchIcon === future_auction.id &&
                                        <Animated animationIn='zoomIn' style={{position: 'relative'}}>
                                            <div className="launch-info">Your launch date has already passed. Go to Edit Auction and adjust the launch and end dates.</div>
                                        </Animated>
                                        }
                                      <img src={infoIconRed} />
                                    </div>
                                  )}
                                </p>
                            </div>
                            <div className={"total-dates " + (moment(future_auction.endDate).isBefore(moment.now()) ? 'dateError' : '')}>
                                <p onMouseOver={() => setHideEndIcon(future_auction.id)} onMouseLeave={() => setHideEndIcon(0)}>End date: <b><Moment format="MMMM DD, hh:mm">{future_auction.endDate}</Moment></b> 
                                    {(moment(future_auction.endDate).isBefore(moment.now()) &&
                                        <div className="end__date__info">
                                            {hideEndIcon === future_auction.id &&
                                                <Animated animationIn='zoomIn' style={{position: 'relative'}}>
                                                    <div hidden={hideEndIcon === future_auction.id? false :true} className="end-info">Your launch and end date has already passed. Go to Edit Auction and adjust the launch and end dates.</div>
                                                </Animated>
                                            }
                                            <img src={infoIconRed} />
                                        </div>
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="auctions-steps">
                            <div className="step-1">
                                <h6>Step 1</h6>
                                <h4>Auction Set Up</h4>
                                <div className="circle">
                                    <img src={doneIcon}/>
                                    <div className="hz-line1"></div>
                                </div>
                                <Button className="light-border-button">Edit auction</Button>
                            </div>
                            <div className="step-2">
                                <h6>Step2</h6>
                                <h4>NFT Minting</h4>
                                <div className="circle">
                                    <img hidden={!future_auction.mint} src={doneIcon}/>
                                    <img hidden={future_auction.mint} src={emptyMark}/>
                                    <div className="hz-line2"></div>
                                </div>
                                {future_auction.mint === true ?
                                   <Button disabled className="light-button">Mint NFTs</Button> :
                                   <Button className="light-button">Mint NFTs</Button> 
                                }
                            </div>
                            <div className="step-3">
                                <h6>Step 3</h6>
                                <h4>Landing Page Customization</h4>
                                <div className="circle">
                                    {(!future_auction.landingCustom && !future_auction.mint) &&
                                        <img alt='landing_page' src={emptyWhite}/>
                                    }
                                    {(future_auction.mint && !future_auction.landingCustom) &&
                                        <img alt='landing_page' src={emptyMark}/>
                                    }
                                    {(future_auction.mint && future_auction.landingCustom) &&
                                        <img alt='landing_page' src={doneIcon}/>
                                    }
                                </div>
                                {(future_auction.mint === true && future_auction.landingCustom === false) ?
                                <Button className="light-border-button" >Set up landing page</Button> :
                                <Button className="light-border-button" disabled>Set up landing page</Button>
                                }
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
                            <Button className="light-border-button" onClick={() => handleRemove(future_auction.id)}>Remove</Button>
                        </div>
                    </div>
                )
            })}
            <div className='pagination__container'>
                                <Pagination data={data} perPage={perPage} setOffset={setOffset} />
            </div>
        </div>
        
    )
}

export default FutureAuctions;