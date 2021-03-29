import { useState, useEffect, useRef, useContext } from 'react';
import checkIcon from '../../assets/images/check.svg';
import editIcon from '../../assets/images/edit.svg';
import removeIcon from '../../assets/images/remove.svg';
import AppContext from '../../ContextAPI';

const SavedNFTs = () => {
    const { handleClickOutside, savedNfts, setSavedNfts } = useContext(AppContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [dropdownID, setDropdownID] = useState(0);
    const ref = useRef(null);

    const handleSavedNfts = (index) => {
        let newSavedNfts = [...savedNfts];
        newSavedNfts[index].selected = !newSavedNfts[index].selected;

        setSavedNfts(newSavedNfts);
    }

    const toggleSelection = () => {
        let newSavedNfts = [...savedNfts];
        newSavedNfts.map(nft => isChecked ? nft.selected = false : nft.selected = true);
    }

    useEffect(() => {
        document.addEventListener('click', (e) => handleClickOutside(e, 'three__dots', ref, setShowDropdown), true);
        return () => {
            document.removeEventListener('click', (e) => handleClickOutside(e, 'three__dots', ref, setShowDropdown), true);
        };
    })

    const handleEdit = (id) => {
        console.log(id)
    }

    const handleRemove = (id) => {
        setSavedNfts(savedNfts.filter(item => item.id !== id));
    }

    return (
        <div className='tab__saved__nfts'>
            {savedNfts.length ?
                <>
                    <div className='custom__checkbox'>
                        <label onClick={toggleSelection}>
                            <input type='checkbox' onChange={() => setIsChecked(!isChecked)} checked={isChecked} />
                            <i></i>
                            {isChecked ? 'Clear all' : 'Select all'}
                        </label>
                    </div>

                    <div className='saved__nfts__lists'>
                        {savedNfts.map((nft, index) => {
                            return (
                                <div className={`saved__nft__box ${nft.selected ? 'selected' : ''}`} key={nft.id}>
                                    <div className='saved__nft__box__image' onClick={() => handleSavedNfts(index)}>
                                        <img src={nft.bgImage} alt={nft.name} />
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
                                                    <li className='remove' onClick={() => handleRemove(nft.id)}>
                                                        <p>Remove</p>
                                                        <img src={removeIcon} alt='Remove Icon' />
                                                    </li>
                                                </ul>
                                            }
                                        </button>
                                    </div>
                                    {nft.type === 'collection' &&
                                        <>
                                            <div className='saved__nft__box__footer'>
                                                <div className='collection__details'>
                                                    <img src={nft.collectionAvatar} alt={nft.collectionName} />
                                                    <span>{nft.collectionName}</span>
                                                </div>
                                                <div className='collection__count'>{`x${nft.collectionCount}`}</div>
                                            </div>
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