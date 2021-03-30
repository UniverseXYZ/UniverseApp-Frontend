import Input from '../Input';
import Button from '../Button';
import arrow from '../../assets/images/Arrow.png';
import union from '../../assets/images/Union.svg';
import upload from '../../assets/images/Upload.png';
import RemovePopup from '../Popups/removeNftPopup';  
import { useContext, useRef, useState, useEffect } from 'react';
import AppContext from '../../ContextAPI';

const MintNftCollection = ({ onClick, onClose, collections }) => {
    
    const { savedNfts, setSavedNfts, setShowModal } = useContext(AppContext);

    const [collectionName, setCollectionName] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const inputFile = useRef(null);

    const [errors, setErrors] = useState({
        collectionName: '',
    });

    const [saveForLateClick, setSaveForLateClick] = useState(false);

    const handleSaveForLater = () => {
        setSaveForLateClick(true);
        setErrors({
            collectionName: !collectionName ? '“Collection name” is not allowed to be empty' : '',
        });
    }

    useEffect(() => {
        if (saveForLateClick) {
            if (!errors.collectionName) {
                setShowModal(false);
                // setSavedNfts([...savedNfts, {
                //     id: uuid(),
                //     bgImage: testNFTImage, // This is just for testing
                //     previewImage: previewImage,
                //     name: name,
                //     description: description,
                //     numberOfEditions: editions,
                //     generatedEditions: generatedEditions,
                //     type: 'single',
                //     selected: false,
                // }])
            }
        }
    }, [errors, saveForLateClick, savedNfts])


    return (
        <div className="mintNftCollection-div">
            <div className="back-nft" onClick={() => onClick(null)}><img src={arrow} alt="back"/><span>Create NFT</span></div>
            <h2>Create NFT Collection</h2>
            <div className="name-image">
            <Input label="Collection Name" className="inp" error={errors.collectionName} placeholder="Enter the Collection Name" onChange={(e) => setCollectionName(e.target.value)} value={collectionName} />

            <div className="input-cover">
            <p>Cover Image</p>
                <div className="inp-picture">
                    {coverImage ?
                        <div className='cover-preview'>
                            <img className="cover-img" src={URL.createObjectURL(coverImage)} alt='Cover' />
                            <div onClick={ () => inputFile.current.click()}>
                                <img className="upload-img" src={upload} alt='Upload Icon' />
                            </div>
                        </div> :
                        <div className="icon-div" onClick={()=>inputFile.current.click()}>
                            <img className="upload-img" src={upload} alt='Upload Icon' />
                        </div>
                    }
                </div>
                <input type="file" hidden className="inp-disable" ref={inputFile} onChange={(e)=>setCoverImage(e.target.files[0])} />
            </div>
            </div> 
            <div  className="create-col">
                <div className="plus-icon" onClick={() => onClick('create-col')}>
                    <img src={union} alt="create"/>
                </div> 
                <p className="error-message"></p>
            </div>
            <div className="collection-buttons">
                <Button className="light-button">mint now</Button>
                <Button className="light-border-button" onClick={handleSaveForLater}>save for later</Button>
            </div>
            <div className="collection-t">
                <p>Create NFT collectible</p>
            </div>
        </div>     
    )
}

export default MintNftCollection;
