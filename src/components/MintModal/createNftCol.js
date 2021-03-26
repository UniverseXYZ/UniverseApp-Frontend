// import Collection from '../../assets/images/Collection.svg';
// import Collection1 from '../../assets/images/Collection1.svg';
import Button from '../Button'
import Input from '../Input'
import defaultImage from '../../assets/images/default-image.png'
import infoIcon from '../../assets/images/icon.png'
import arrow from '../../assets/images/Arrow.png'
import { useRef, useState } from 'react'

const CreateNftCol = ({ onClick }) =>{

    const [hideIcon, setHideIcon] = useState(true)
    const [previewImage, setPreviewImage]=useState(null)
    const inputFile = useRef(null)

    return(
        <div className="mintNftCollection-div">
            <div className="back-nft" onClick={() => onClick(null)}><img src={arrow} alt="back"/><span>MINT NFT COLLECTION</span></div>
            <div className="nft-collectible">
                <h2 className="nft-coll-title">Create NFT Collectible</h2>
                <div className="nft-coll-content">
                    <div className="nft-coll-upload">
                        <h5>Upload file</h5>
                        <div className="nft-coll-upload-file">
                            <p>PNG, GIF, WEBP, MP4 or MP3. Max 30mb</p>
                            <Button className="light-border-button" onClick={()=>inputFile.current.click()}>CHOOSE FILE</Button>
                            <input type="file" className="inp-disable" ref={inputFile}
                                onChange={(e)=>setPreviewImage(e.target.files[0])}/>
                        </div>
                        <div className="nft-coll-name">
                            <h5>Name</h5>
                            <Input className="inp" placeholder="Enter NFT name" />
                        </div>
                        <div className="nft-coll-description">
                            <h5>Description (optional)</h5>
                            <textarea rows="5" placeholder="Example copy" className="inp"></textarea>
                        </div>
                        <div className="nft-coll-editions">
                            <h5>Number of editions <img onMouseOver={()=>setHideIcon(false)} 
                                    onMouseLeave={()=>setHideIcon(true)} 
                                    src={infoIcon}/>
                            </h5>
                            <div hidden={hideIcon} className="info-text">
                                <p>Total amount of NFTs that will be distributed to the current revard tier winners</p>
                            </div>
                            <Input className="inp" placeholder="Enter Number of Editions" />
                        </div>
                        <div className="nft-coll-buttons">
                            <Button className="light-button">ADD TO COLLECTION</Button>
                            <Button className="light-border-button">ADD AND CREATE NEW</Button>
                        </div>
                    </div>
                    <div className="nft-coll-preview">
                        <h5>Preview</h5>
                        <div className="nft-coll-picture">
                        {previewImage ? 
                                    <img className="preview-image" src={URL.createObjectURL(previewImage)} alt='Cover' />
                                :
                                    <img className="default-image" src={defaultImage} alt='Cover' />}
                        </div>
                    </div>  
                </div>
            </div>
        </div>
        )
    }
export default CreateNftCol