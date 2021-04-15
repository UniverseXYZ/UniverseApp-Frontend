import { useRef, useState, useEffect,useContext } from 'react';
import Button from '../button/Button';
import Input from '../input/Input';
import defaultImage from '../../assets/images/default-img.svg';
import sizeDownIcon from '../../assets/images/size-down.svg'
import sizeUpIcon from '../../assets/images/size-up.svg'
import infoIcon from '../../assets/images/icon.svg';
import cloudIcon from '../../assets/images/ion_cloud.svg'
import delateIcon from '../../assets/images/inactive.svg'
import addIcon from '../../assets/images/Add.svg'
import mp3Icon from '../../assets/images/mp3-icon.png'
import arrow from '../../assets/images/arrow.svg';
import uuid from 'react-uuid';
import randomColor from 'randomcolor';
import AppContext from '../../ContextAPI';
import Popup from "reactjs-popup"
import { Animated } from 'react-animated-css';

const CreateNftCol = (props) => {

    const { savedNfts, setSavedNfts } = useContext(AppContext);
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
    const [hideIcon, setHideIcon] = useState(false);
    const [hideIcon1,setHideIcon1] = useState(false)
    const inputFile = useRef(null);

    const [properties, setProperties] = useState([{name:"", value:""}])
    const removeProperty = (index) => {
        let temp=[...properties]
        temp.splice(index,1)
        setProperties(temp)
    }

    const addProperty = () => {
        let prevProperties=[...properties]
        let temp={name:"", value:""}
        prevProperties.push(temp)
        setProperties(prevProperties)
    }

    const propertyChangesName = (index, name) => {
        let prevProperties=[...properties]
        prevProperties[index].name=name
        setProperties(prevProperties)
    }

    const propertyChangesValue = (index, value) => {
        let prevProperties=[...properties]
        prevProperties[index].value=value
        setProperties(prevProperties)
    }

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
            const getCollectionNFT = collectionNFTs.filter(item => item.id === collectionNFTsID);
            if (getCollectionNFT.length) {
                setName(getCollectionNFT[0].name);
                setDescription(getCollectionNFT[0].description);
                setEditions(getCollectionNFT[0].numberOfEditions);
                setPreviewImage(getCollectionNFT[0].previewImage);
            }
            const getSavedNFT = savedNfts.filter(item => item.id === collectionNFTsID);
            if (getSavedNFT.length) {
                setName(getSavedNFT[0].name);
                setDescription(getSavedNFT[0].description);
                setEditions(getSavedNFT[0].numberOfEditions);
                setPreviewImage(getSavedNFT[0].previewImage);
            }
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
                        id: uuid(),
                        type: 'collection',
                        collectionId: collectionName,
                        collectionName: collectionName,
                        collectionAvatar: coverImage || randomColor(),
                        previewImage: previewImage,
                        name: name,
                        description: description,
                        numberOfEditions: Number(editions),
                        generatedEditions: generatedEditions,
                        selected: false,
                    }])
                } else {
                    const getSavedNFT = savedNfts.filter(item => item.id === collectionNFTsID);
                    if (getSavedNFT.length) {
                        setSavedNfts(savedNfts.map(item => 
                            item.id === collectionNFTsID ?
                                {
                                    ...item,
                                    previewImage: previewImage,
                                    name: name,
                                    description: description,
                                    numberOfEditions: Number(editions),
                                    generatedEditions: generatedEditions,
                                }
                                : item
                        ))
                    } else {
                        var newSavedNFTs = [...savedNfts];
                        collectionNFTs.forEach(nft => {
                            if(nft.id === collectionNFTsID) {
                                newSavedNFTs.push({
                                    id: nft.id,
                                    type: 'collection',
                                    collectionId: nft.collectionId,
                                    collectionName: nft.collectionName,
                                    collectionAvatar: nft.collectionAvatar,
                                    previewImage: previewImage,
                                    name: name,
                                    description: description,
                                    numberOfEditions: Number(editions),
                                    generatedEditions: generatedEditions,
                                    selected: false,
                                })
                            } else {
                                newSavedNFTs.push({
                                    id: nft.id,
                                    type: 'collection',
                                    collectionId: nft.collectionId,
                                    collectionName: nft.collectionName,
                                    collectionAvatar: nft.collectionAvatar,
                                    previewImage: nft.previewImage,
                                    name: nft.name,
                                    description: nft.description,
                                    numberOfEditions: Number(nft.editions),
                                    generatedEditions: nft.generatedEditions,
                                    selected: false,
                                })
                            }
                        })
                        setSavedNfts(newSavedNFTs);
                    }
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
                            <div className="nft-coll-drop-file">
                                <img src={cloudIcon}/>
                                <h5>Drop your file here</h5>
                                <p>( min 800x800px, PNG/JPEG/GIF/WEBP/MP4, max 30mb)</p>
                                <Button className="light-border-button" onClick={() => inputFile.current.click()}>Choose file</Button>
                                <input type="file" className="inp-disable" ref={inputFile} onChange={(e) => validateFile(e.target.files[0])} />
                            </div>
                            <div className="nft-coll-preview">
                            <h5>Preview</h5>
                            <div className="nft-coll-picture">
                            {previewImage ? 
                                <Popup
                                    trigger={
                                        <div className='preview__image'>
                                            <img className='size__up' src={sizeUpIcon} alt='Size Up'/>
                                            {previewImage.type === 'video/mp4' &&
                                                <video>
                                                    <source src={URL.createObjectURL(previewImage)} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            }
                                            {previewImage.type === 'audio/mpeg' &&
                                                <img className="preview-image" src={mp3Icon} alt='Preview' />
                                            }
                                            {previewImage.type !== 'audio/mpeg' && previewImage.type !== 'video/mp4' &&
                                                <img className="preview-image" src={URL.createObjectURL(previewImage)} alt='Preview' />
                                            }
                                        </div>
                                    }
                                >
                                    {
                                        (close) => (
                                            <div className='preview__image__popup'>
                                                <img className='size__down' src={sizeDownIcon} onClick={close} alt='Size Down'/>
                                                {previewImage.type === 'video/mp4' &&
                                                    <video controls autoPlay>
                                                        <source src={URL.createObjectURL(previewImage)} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                }
                                                {previewImage.type === 'audio/mpeg' &&
                                                    <audio controls autoPlay>
                                                        <source src={URL.createObjectURL(previewImage)} type="audio/mpeg" />
                                                        Your browser does not support the audio element.
                                                    </audio>
                                                }
                                                {previewImage.type !== 'audio/mpeg' && previewImage.type !== 'video/mp4' &&
                                                    <img className="preview-image" src={URL.createObjectURL(previewImage)} alt='Preview' />
                                                }
                                            </div>
                                        )
                                    }
                                </Popup> :
                                <img className="default-image" src={defaultImage} alt='Cover' />}
                            </div>
                        </div>
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
                            <div className="nft-coll-editions-header">
                                <h5 onMouseOver={() => setHideIcon(true)}
                                    onMouseLeave={() => setHideIcon(false)} >Number of editions
                                    <img src={infoIcon} alt='Info Icon'/>
                                </h5>
                                {
                                    hideIcon &&
                                    <Animated animationIn="zoomIn">
                                        <div className="info-text">
                                            <p>Total amount of NFTs that will be distributed to the current revard tier winners</p>
                                        </div>
                                    </Animated>
                                }    
                            </div>
                            <Input className="inp" error={errors.edition} placeholder="Enter Number of Editions" onChange={validateEdition} value={editions} />
                        </div>
                        <div className="nft-coll-properties">
                            <div className="nft-coll-properties-header">
                                <h4 onMouseOver={() => setHideIcon1(true)} onMouseLeave={() => setHideIcon1(false)}>Properties (optional) <img src={infoIcon} alt='Info Icon' /></h4>
                                {
                                    hideIcon1 &&
                                    <Animated animationIn="zoomIn">
                                        <div className="properties-info-text">
                                            <p>Adding properties allows you to specify the character NFT traits, the goods NFT sizes, or any other details you would like to specify.</p>
                                        </div>
                                    </Animated>
                                }
                                
                            </div>
                            
                            {
                                properties.map((elm,i)=>{
                                    return <div className="properties" key={i}>
                                        <div className="property-name">
                                            <h5>Property name</h5>
                                            <Input className="inp" placeholder="Enter NFT property" value={properties[i].name} onChange={(e) => propertyChangesName(i, e.target.value)}/>
                                        </div>
                                        <div className="property-value">
                                            <h5>Value</h5>
                                            <Input className="inp" placeholder="Enter value" value={properties[i].value} onChange={(e) => propertyChangesValue(i, e.target.value)}/>
                                        </div>
                                        <img src={delateIcon} onClick={()=>removeProperty(i)}/>
                                        <Button className="light-border-button" onClick={()=>removeProperty(i)}>Remove</Button>
                                    </div>
                                })
                            }
                            <div className="property-add">
                                <h5><img src={addIcon} onClick={()=>addProperty()}/>Add Property</h5>
                            </div>
                        </div>
                        <div className="nft-coll-buttons">
                            {!collectionNFTsID ?
                                <>
                                    <Button className="light-button" onClick={handleAddToCollection}>Add to collection</Button>
                                    <Button className="light-border-button" onClick={handleAddAndCreateNew}>Add and create new</Button>
                                </> :
                                <Button className="light-button" onClick={handleAddToCollection}>Save Changes</Button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
export default CreateNftCol