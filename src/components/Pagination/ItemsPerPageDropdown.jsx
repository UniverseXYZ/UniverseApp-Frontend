import arrowDownIcon from '../../assets/images/arrow-down.svg';
import { useState, useEffect, useRef } from 'react';

const ItemsPerPageDropdown = ({perPage, setPerPage}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const itemsPerPage = [8, 12, 24, 48, 96];
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (!event.target.classList.contains('items__per__page')) {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    })

    return (
        <div className='items__per__page'>
            <label>Items per page</label>
            <button ref={ref} onClick={() => setShowDropdown(!showDropdown)}>
                <span>{perPage}</span>
                <img src={arrowDownIcon} alt='Chevron' className={showDropdown ? 'rotate' : ''} />
                {showDropdown &&
                    <ul className='items__per__page__dropdown'>
                        {itemsPerPage.map((n, index) => {
                            return (
                                <li key={index} className={perPage === n ? 'active' : ''} onClick={() => setPerPage(n)}>{n}</li>
                            )
                        })}
                    </ul>
                }
            </button>
        </div>
    )
}

export default ItemsPerPageDropdown;