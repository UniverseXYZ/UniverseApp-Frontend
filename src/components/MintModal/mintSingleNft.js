import arrow from '../../assets/images/Arrow.png'
import infoIcon from '../../assets/images/icon.png'
import defaultImage from '../../assets/images/default-image.png'
import Button from '../Button'
import Input from '../Input'
import { useRef, useState } from 'react'

const MintSingleNft = ({onClick}) => {

    const [hideIcon, setHideIcon] = useState(true)
    const [previewImage, setPreviewImage]=useState(null)
    const inputFile = useRef(null)

    return (
    <div className="mintNftCollection-div">
        <div className="back-nft" onClick={() => onClick(null)}><img src={arrow} alt="back"/><span>MINT NFT</span></div>
        <h2 className="single-nft-title">Mint Single NFT</h2>
        <div className="single-nft-content">
            <div className="single-nft-upload">
                <h5>Upload file</h5>
                <div className="single-nft-upload-file">
                    <p>PNG, GIF, WEBP, MP4 or MP3. Max 30mb</p>
                    <Button className="light-border-button" onClick={()=>inputFile.current.click()}>CHOOSE FILE</Button>
                    <input type="file" className="inp-disable" ref={inputFile}
                        onChange={(e)=>setPreviewImage(e.target.files[0])}/>
                </div>
                <div className="single-nft-name">
                    <h5>Name</h5>
                    <Input className="inp" placeholder="Enter NFT name" />
                </div>
                <div className="single-nft-description">
                    <h5>Description (optional)</h5>
                    <textarea rows="5" placeholder="Example copy" className="inp"></textarea>
                </div>
                <div className="single-nft-editions">
                    <h5>Number of editions <img src={infoIcon} onMouseOver={()=>setHideIcon(false)}
                    onMouseLeave={()=>setHideIcon(true)}/></h5>
                    <div hidden={hideIcon} className="info-text">
                        <p>NFTs are minted to our auction contract by default. Turn the toggle on if you want them to be minted to your wallet instead</p>
                    </div>    
                    <Input className="inp" placeholder="Enter Number of Editions" />
                </div>
                <div className="single-nft-buttons">
                    <Button className="light-button">MINT NOW</Button>
                    <Button className="light-border-button">SAVE FOR LATER</Button>
                </div>
            </div>
            <div className="single-nft-preview">
                <h5>Preview</h5>
                <div className="single-nft-picture">
                {previewImage ? 
                    <img className="preview-image" src={URL.createObjectURL(previewImage)} alt='Cover' />
                    :
                    <img className="default-image" src={defaultImage} alt='Cover' />}
                </div>
            </div>
        </div>
    </div>
    )
}

export default MintSingleNft;