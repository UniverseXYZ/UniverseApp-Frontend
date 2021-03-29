import {useState, useEffect, useContext, useRef} from 'react'
import AppContext from '../../ContextAPI';
import editIcon from '../../assets/images/edit.svg';
import removeIcon from '../../assets/images/remove.svg';

const SavedCollections = () => {
    const { handleClickOutside, savedCollections } = useContext(AppContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownID, setDropdownID] = useState(0);
    const ref = useRef(null);

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
        console.log(id)
    }

    return (
        <div className='tab__saved__collections'>
            {savedCollections.length ? 
                <div className='saved__collections__lists'>
                    {savedCollections.map(collection => {
                        return (
                            <div className='saved__collection__box' key={collection.id}>
                                <div className='saved__collection__box__header'>
                                    {!collection.bgImage.startsWith('#') ? 
                                        <img src={collection.bgImage} alt={collection.name} /> :
                                        <div className='random__bg__color' style={{ backgroundColor: collection.bgImage }}></div>
                                    }
                                </div>
                                <div className='saved__collection__box__body'>
                                    {!collection.avatar.startsWith('#') ? 
                                        <img className='collection__avatar' src={collection.avatar} alt={collection.name} /> :
                                        <div className='random__avatar__color' style={{ backgroundColor: collection.bgImage }}>{collection.name.charAt(0)}</div>
                                    }
                                    <h3 className='collection__name'>{collection.name}</h3>
                                    <button className='three__dots' onClick={() => { setShowDropdown(!showDropdown); setDropdownID(collection.id); }}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        {(dropdownID === collection.id && showDropdown) &&
                                            <ul ref={ref} className='edit__remove'>
                                                <li className='edit' onClick={() => handleEdit(collection.id)}>
                                                    <p>Edit</p>
                                                    <img src={editIcon} alt='Edit Icon' />
                                                </li>
                                                <li className='remove' onClick={() => handleRemove(collection.id)}>
                                                    <p>Remove</p>
                                                    <img src={removeIcon} alt='Remove Icon' />
                                                </li>
                                            </ul>
                                        }
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div> : <div className='empty__nfts'><h3>No Saved Collections found</h3></div>
            }
        </div>
    )
}

export default SavedCollections;