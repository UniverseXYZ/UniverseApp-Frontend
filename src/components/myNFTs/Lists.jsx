import { useEffect, useState, useContext} from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import AppContext from '../../ContextAPI';
import mp3Icon from '../../assets/images/mp3-icon.png';
import videoIcon from '../../assets/images/video-icon.svg';
import checkIcon from '../../assets/images/check.svg';
import nonSelecting from '../../assets/images/nonSelecting.svg';


const Lists = ({ data, perPage, offset }) => {
    const sliceData = data.slice(offset, offset + perPage);

    const location = useLocation();
    const isCreatingAction = location.pathname === '/select-nfts'; 

    const { auction, setAuction, selectedNFTIds, setSelectedNFTIds } = useContext(AppContext);

    const [openEditions, setOpenEditions] = useState(null);
    const [selected, Setselected] = useState([]);
    const [data1, setData] = useState([]);

    const handleSavedNfts = (clickedNFT) => {
        if (isCreatingAction && auction.tier.winners < clickedNFT.generatedEditions.length) {
            if (auction.tier.nftsPerWinner > selectedNFTIds.length || selectedNFTIds.includes(clickedNFT.id))
            setSelectedNFTIds((prevValue) => {
                const nftIndex = prevValue.findIndex((nft) => nft === clickedNFT.id);
                if (nftIndex !== -1) {
                    return [...prevValue.slice(0, nftIndex), ...prevValue.slice(nftIndex +1)]
                } else {
                    return [...prevValue, clickedNFT.id]
                }
            })
            
        }
    }
    const handleShow = (nft) =>{
        if(selectedNFTIds.includes(nft.id) && auction.tier.winners <= nft.generatedEditions.length){
            setOpenEditions(openEditions ? null : nft.id)
        }
    }

    useEffect(() => {
      console.log(auction)
      console.log(selectedNFTIds)
    }, [])

    return (
        <div className='nfts__lists'>
            {sliceData.map((nft, index) => {
                return (
                    <div  className={`nft__box ${selectedNFTIds.includes(nft.id) ? 'selected' : ''} ${(auction.tier.winners > nft.generatedEditions.length) || (auction.tier.nftsPerWinner == selectedNFTIds.length && !selectedNFTIds.includes(nft.id)) ? 'disabled' : ''}`} key={nft.id} >                      
                        <div className='nft__box__image' onClick={() => handleSavedNfts(nft)}>
                        {isCreatingAction &&
                        <>
                        {selectedNFTIds.includes(nft.id) && auction.tier.winners <= nft.generatedEditions.length &&
                            <><img className='check__icon' src={checkIcon} alt='Check Icon'/> <span className="selected-number">0/{auction.tier.winners}</span> </>
                        }
                        {auction.tier.winners > nft.generatedEditions.length &&
                            <img className='nonicon__icon' src={nonSelecting} alt='Check Icon' />
                        }
                        </>
                        }
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
                        </div>                         
                        <div className='nft__box__name'>
                            <h3>{nft.name}</h3>
                            {nft.type === 'single' || (nft.type === 'collection' && isCreatingAction) ?
                                nft.generatedEditions.length > 1 ?
                                    <div className='collection__count'>
                                        {isCreatingAction &&
                                        <>
                                        <button type="button" className="editions-btn button" onClick={() => handleShow(nft)} >Edition #</button>  
                                             <ul className="editions-list" hidden={openEditions !== nft.id}>
                                                <li disabled >Choose edition number</li>
                                                  {nft.generatedEditions.map(edition => {
                                                   return (
                                                <li  key={edition}>
                                                 <label className="edition-container">{`#${edition}`}
                                                    <input type="checkbox" id={edition} />
                                                    <span className="checkmark"></span>
                                                 </label>
                                                </li>
                                                 )
                                                })}
                                            </ul>
                                                </>}
                                        {nft.type === 'single' &&        
                                        <div className="ed-num">
                                        {`x${nft.generatedEditions.length}`}
                                        </div>
                                        }   
                                        {!( selectedNFTIds.includes(nft.id) && auction.tier.winners <= nft.generatedEditions.length) &&
                                        <div className='generatedEditions' style={{ gridTemplateColumns: `repeat(${Math.ceil(nft.generatedEditions.length/10)}, auto)` }}>
                                            {nft.generatedEditions.map(edition => {
                                                return (
                                                    <div key={edition}>{`#${edition}`}</div>
                                                )
                                            })}
                                        </div>
                                        }
                                    </div> :
                                <p className='collection__count'>{`#${nft.generatedEditions[0]}`}</p> : <></>
                            }
                        </div>
                        <div className='nft__box__footer'>
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
                            {nft.type === 'collection' ?
                                nft.generatedEditions.length > 1 ?
                                    <div className='collection__count'>
                                        {`x${nft.generatedEditions.length}`}
                                        <div className='generatedEditions' style={{ gridTemplateColumns: `repeat(${Math.ceil(nft.generatedEditions.length/10)}, auto)` }}>
                                            {nft.generatedEditions.map(edition => {
                                                return (
                                                    <div key={edition}>{`#${edition}`}</div>
                                                )
                                            })}
                                        </div>
                                    </div> :
                                <p className='collection__count'>{`#${nft.generatedEditions[0]}`}</p> : <></>
                            }
                        </div>
                        {nft.generatedEditions.length > 1 &&
                            <>
                                <div className='nft__box__highlight__one'></div>
                                <div className='nft__box__highlight__two'></div>
                            </>
                        }
                    </div>
                )
            })}
        </div>
    )
}

Lists.propTypes = {
    data: PropTypes.array,
    perPage: PropTypes.number,
    offset: PropTypes.number,
}

export default Lists;