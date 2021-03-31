import Input from '../Input';
import Button from '../Button';
import arrow from '../../assets/images/Arrow.png';
import union from '../../assets/images/Union.svg';
import upload from '../../assets/images/Upload.png';
import RemovePopup from '../Popups/removeNftPopup';
import Popup from "reactjs-popup";
import editIcon from '../../assets/images/edit.svg';
import removeIcon from '../../assets/images/remove.svg';
import { useContext, useRef, useState, useEffect } from 'react';
import AppContext from '../../ContextAPI';
import CreateNftCol from './createNftCol';
import randomColor from 'randomcolor';
import testNFTImage from '../../assets/images/saved-nft1.png';

const MintNftCollection = ({ onClick }) => {
    
    const { setShowModal, savedCollections, setSavedCollections, savedNfts, setSavedNfts, savedCollectionID, setSavedCollectionID } = useContext(AppContext);
    
    const [collectionNFTs, setCollectionNFTs] = useState([]);
    const [collectionNFTsID, setCollectionNFTsID] = useState(null);

    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownID, setDropdownID] = useState(0);
    const [showCollectible, setShowCollectible] = useState(false);
    const [collectionName, setCollectionName] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const inputFile = useRef(null);
    const ref = useRef(null);

    const [errors, setErrors] = useState({
        collectionName: '',
    });

    const [saveForLateClick, setSaveForLateClick] = useState(false);

    const handleSaveForLater = () => {
        setSaveForLateClick(true);
        if (!collectionName) {
            setErrors({
                collectionName: '“Collection name” is not allowed to be empty',
            });
        } else {
            const collectionNameExists = savedCollections.filter(collection => collection.name.toLowerCase() === collectionName.toLowerCase());
            if (collectionNameExists.length && !savedCollectionID) {
                setErrors({
                    collectionName: '“Collection name” already exists',
                });
            } else {
                setErrors({
                    collectionName: '',
                });
            }
        }
    }

    const handleShowCollectible = () => {
        if (!collectionName) {
            setErrors({
                collectionName: '“Collection name” is not allowed to be empty',
            });
        } else {
            const collectionNameExists = savedCollections.filter(collection => collection.name.toLowerCase() === collectionName.toLowerCase());
            if (collectionNameExists.length && !savedCollectionID) {
                setErrors({
                    collectionName: '“Collection name” already exists',
                });
            } else {
                setErrors({
                    collectionName: '',
                });
                setShowCollectible(true);
            }
        }
    }

    const handleEdit = (id) => {
        document.body.classList.add('no__scroll');
        setCollectionNFTsID(id);
        setShowCollectible(true);
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

    useEffect(() => {
        if (savedCollectionID) {
            const res = savedCollections.filter(item => item.id === savedCollectionID);
            setCollectionName(res[0].name);
            setCoverImage(res[0].previewImage);
        }
    }, [])

    useEffect(() => {
        if (saveForLateClick) {
            if (!errors.collectionName) {
                if (!savedCollectionID) {
                    setSavedCollections([...savedCollections, {
                        id: savedCollections.length ? savedCollections[savedCollections.length - 1].id+1 : 1,
                        bgImage: coverImage ? testNFTImage : randomColor(), // This is just for testing, instead of testNFTImage, we should use coverImage, so it should be coverImage || randomColor()
                        previewImage: coverImage || randomColor(),
                        name: collectionName,
                        avatar: coverImage ? testNFTImage : randomColor(), // This is just for testing, instead of testNFTImage, we should use coverImage, so it should be coverImage || randomColor()
                    }])
                    if (collectionNFTs.length) {
                        collectionNFTs.map(nft => {
                            setSavedNfts([...savedNfts, nft])
                        })
                    }
                } else {
                    setSavedCollections(savedCollections.map(item => 
                        item.id === savedCollectionID ?
                            {
                                ...item,
                                bgImage: coverImage ? testNFTImage : randomColor(), // This is just for testing, instead of testNFTImage, we should use coverImage, so it should be coverImage || randomColor()
                                previewImage: coverImage || randomColor(),
                                name: collectionName,
                                avatar: coverImage ? testNFTImage : randomColor(), // This is just for testing, instead of testNFTImage, we should use coverImage, so it should be coverImage || randomColor()
                            }
                            : item
                    ))
                    setSavedCollectionID(null);
                }
                setShowModal(false);
                document.body.classList.remove('no__scroll');
            }
        }
    }, [errors])


    return !showCollectible ? (
        <div className="mintNftCollection-div">
            <div className="back-nft" onClick={() => onClick(null)}><img src={arrow} alt="back"/><span>Create NFT</span></div>
            <h2>{!savedCollectionID ? 'Create NFT Collection' : 'Edit NFT Collection'}</h2>
            <div className="name-image">
            <Input label="Collection Name" className="inp" error={errors.collectionName} placeholder="Enter the Collection Name" onChange={(e) => setCollectionName(e.target.value)} value={collectionName} />

            <div className="input-cover">
            <p>Cover Image</p>
                <div className="inp-picture">
                    {coverImage && typeof coverImage === 'object' ?
                        <div className='cover-preview'>
                            <img className="cover-img" src={URL.createObjectURL(coverImage)} alt='Cover' />
                            <div onClick={() => inputFile.current.click()}>
                                <img className="upload-img" src={upload} alt='Upload Icon' />
                            </div>
                        </div> :
                        <div className="icon-div" onClick={() => inputFile.current.click()}>
                            <img className="upload-img" src={upload} alt='Upload Icon' />
                        </div>
                    }
                </div>
                <input type="file" hidden className="inp-disable" ref={inputFile} onChange={(e)=>setCoverImage(e.target.files[0])} />
            </div>
            </div>
            <div className='collection__nfts'>
                {collectionNFTs.length ?
                    collectionNFTs.map((nft, index) => {
                        return (
                            <div className={`saved__nft__box`} key={nft.id}>
                                <div className='saved__nft__box__image'>
                                    <img src={URL.createObjectURL(nft.previewImage)} alt={nft.name} />
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
                                                                removeFrom={'collection'}
                                                                collectionNFTs={collectionNFTs}
                                                                setCollectionNFTs={setCollectionNFTs}
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
                    }) : <></>
                }
                <div className="create-col" onClick={handleShowCollectible}>
                    <div className="plus-icon">
                        <img src={union} alt="create"/>
                    </div> 
                    <div className="collection-t">
                        <p>Create NFT collectible</p>
                    </div>
                </div>
            </div>
            <p className="error-message"></p>
            <div className="collection-buttons">
                <Button className="light-button">mint now</Button>
                <Button className="light-border-button" onClick={handleSaveForLater}>save for later</Button>
            </div>
        </div>     
    ) : (
        <CreateNftCol
            setShowCollectible={setShowCollectible}
            collectionName={collectionName}
            coverImage={coverImage}
            collectionNFTs={collectionNFTs}
            setCollectionNFTs={setCollectionNFTs}
            collectionNFTsID={collectionNFTsID}
            setCollectionNFTsID={setCollectionNFTsID}
        />
    )
}

export default MintNftCollection;
