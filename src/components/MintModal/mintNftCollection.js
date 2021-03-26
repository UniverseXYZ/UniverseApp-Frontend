import Input from '../Input';
import Button from '../Button';
import arrow from '../../assets/images/Arrow.png';
import union from '../../assets/images/Union.svg';
import upload from '../../assets/images/Upload.png';
import { useRef, useState } from 'react';

const MintNftCollection = ({ onClick, collections }) =>{

const [coverImage, setCoverImage] = useState(null)
const inputFile = useRef(null)
console.log(inputFile.current)

return(
<div className="mintNftCollection-div">
    <div className="back-nft" onClick={() => onClick(null)}><img src={arrow} alt="back"/><span>MINT NFT</span></div>
    <h2>Mint NFT Collection</h2>
    <div className="name-image">
    <Input label="Collection Name" className="inp" placeholder="Enter the Collection Name"></Input>

    <div className="input-cover">
    <p>Cover Image</p>
        <div className="inp-picture">
            {coverImage ? 	
                <img className="cover-img" src={URL.createObjectURL(coverImage)} alt='Cover' />  :
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
        <Button className="light-border-button">save for later</Button>
    </div>
    <div className="collection-t">
        <p>Create NFT collectible</p>
    </div>
    </div>     
)
}
export default MintNftCollection
