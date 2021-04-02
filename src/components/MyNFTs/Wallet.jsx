import { useState, useEffect, useRef, useContext } from 'react';
import testCollectionAvatar from '../../assets/images/test-collection-avatar.svg';
import Lists from './Lists';
import '../pagination/Pagination.scss';
import ItemsPerPageDropdown from '../pagination/ItemsPerPageDropdown';
import Pagination from '../pagination/Pagionation';
import AppContext from '../../ContextAPI';

const Wallet = ({ data }) => {
    const { handleClickOutside } = useContext(AppContext);
    const [isCollectionDropdownOpened, setIsCollectionDropdownOpened] = useState(false);
    const [offset, setOffset] = useState(0);
    const [perPage, setPerPage] = useState(12);
    const ref = useRef(null);
    const [collections, setCollections] = useState([
        {
            id: 1,
            name: 'Crazy Collection',
            avatar: testCollectionAvatar,
            selected: false,
        },
        {
            id: 2,
            name: 'HashMasks',
            avatar: testCollectionAvatar,
            selected: false,
        },
        {
            id: 3,
            name: 'PixaLyfe',
            avatar: testCollectionAvatar,
            selected: false,
        },
        {
            id: 4,
            name: 'Mooncat Rescue',
            avatar: testCollectionAvatar,
            selected: false,
        },
        {
            id: 5,
            name: 'CryptoKitties',
            avatar: testCollectionAvatar,
            selected: false,
        },
        {
            id: 6,
            name: 'Mooncat Rescue',
            avatar: testCollectionAvatar,
            selected: false,
        },
        {
            id: 7,
            name: 'Mooncat Rescue',
            avatar: testCollectionAvatar,
            selected: false,
        },
        {
            id: 8,
            name: 'HashMasks',
            avatar: testCollectionAvatar,
            selected: false,
        },
        {
            id: 9,
            name: 'PixaLyfe',
            avatar: testCollectionAvatar,
            selected: false,
        },
        {
            id: 10,
            name: 'Mooncat Rescue',
            avatar: testCollectionAvatar,
            selected: false,
        },
    ]);

    useEffect(() => {
        document.addEventListener('click', (e) => handleClickOutside(e, 'target', ref, setIsCollectionDropdownOpened), true);
        return () => {
            document.removeEventListener('click', (e) => handleClickOutside(e, 'target', ref, setIsCollectionDropdownOpened), true);
        };
    })

    const handleCollections = (index) => {
        let newCollections = [...collections];
        newCollections[index].selected = !newCollections[index].selected;

        setCollections(newCollections);
    }

    const clearFilters = () => {
        let newCollections = [...collections];
        newCollections.map(collection => collection.selected = false)

        setCollections(newCollections);
    }

    return (
        <div className='tab__wallet'>

            <div className='filtration'>
                <div className='filter__by__collection'>
                    <div className='filter__by__collection__label'>
                        <label>Filter by collection</label>
                        <button onClick={clearFilters}>Clear all</button>
                    </div>
                    <div className='filter__by__collection__input'>
                        <input
                            className={`target ${isCollectionDropdownOpened ? 'focused' : ''}`}
                            type='text'
                            placeholder='Browse collections...'
                            onFocus={() => setIsCollectionDropdownOpened(true)}
                        />
                    </div>
                </div>
                <div className='search__by__name'>
                    <div className='search__by__name__label'>
                        <label>Seach by name</label>
                    </div>
                    <div className='search__by__name__input'>
                        <input
                            type='text'
                            placeholder='Start typing'
                        />
                    </div>
                </div>
                {isCollectionDropdownOpened &&
                    <div ref={ref} className='collections__dropdown'>
                        {collections.map((collection, index) => {
                            return (
                                <button key={collection.id} className={collection.selected ? 'selected' : ''} onClick={() => handleCollections(index)}>
                                    <img src={collection.avatar} alt={collection.name} />
                                    <span>{collection.name}</span>
                                </button>
                            )
                        })}
                    </div>
                }
            </div>

            <div className='selected__filters'>
                {collections.map((collection, index) => {
                    return collection.selected && (
                        <div key={collection.id}>
                            <img src={collection.avatar} alt={collection.name} />
                            <span>{collection.name}</span>
                            <button title='Remove' onClick={() => handleCollections(index)}>&#10006;</button>
                        </div>
                    )
                })}
            </div>

            <Lists data={data} perPage={perPage} offset={offset} />

            <div className='pagination__container'>
                <Pagination data={data} perPage={perPage} setOffset={setOffset} />
                <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
            </div>

        </div>
    )
}

export default Wallet;