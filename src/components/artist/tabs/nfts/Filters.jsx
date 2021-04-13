import { useState, useRef, useEffect, useContext } from 'react';
import testCollectionAvatar from '../../../../assets/images/test-collection-avatar.svg';
import AppContext from '../../../../ContextAPI';

const NFTsFilters = () => {
    const { handleClickOutside } = useContext(AppContext);
    const [isCollectionDropdownOpened, setIsCollectionDropdownOpened] = useState(false);
    const [searchByName, setSearchByName] = useState('');
    const ref = useRef(null);
    const [collections, setCollections] = useState([
        {
            id: 1,
            name: 'Collection1',
            avatar: testCollectionAvatar,
            selected: false,
        },
        {
            id: 2,
            name: 'Collection2',
            avatar: testCollectionAvatar,
            selected: false,
        },
    ]);

    const clearFilters = () => {
        let newCollections = [...collections];
        newCollections.map(collection => collection.selected = false)
        
        setCollections(newCollections);
        setSearchByName('');
    }

    const handleCollections = (index) => {
        let newCollections = [...collections];
        newCollections[index].selected = !newCollections[index].selected;

        setCollections(newCollections);
    }

    useEffect(() => {
        document.addEventListener('click', (e) => handleClickOutside(e, 'target', ref, setIsCollectionDropdownOpened), true);
        return () => {
            document.removeEventListener('click', (e) => handleClickOutside(e, 'target', ref, setIsCollectionDropdownOpened), true);
        };
    })

    return (
        <>
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
                            value={searchByName}
                            onChange={(e) => setSearchByName(e.target.value)}
                        />
                    </div>
                </div>
                {isCollectionDropdownOpened &&
                    <div ref={ref} className='collections__dropdown'>
                        {collections.length ? 
                            collections.map((collection, index) => {
                                return (
                                    <button key={collection.id} className={collection.selected ? 'selected' : ''} onClick={() => handleCollections(index)}>
                                        {typeof collection.avatar === 'string' && collection.avatar.startsWith('#') ? 
                                            <div className='random__bg__color' style={{ backgroundColor: collection.avatar }}>{collection.name.charAt(0)}</div> :
                                            <img src={collection.avatar} alt={collection.name} />
                                        }
                                        <span>{collection.name}</span>
                                    </button>
                                )
                            }) : <div className='empty__nfts'><h3>No Collections found</h3></div>
                        }
                    </div>
                }
            </div>
            <div className='selected__filters'>
                {collections.map((collection, index) => {
                    return collection.selected && (
                        <div key={collection.id}>
                            {typeof collection.avatar === 'string' && collection.avatar.startsWith('#') ? 
                                <div className='random__bg__color' style={{ backgroundColor: collection.avatar }}>{collection.name.charAt(0)}</div> :
                                <img src={collection.avatar} alt={collection.name} />
                            }
                            <span>{collection.name}</span>
                            <button title='Remove' onClick={() => handleCollections(index)}>&#10006;</button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default NFTsFilters;
