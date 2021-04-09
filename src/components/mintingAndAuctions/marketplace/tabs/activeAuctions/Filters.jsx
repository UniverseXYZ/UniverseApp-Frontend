import {useContext, useState, useEffect, useRef} from 'react'
import arrowDown from '../../../../../assets/images/arrow-down.svg';
import searchIcon from '../../../../../assets/images/search.svg';
import AppContext from '../../../../../ContextAPI';

const ActiveAuctionsFilters = () => {
    const { handleClickOutside } = useContext(AppContext);
    const [isDropdownOpened, setIsDropdownOpened] = useState(false);
    const [selectedItem, setSelectedItem] = useState('Newest');
    const [search, setSearch] = useState('');
    const ref = useRef(null);

    useEffect(() => {
        document.addEventListener('click', (e) => handleClickOutside(e, 'dropdown', ref, setIsDropdownOpened), true);
        return () => {
            document.removeEventListener('click', (e) => handleClickOutside(e, 'dropdown', ref, setIsDropdownOpened), true);
        };
    })

    return (
        <div className='active__auctions__filters'>
            <div className='active__auctions__filters__head'>
                <h1 className='title'>Filters</h1>
                <button>Clear all</button>
            </div>
            <div className='active__auctions__filters__fields'>
                <div className={`dropdown ${isDropdownOpened ? 'opened' : ''}`} onClick={() => setIsDropdownOpened(!isDropdownOpened)}>
                    <span className='selected__item'>{selectedItem}</span>
                    <img className='chevron__down' src={arrowDown} alt='Arrow' />
                    {isDropdownOpened &&
                        <ul ref={ref}>
                            <li onClick={() => { setSelectedItem('Newest'); setIsDropdownOpened(false) }}>Newest</li>
                            <li onClick={() => { setSelectedItem('Highest bid'); setIsDropdownOpened(false) }}>Highest bid</li>
                        </ul>
                    }
                </div>
                <div className='search'>
                    <input type='text' placeholder='Search auctions by name or artist' value={search} onChange={(e) => setSearch(e.target.value)} />
                    <img src={searchIcon} alt='Search' />
                </div>
            </div>
        </div>
    )
}

export default ActiveAuctionsFilters;