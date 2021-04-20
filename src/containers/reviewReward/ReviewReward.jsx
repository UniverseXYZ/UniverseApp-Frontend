import './ReviewReward.scss';
import arrow from '../../assets/images/arrow.svg';
import { useHistory, useLocation } from 'react-router-dom';
import AppContext from '../../ContextAPI';
import { useEffect, useState, useContext,useRef} from 'react';
import Button from '../../components/button/Button';
import pencil from '../../assets/images/pencil.svg';
import infoIcon from '../../assets/images/icon.svg';
import { Animated } from 'react-animated-css';
import checkIcon from '../../assets/images/check.svg';
import editIcon from '../../assets/images/edit.svg';
import removeIcon from '../../assets/images/remove.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import videoIcon from '../../assets/images/video-icon.svg';



const ReviewReward = () => {
    const location = useLocation();
    const history = useHistory();
    const { auction,setAuction } = useContext(AppContext);
    const [hideIcon, setHideIcon] = useState(false);

    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownID, setDropdownID] = useState(0);
    const ref = useRef(null);
    const [review, setReview] = useState(location.state);
    const handleEdit = (id) => {
        document.body.classList.add('no__scroll');
        
    }

    const handleRemove = (id) => {
        // document.body.classList.add('no__scroll');
        console.log(id)
        setReview(review => review.filter(item => item.id !== id))     
    }

    useEffect(() => {
        console.log(auction)
        console.log(review)

    })
    return (
        <div className='container reviw-reward'>
            <div className="back-rew" onClick={() => { history.push('/select-nfts') }}><img src={arrow} alt="back"/><span>Select NFTs</span></div>
            <div>
            <div className='head-part'>
            <h2 className="tier-title">Review Reward Tier</h2>
            <Button className="light-border-button" onClick={() => { history.push('/create-tiers') }}>Edit <img src={pencil} alt="edit"/></Button>
            </div>
            <div className='tier-inf'>
                <div className="tName">
                    <p>Tier name</p>
                    <span>{auction.tier.name}</span>
                </div>
                <div className="numberWinn">
                    <p>Number of winners</p>
                    <span>{auction.tier.winners}</span>
                </div>
                <div className="perWin">
                <p>NFTs per winner</p>
                <span>{auction.tier.nftsPerWinner}</span>
                </div>
            </div>
                <div className="totalNft">
                { hideIcon &&
                                <Animated animationIn="zoomIn" style={{position: 'relative'}}>
                                    <div className="info-text">
                                        <p>Total amount of NFTs that will be distributed to the current reward tier winners.</p>
                                    </div>
                                </Animated>
                            }
                <p>Total NFTs:&nbsp;<b>{auction.tier.totalNFTs}</b>
                <img onMouseOver={() => setHideIcon(true)} onMouseLeave={() => setHideIcon(false)} src={infoIcon} alt="total"/>
                </p>
                </div>
            </div>

            <div className='rev-reward'>
                        {review.map((nft, index) => {
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
                                        <button className='three__dots' onClick={() => { setShowDropdown(!showDropdown); setDropdownID(nft.id); }}>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            {(dropdownID === nft.id && showDropdown) &&
                                                <ul ref={ref} className='edit__remove'>
                                                    <li className='edit' onClick={() => handleEdit(nft.id)}>
                                                        <p>Edit</p>
                                                        <img src={editIcon} alt='Edit' />
                                                    </li>
                                                    <li className='remove' onClick={() => handleRemove(nft.id)}>
                                                        <p>Remove</p>
                                                        <img src={removeIcon} alt='Remove' />
                                                    </li>
                                                </ul>
                                            }
                                        </button>
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
                    <div className="create-btn">
                    {review.length>0 ?
                        <Button className="light-button">Create tier</Button> :
                        <Button className="light-button" disabled>Create tier</Button>
                    }
                    </div>
        </div>
    )}
export default ReviewReward;