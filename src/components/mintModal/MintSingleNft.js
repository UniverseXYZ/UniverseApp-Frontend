import arrow from '../../assets/images/arrow.svg'
import infoIcon from '../../assets/images/icon.svg'
import defaultImage from '../../assets/images/default-img.svg'
import sizeDownIcon from '../../assets/images/size-down.svg'
import sizeUpIcon from '../../assets/images/size-up.svg'
import delateIcon from '../../assets/images/inactive.svg'
import mp3Icon from '../../assets/images/mp3-icon.png'
import addIcon from '../../assets/images/Add.svg'
import cloudIcon from '../../assets/images/ion_cloud.svg'
import Button from '../button/Button'
import Input from '../input/Input'
import { useRef, useState, useEffect, useContext } from 'react'
import AppContext from '../../ContextAPI'
import uuid from 'react-uuid'
import Popup from "reactjs-popup"
import LoadingPopup from '../popups/LoadingPopup'
import CongratsPopup from '../popups/CongratsPopup'

const MintSingleNft = ({ onClick }) => {
    
    const { savedNfts, setSavedNfts, setShowModal, savedNFTsID, myNFTs, setMyNFTs } = useContext(AppContext);

    const [errors, setErrors] = useState({
        name: '',
        edition: '',
        previewImage: '',
    });

    const [saveForLateClick, setSaveForLateClick] = useState(false);
    const [mintNowClick, setMintNowClick] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [editions, setEditions] = useState(1);
    const [previewImage, setPreviewImage] = useState(null);
    const [hideIcon, setHideIcon] = useState(true);
    const [hideIcon1,setHideIcon1] = useState(true)
    const inputFile = useRef(null);


    const handleSaveForLater = () => {
        setMintNowClick(false);
        setSaveForLateClick(true);
        setErrors({
            name: !name ? '“Name” is not allowed to be empty' : '',
            edition: !editions ? '“Number of editions” is required' : '',
            previewImage: !previewImage ? '“File” is required' : null,
        });
    }

    const handleMinting = () => {
        setSaveForLateClick(false);
        setMintNowClick(true);
        setErrors({
            name: !name ? '“Name” is not allowed to be empty' : '',
            edition: !editions ? '“Number of editions” is required' : '',
            previewImage: !previewImage ? '“File” is required' : null,
        });
    }

    const validateFile = (file) => {
        setSaveForLateClick(false);
        setMintNowClick(false);
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
        if (savedNFTsID) {
            const res = savedNfts.filter(item => item.id === savedNFTsID);
            setName(res[0].name);
            setDescription(res[0].description);
            setEditions(res[0].numberOfEditions);
            setPreviewImage(res[0].previewImage);
        }
    }, [])

    useEffect(() => {
        if (saveForLateClick) {
            if (!errors.name && !errors.edition && !errors.previewImage) {
                var generatedEditions = [];
                
                for(let i = 0; i < editions; i++) {
                    generatedEditions.push(uuid().split('-')[0]);
                }
                if (!savedNFTsID) {
                    setSavedNfts([...savedNfts, {
                        id: uuid(),
                        previewImage: previewImage,
                        name: name,
                        description: description,
                        numberOfEditions: editions,
                        generatedEditions: generatedEditions,
                        type: 'single',
                        selected: false,
                    }])
                } else {
                    setSavedNfts(savedNfts.map(item => 
                        item.id === savedNFTsID ?
                        { ...item, previewImage: previewImage, name: name, description: description, numberOfEditions: editions, generatedEditions: generatedEditions, }
                        : item
                        ))
                }
                setShowModal(false);
                document.body.classList.remove('no__scroll');
            }
        }
        if (mintNowClick) {
            if (!errors.name && !errors.edition && !errors.previewImage) {
                document.getElementById('loading-hidden-btn').click();
                setTimeout(() => {
                    document.getElementById('popup-root').remove();
                    document.getElementById('congrats-hidden-btn').click();
                    setTimeout(() => {
                        var mintingGeneratedEditions = [];
                        
                        for(let i = 0; i < editions; i++) {
                            mintingGeneratedEditions.push(uuid().split('-')[0]);
                        }
                        setMyNFTs([...myNFTs, {
                            id: uuid(),
                            type: 'single',
                            previewImage: previewImage,
                            name: name,
                            description: description,
                            numberOfEditions: Number(editions),
                            generatedEditions: mintingGeneratedEditions,
                        }])
                        setShowModal(false);
                        document.body.classList.remove('no__scroll');
                    }, 2000)
                }, 3000)
            }
        }
    }, [errors, saveForLateClick, savedNfts])

    return (
    <div className="mintNftCollection-div">
        <Popup
            trigger={<button id='loading-hidden-btn' style={{ display: 'none' }}></button>}
        >
            {
                (close) => (
                    <LoadingPopup onClose={close} />
                )
            }
        </Popup>
        <Popup
            trigger={<button id='congrats-hidden-btn' style={{ display: 'none' }}></button>}
        >
            {
                (close) => (
                    <CongratsPopup onClose={close} />
                )
            }
        </Popup>
        <div className="back-nft" onClick={() => onClick(null)}><img src={arrow} alt="back"/><span>Create NFT</span></div>
        <h2 className="single-nft-title">{!savedNFTsID ? 'Create Single NFT' : 'Edit NFT'}</h2>
        <div className="single-nft-content">
            <div className="single-nft-upload">
                <h5>Upload file</h5>
                <div className="single-nft-upload-file">
                    <div className="single-nft-drop-file">
                        <img src={cloudIcon}/>
                        <h5>Drop your file here</h5>
                        <p>( min 800x800px, PNG/JPEG/GIF/WEBP/MP4, max 30mb)</p>
                        <Button className="light-border-button" onClick={() => inputFile.current.click()}>Choose file</Button>
                        <input type="file" className="inp-disable" ref={inputFile} onChange={(e) => validateFile(e.target.files[0])} />
                    </div>
                    <div className="single-nft-preview">
                        <h5>Preview</h5>
                        <div className="single-nft-picture">
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
                            <img className="default-image" src={defaultImage} alt='Preview' />}
                        </div>
                    </div> 

                </div>
            </div>
            {errors.previewImage && <p className="error-message">{errors.previewImage}</p>}
            <div className="single-nft-name">
                <h5>Name</h5>
                <Input className='inp' error={errors.name} placeholder="Enter NFT name" onChange={(e) => setName(e.target.value)} value={name} />                
            </div>
            <div className="single-nft-description">
                <h5>Description (optional)</h5>
                <textarea rows="5" placeholder="Example copy" className="inp" onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
            </div>
            <div className="single-nft-editions">
                <h5>Number of editions
                    <img src={infoIcon} alt='Info Icon' onMouseOver={() => setHideIcon(false)} onMouseLeave={() => setHideIcon(true)} />
                </h5>
                <div hidden={hideIcon} className="info-text">
                    <p>NFTs are minted to our auction contract by default. Turn the toggle on if you want them to be minted to your wallet instead.</p>                    
                </div>    
                <Input className='inp' error={errors.edition} placeholder="Enter Number of Editions" onChange={validateEdition} value={editions} />
            </div>
            <div className="single-nft-properties">
                <h4>Properties (optional) <img src={infoIcon} alt='Info Icon' onMouseOver={() => setHideIcon1(false)} onMouseLeave={() => setHideIcon1(true)}/></h4>
                <div hidden={hideIcon1} className="properties-info-text">
                    <p>Adding properties allows you to specify the character NFT traits, the goods NFT sizes, or any other details you would like to specify.</p>
                </div>
                <div className="properties">
                    <div className="property-name">
                        <h5>Property name</h5>
                        <Input className="inp" placeholder="Enter NFT property" />
                    </div>
                    <div className="property-value">
                        <h5>Value</h5>
                        <Input className="inp" placeholder="Enter value" />
                    </div>
                    <img src={delateIcon}/>
                    <Button className="light-border-button">Remove</Button>
                </div>
                <div className="property-add">
                    <h5><img src={addIcon} />Add Property</h5>
                </div>
            </div>
            <div className="single-nft-buttons">
                {!savedNFTsID ?
                    <>
                        <Button className="light-button" onClick={handleMinting}>Mint now</Button>
                        <Button className="light-border-button" onClick={handleSaveForLater}>Save for later</Button>
                    </> :
                    <Button className="light-button" onClick={handleSaveForLater}>Save changes</Button>
                }
            </div>
            
        </div>
    </div>
    )
}

export default MintSingleNft;