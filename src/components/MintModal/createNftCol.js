import { useRef, useState, useEffect } from 'react';
import Button from '../Button';
import Input from '../Input';
import defaultImage from '../../assets/images/default-image.png';
import infoIcon from '../../assets/images/icon.png';
import arrow from '../../assets/images/Arrow.png';
import testNFTImage from '../../assets/images/saved-nft1.png';
import uuid from 'react-uuid';
import randomColor from 'randomcolor';

const CreateNftCol = (props) => {

    const { setShowCollectible, collectionName, coverImage, collectionNFTs, setCollectionNFTs, collectionNFTsID, setCollectionNFTsID } = props;

    const [errors, setErrors] = useState({
        name: '',
        edition: '',
        previewImage: '',
    });

    const [addToCollectionClick, setAddToCollectionClick] = useState(false);
    const [addAndCreateNewClick, setAddAndCreateNewClick] = useState(false);
    const [clicked, setClicked] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [editions, setEditions] = useState(1);
    const [previewImage, setPreviewImage] = useState(null);
    const [hideIcon, setHideIcon] = useState(true);
    const inputFile = useRef(null);

    const handleAddToCollection = () => {
        setClicked(true);
        setAddAndCreateNewClick(false);
        setAddToCollectionClick(true);
        setErrors({
            name: !name ? '“Name” is not allowed to be empty' : '',
            edition: !editions ? '“Number of editions” is required' : '',
            previewImage: !previewImage ? '“File” is required' : null,
        });
    }

    const handleAddAndCreateNew = () => {
        setClicked(true);
        setAddToCollectionClick(false);
        setAddAndCreateNewClick(true);
        setErrors({
            name: !name ? '“Name” is not allowed to be empty' : '',
            edition: !editions ? '“Number of editions” is required' : '',
            previewImage: !previewImage ? '“File” is required' : null,
        });
    }

    const handleSaveChanges = () => {
        setClicked(true);
        setAddAndCreateNewClick(false);
        setAddToCollectionClick(true);
        setErrors({
            name: !name ? '“Name” is not allowed to be empty' : '',
            edition: !editions ? '“Number of editions” is required' : '',
            previewImage: !previewImage ? '“File” is required' : null,
        });
    }

    const validateFile = (file) => {
        setClicked(false);
        if (!file) {
            setPreviewImage(null);
            setErrors({...errors, previewImage: 'File format must be PNG, GIF, WEBP, MP4 or MP3 (Max Size: 30mb)'});
        } else {
            if ((
                file.type === "audio/mpeg" ||
                file.type === "video/mp4" ||
                file.type === "image/webp" ||
                file.type === "image/gif" ||
                file.type === "image/png") &&
                file.size / 1048576 < 30) {
                setPreviewImage(file);
                setErrors({...errors, previewImage: ''});
            } else {
                setPreviewImage(null);
                setErrors({...errors, previewImage: 'File format must be PNG, GIF, WEBP, MP4 or MP3 (Max Size: 30mb)'});
            }
        }
    }

    const validateEdition = (e) => {
        const value = e.target.value.replace(/[^\d]/,''); 
        if (parseInt(value) !== 0) {
            setEditions(value)
        }
    }

    useEffect(() => {
        if (collectionNFTsID) {
            const res = collectionNFTs.filter(item => item.id === collectionNFTsID);
            setName(res[0].name);
            setDescription(res[0].description);
            setEditions(res[0].numberOfEditions);
            setPreviewImage(res[0].previewImage);
        }
    }, [])

    useEffect(() => {
        if (clicked) {
            if (!errors.name && !errors.edition && !errors.previewImage) {
                var generatedEditions = [];

                for(let i = 0; i < editions; i++) {
                    generatedEditions.push(uuid().split('-')[0]);
                }
                if (!collectionNFTsID) {
                    setCollectionNFTs([...collectionNFTs, {
                        id: collectionNFTs.length ? collectionNFTs[collectionNFTs.length - 1].id+1 : 1,
                        type: 'collection',
                        collectionId: collectionName,
                        collectionName: collectionName,
                        collectionAvatar: coverImage || randomColor(),
                        bgImage: testNFTImage, // This is just for testing
                        previewImage: previewImage,
                        name: name,
                        description: description,
                        numberOfEditions: Number(editions),
                        generatedEditions: generatedEditions,
                        selected: false,
                    }])
                } else {
                    setCollectionNFTs(collectionNFTs.map(item => 
                        item.id === collectionNFTsID ?
                            {
                                ...item,
                                bgImage: testNFTImage, // This is just for testing
                                previewImage: previewImage,
                                name: name,
                                description: description,
                                numberOfEditions: Number(editions),
                                generatedEditions: generatedEditions,
                            }
                            : item
                    ))
                    setCollectionNFTsID(null);
                }
                if (addToCollectionClick) {
                    setShowCollectible(false);
                }
                if (addAndCreateNewClick) {
                    setName('');
                    setDescription('');
                    setEditions(1);
                    setPreviewImage(null);
                }
                setClicked(false);
            }
        }
    }, [errors])

    return(
        <div className="mintNftCollection-div">
            <div className="back-nft" onClick={() => { setShowCollectible(false); setCollectionNFTsID(null); }}><img src={arrow} alt="back"/><span>Create NFT COLLECTION</span></div>
            <div className="nft-collectible">
                <h2 className="nft-coll-title">{!collectionNFTsID ? 'Create NFT Collectible' : 'Edit NFT Collectible'}</h2>
                <div className="nft-coll-content">
                    <div className="nft-coll-upload">
                        <h5>Upload file</h5>
                        <div className="nft-coll-upload-file">
                            <p>PNG, GIF, WEBP, MP4 or MP3. Max 30mb</p>
                            <Button className="light-border-button" onClick={() => inputFile.current.click()}>CHOOSE FILE</Button>
                            <input type="file" className="inp-disable" ref={inputFile} onChange={(e) => validateFile(e.target.files[0])} />
                        </div>
                        {errors.previewImage && <p className="error-message">{errors.previewImage}</p>}
                        <div className="nft-coll-name">
                            <h5>Name</h5>
                            <Input className="inp" error={errors.name} placeholder="Enter NFT name" onChange={(e) => setName(e.target.value)} value={name} />
                        </div>
                        <div className="nft-coll-description">
                            <h5>Description (optional)</h5>
                            <textarea rows="5" placeholder="Example copy" className="inp" onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
                        </div>
                        <div className="nft-coll-editions">
                            <h5>Number of editions
                                <img onMouseOver={() => setHideIcon(false)}
                                    onMouseLeave={() => setHideIcon(true)} 
                                    src={infoIcon} alt='Info Icon'
                                />
                            </h5>
                            <div hidden={hideIcon} className="info-text">
                                <p>Total amount of NFTs that will be distributed to the current revard tier winners</p>
                            </div>
                            <Input className="inp" error={errors.edition} placeholder="Enter Number of Editions" onChange={validateEdition} value={editions} />
                        </div>
                        <div className="nft-coll-buttons">
                            {!collectionNFTsID ?
                                <>
                                    <Button className="light-button" onClick={handleAddToCollection}>ADD TO COLLECTION</Button>
                                    <Button className="light-border-button" onClick={handleAddAndCreateNew}>ADD AND CREATE NEW</Button>
                                </> :
                                <Button className="light-button" onClick={handleSaveChanges}>Save Changes</Button>
                            }
                        </div>
                    </div>
                    <div className="nft-coll-preview">
                        <h5>Preview</h5>
                        <div className="nft-coll-picture">
                        {previewImage ? 
                            <img className="preview-image" src={URL.createObjectURL(previewImage)} alt='Cover' /> :
                            <img className="default-image" src={defaultImage} alt='Cover' />}
                        </div>
                    </div>  
                </div>
            </div>
        </div>
        )
    }
export default CreateNftCol