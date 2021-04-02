import { useState, useEffect, useRef, useContext } from 'react';
import checkIcon from '../../assets/images/check.svg';
import editIcon from '../../assets/images/edit.svg';
import removeIcon from '../../assets/images/remove.svg';
import AppContext from '../../ContextAPI';
import Popup from "reactjs-popup";
import RemovePopup from '../popups/RemoveNftPopup';
import uuid from 'react-uuid';

const SavedNFTs = () => {
    const { savedNfts, setSavedNfts, setActiveView, setShowModal, setSavedNFTsID, selectAllIsChecked, setSelectAllIsChecked } = useContext(AppContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownID, setDropdownID] = useState(0);
    const ref = useRef(null);

    const handleSavedNfts = (index) => {
        let newSavedNfts = [...savedNfts];
        newSavedNfts[index].selected = !newSavedNfts[index].selected;

        setSavedNfts(newSavedNfts);
    }

    const toggleSelection = () => {
        setSelectAllIsChecked(!selectAllIsChecked);

        let newSavedNfts = [...savedNfts];
        newSavedNfts.map(nft => nft.selected = !nft.selected);
        setSavedNfts(newSavedNfts);
    }

    const handleClickOutside = (event) => {
        if (!event.target.classList.contains('three__dots')) {
            if (ref.current && !ref.current.contains(event.target)) {
                if (document.getElementById('popup-root')) {
                    if (!document.getElementById('popup-root').hasChildNodes()) {    
                        setShowDropdown(false);
                    }
                } else {
                    setShowDropdown(false);
                }
            }
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    })

    const handleEdit = (id) => {
        document.body.classList.add('no__scroll');
        setSavedNFTsID(id);
        setActiveView('single');
        setShowModal(true);
    }

    return (
        <div className='tab__saved__nfts'>
            {savedNfts.length ?
                <>
                    <div className='custom__checkbox'>
                        <label>
                            <input type='checkbox' onChange={toggleSelection} checked={selectAllIsChecked} />
                            <i></i>
                            {selectAllIsChecked ? 'Clear all' : 'Select all'}
                        </label>
                    </div>

                    <div className='saved__nfts__lists'>
                        {savedNfts.map((nft, index) => {
                            return (
                                <div className={`saved__nft__box ${nft.selected ? 'selected' : ''}`} key={uuid()}>
                                    <div className='saved__nft__box__image' onClick={() => handleSavedNfts(index)}>
                                        <img src={URL.createObjectURL(nft.previewImage)} alt={nft.name} />
                                        {nft.selected &&
                                            <img className='check__icon' src={checkIcon} alt='Check Icon' />
                                        }
                                    </div>
                                    <div className='saved__nft__box__name'>
                                        <h3>{nft.name}</h3>
                                        <button className='three__dots' onClick={() => { setShowDropdown(!showDropdown); setDropdownID(nft.id); }}>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            {(dropdownID === nft.id && showDropdown) &&
                                                <ul ref={ref} className='edit__remove'>
                                                    <li className='edit' onClick={() => handleEdit(nft.id)}>
                                                        <p>Edit</p>
                                                        <img src={editIcon} alt='Edit Icon' />
                                                    </li>
                                                    <Popup
                                                        trigger={
                                                            <li className='remove'>
                                                                <p>Remove</p>
                                                                <img src={removeIcon} alt='Remove Icon' />
                                                            </li>
                                                        }
                                                    >
                                                        {
                                                            (close) => (
                                                                <RemovePopup
                                                                    close={close}
                                                                    nftID={nft.id}
                                                                    removedItemName={nft.name}
                                                                    removeFrom={'saved'}
                                                                />
                                                            )
                                                        }
                                                    </Popup>
                                                </ul>
                                            }
                                        </button>
                                    </div>
                                    <div className='saved__nft__box__footer'>
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
                                        {nft.generatedEditions.length > 1 ?
                                            <div className='collection__count'>{`x${nft.generatedEditions.length}`}</div> :
                                            <p className='collection__count'>{`#${nft.generatedEditions[0]}`}</p>
                                        }
                                    </div>
                                    {nft.generatedEditions.length > 1 &&
                                        <>
                                            <div className='saved__nft__box__highlight__one'></div>
                                            <div className='saved__nft__box__highlight__two'></div>
                                        </>
                                    }
                                </div>
                            )
                        })}
                    </div>
                </> : <div className='empty__nfts'><h3>No Saved NFTs found</h3></div>
            }
        </div>
    )
}

export default SavedNFTs;