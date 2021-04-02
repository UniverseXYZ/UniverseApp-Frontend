import arrow from '../../assets/images/arrow.svg'
import infoIcon from '../../assets/images/icon.svg'
import defaultImage from '../../assets/images/default-img.svg'
import testNFTImage from '../../assets/images/saved-nft1.svg';
import Button from '../button/Button'
import Input from '../input/Input'
import { useRef, useState, useEffect, useContext } from 'react'
import AppContext from '../../ContextAPI'
import uuid from 'react-uuid'

const MintSingleNft = ({ onClick }) => {
    
    const { savedNfts, setSavedNfts, setShowModal, savedNFTsID } = useContext(AppContext);

    const [errors, setErrors] = useState({
        name: '',
        edition: '',
        previewImage: '',
    });

    const [saveForLateClick, setSaveForLateClick] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [editions, setEditions] = useState(1);
    const [previewImage, setPreviewImage] = useState(null);
    const [hideIcon, setHideIcon] = useState(true);
    const inputFile = useRef(null);


    const handleSaveForLater = () => {
        setSaveForLateClick(true);
        setErrors({
            name: !name ? '“Name” is not allowed to be empty' : '',
            edition: !editions ? '“Number of editions” is required' : '',
            previewImage: !previewImage ? '“File” is required' : null,
        });
    }

    const validateFile = (file) => {
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
                setShowModal(false);
                var generatedEditions = [];

                for(let i = 0; i < editions; i++) {
                    generatedEditions.push(uuid().split('-')[0]);
                }
                if (!savedNFTsID) {
                    setSavedNfts([...savedNfts, {
                        id: uuid(),
                        bgImage: testNFTImage, // This is just for testing
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
                            { ...item, bgImage: testNFTImage, name: name, description: description, numberOfEditions: editions, generatedEditions: generatedEditions, }
                            : item
                    ))
                }
            }
        }
    }, [errors, saveForLateClick, savedNfts])

    return (
    <div className="mintNftCollection-div">
        <div className="back-nft" onClick={() => onClick(null)}><img src={arrow} alt="back"/><span>Create NFT</span></div>
        <h2 className="single-nft-title">Create Single NFT</h2>
        <div className="single-nft-content">
            <div className="single-nft-upload">
                <h5>Upload file</h5>
                <div className="single-nft-upload-file">
                    <p>PNG, GIF, WEBP, MP4 or MP3. Max 30mb</p>
                    <Button className="light-border-button" onClick={() => inputFile.current.click()}>CHOOSE FILE</Button>
                    <input type="file" className="inp-disable" ref={inputFile} onChange={(e) => validateFile(e.target.files[0])} />
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
                        <p>NFTs are minted to our auction contract by default. Turn the toggle on if you want them to be minted to your wallet instead</p>
                    </div>    
                    <Input className='inp' error={errors.edition} placeholder="Enter Number of Editions" onChange={validateEdition} value={editions} />
                </div>
                <div className="single-nft-buttons">
                    <Button className="light-button">MINT NOW</Button>
                    <Button className="light-border-button" onClick={handleSaveForLater}>SAVE FOR LATER</Button>
                </div>
            </div>
            <div className="single-nft-preview">
                <h5>Preview</h5>
                <div className="single-nft-picture">
                {previewImage ? 
                    <img className="preview-image" src={URL.createObjectURL(previewImage)} alt='Preview' />
                    :
                    <img className="default-image" src={defaultImage} alt='Preview' />}
                </div>
            </div>
        </div>
    </div>
    )
}

export default MintSingleNft;