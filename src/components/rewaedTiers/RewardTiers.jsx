import arrow from '../../assets/images/arrow.svg';
import union from '../../assets/images/Union.svg';
import icon from '../../assets/images/auction_icon.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import videoIcon from '../../assets/images/video-icon.svg';
import checkIcon from '../../assets/images/check.svg';
import arrowUp from '../../assets/images/Arrow_Up.svg'
import arrowDown from '../../assets/images/ArrowDown.svg'
import pencil from '../../assets/images/pencil.svg';
import Button from '../button/Button';
import { useLocation, useHistory } from 'react-router-dom';
import AppContext from '../../ContextAPI';
import { useEffect, useState, useContext} from 'react';

const RewardTiers = () =>{

const location = useLocation();
const history = useHistory();
const [shownActionId, setShownActionId] = useState(null)

const { auction,setAuction } = useContext(AppContext);
const tierId = location.state;
const tierById = auction.tiers.find((element) => element.id === tierId)

return (
    <div className='container reward-tiers'>
        <div className="back-rew" onClick={() => { history.push('/my-auctions') }}><img src={arrow} alt="back"/><span>My Auctions</span></div>
        <div>
        <div className='head-part'>
        <h2 className="tier-title">Reward Tiers</h2>
        <p>Reward Tiers are the NFT bundles that users are bidding for to win. There can be up to 10 tiers in one auction.</p>
        </div>
        {auction.tiers.length>0 &&
          auction.tiers.map((tier, index) => {
            return (
            <div className="view-tier">
                <div className="auction-header">
                        <div className="img_head">
                            <div className="img_head_title">
                                <img className='auctionIcon' src={icon} alt='auction'/>
                                <h3>{tier.name}</h3>
                            </div>
                            <div className="tier-winners">
                            <h4>Winners:&nbsp;<b>{tier.winners}</b></h4>
                            </div>
                            <div className="tier-perwinners">
                            <h4>NFTs per winner:&nbsp;<b>{tier.nftsPerWinner}</b></h4>
                            </div>
                            </div>
                            <div className="edit-show">
                            <div className="edit-btn">
                                <Button className="light-border-button" onClick={() => { history.push('/create-tiers',tier.id) }}>Edit <img src={pencil} alt="edit-icon"/></Button>
                            </div>
                             <div className="launch-auction">
                                 {shownActionId === tier.id ?
                                     <img src={arrowUp} onClick={() => setShownActionId(null)}/>
                                  :
                                     <img src={arrowDown} onClick={() => setShownActionId(tier.id)}/>
                            }  
                             </div>
                             </div>
                    </div>
                    <div hidden={shownActionId !== tier.id} className="auctions-tier">
                    <div className='rev-reward'>
                    {tier.nfts.map((nft, index) => {
                        return (
                            <div className="rev-reward__box">
                                <div className='rev-reward__box__image'>
                                    {nft.previewImage.type === 'video/mp4' &&
                                        <video onMouseOver={event => event.target.play()} onMouseOut={event => event.target.pause()}>
                                            <source src={URL.createObjectURL(nft.previewImage)} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    }
                                    {nft.previewImage.type === 'audio/mpeg' &&
                                        <img className="preview-image" src={mp3Icon} alt={nft.name} />
                                    }
                                    {nft.previewImage.type !== 'audio/mpeg' && nft.previewImage.type !== 'video/mp4' &&
                                        <img className="preview-image" src={URL.createObjectURL(nft.previewImage)} alt={nft.name} />
                                    }
                                    {nft.previewImage.type === 'video/mp4' &&
                                        <img className='video__icon' src={videoIcon} alt='Video Icon' />
                                    }
                                    {nft.selected &&
                                        <img className='check__icon' src={checkIcon} alt='Check Icon' />
                                    }
                                </div>
                                <div className='rev-reward__box__name'>
                                    <h3>{nft.name}</h3>
                                </div>
                                <div className='rev-reward__box__footer'>
                                    <div className='collection__details'>
                                        {nft.type === 'collection' &&
                                            <>
                                                {typeof nft.collectionAvatar === 'string' && nft.collectionAvatar.startsWith('#') ? 
                                                    <div className='random__bg__color' style={{ backgroundColor: nft.collectionAvatar }}>{nft.collectionName.charAt(0)}</div> :
                                                    <img src={URL.createObjectURL(nft.collectionAvatar)} alt={nft.collectionName} />
                                                }
                                                <span>{nft.collectionName}</span>
                                            </>
                                        }
                                    </div>
                                        <span className="ed-count">{`x${nft.generatedEditions.length}`}</span>    
                                </div>
                                {nft.generatedEditions.length > 1 &&
                                    <>
                                        <div className='rev-reward__box__highlight__one'></div>
                                        <div className='rev-reward__box__highlight__two'></div>
                                    </>
                                }
                            </div>
                             )
                         })}
                    </div> 
                    </div>
                </div>  
                )
          })
        }            
        <div className="create-rew-tier" onClick={() => { history.push('/create-tiers') }}>
                <div className="plus-icon">
                    <img src={union} alt="create"/>
                </div> 
                <div className="create-rew-text">
                    <p>Create  reward tier</p>
                </div>
            </div>
        </div>
    </div>
    )
}
export default RewardTiers;