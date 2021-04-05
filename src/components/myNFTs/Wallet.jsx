import { useState, useEffect, useRef, useContext } from 'react';
import Lists from './Lists';
import '../pagination/Pagination.scss';
import ItemsPerPageDropdown from '../pagination/ItemsPerPageDropdown';
import Pagination from '../pagination/Pagionation';
import AppContext from '../../ContextAPI';
import uuid from 'react-uuid';

const Wallet = ({filteredNFTs, setFilteredNFTs}) => {
    const { handleClickOutside, myNFTs } = useContext(AppContext);
    const [isCollectionDropdownOpened, setIsCollectionDropdownOpened] = useState(false);
    const [searchByName, setSearchByName] = useState('');
    const [offset, setOffset] = useState(0);
    const [perPage, setPerPage] = useState(12);
    const ref = useRef(null);
    const [collections, setCollections] = useState([]);

    const handleCollections = (index) => {
        let newCollections = [...collections];
        newCollections[index].selected = !newCollections[index].selected;

        setCollections(newCollections);
    }
    
    const clearFilters = () => {
        let newCollections = [...collections];
        newCollections.map(collection => collection.selected = false)
        
        setCollections(newCollections);
        setSearchByName('');
    }

    const handleSearchByName = (value) => {
        setSearchByName(value);
    }

    useEffect(() => {
        const getCollections = myNFTs.filter(nft => nft.collectionName)
        const uniqueCollections = getCollections.filter((v,i,a) => a.findIndex( t => (t.collectionName === v.collectionName)) === i);
        var newCollections = [];
        uniqueCollections.forEach(collection => {
            newCollections.push({
                id: uuid(),
                name: collection.collectionName,
                avatar: collection.collectionAvatar,
                selected: false,
            })
        })
        setCollections(newCollections);
    }, [])

    useEffect(() => {
        const res = collections.filter(col => col.selected)
        if(res.length || searchByName) {
            var newFilteredNFTs = [];
            myNFTs.forEach(nft => {
                if(!searchByName && res.length) {
                    if(nft.type === 'collection') {
                        res.forEach(item => {
                            if(nft.collectionName === item.name) {
                                newFilteredNFTs.push(nft);
                            }
                        })
                    }
                } else if(!res.length && searchByName) {
                    if(nft.name.toLowerCase().includes(searchByName.toLowerCase())) {
                        newFilteredNFTs.push(nft);
                    }
                } else if(res.length && searchByName) {
                    res.forEach(item => {
                        if(nft.collectionName === item.name && nft.name.toLowerCase().includes(searchByName.toLowerCase())) {
                            newFilteredNFTs.push(nft);
                        }
                    })
                }
            });
            setFilteredNFTs(newFilteredNFTs);
        } else {
            setFilteredNFTs(myNFTs);
        }
    }, [collections, searchByName])
    
    useEffect(() => {
        document.addEventListener('click', (e) => handleClickOutside(e, 'target', ref, setIsCollectionDropdownOpened), true);
        return () => {
            document.removeEventListener('click', (e) => handleClickOutside(e, 'target', ref, setIsCollectionDropdownOpened), true);
        };
    })

    return (
        <div className='tab__wallet'>
            {myNFTs.length ?
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
                                    onChange={(e) => handleSearchByName(e.target.value)}
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
                                                    <img src={URL.createObjectURL(collection.avatar)} alt={collection.name} />
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
                                        <img src={URL.createObjectURL(collection.avatar)} alt={collection.name} />
                                    }
                                    <span>{collection.name}</span>
                                    <button title='Remove' onClick={() => handleCollections(index)}>&#10006;</button>
                                </div>
                            )
                        })}
                    </div>
                    {filteredNFTs.length ?
                        <>
                            <Lists data={filteredNFTs} perPage={perPage} offset={offset} />
                            
                            <div className='pagination__container'>
                                <Pagination data={filteredNFTs} perPage={perPage} setOffset={setOffset} />
                                <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
                            </div>
                        </> : 
                        <div className='empty__nfts'><h3>No NFTs found</h3></div>
                    }
                </> : <div className='empty__nfts'><h3>No NFTs found</h3></div>
            }

        </div>
    )
}

export default Wallet;