import './my-account.scss';
import Button from '../Button'
import Input from '../Input'
import pencilIcon from '../../assets/images/pencil.png';
import defaultImage from '../../assets/images/default-image.png'
import { useRef, useState } from 'react';

const MyAccount = () => {

    const [displayName, setDisplayName] = useState({buttonName:"EDIT", buttonStyle:"light-border-button", inputStyle:"inp-disable", textHide:false, nameHide:true, imgHide:false})
    const [websiteLink, setWebsiteLink] = useState({buttonName:"EDIT", buttonStyle:"light-border-button", inputStyle:"inp-disable", hide:false, textHide:false})

    const [accountName, setAccountName] = useState("")
    const [linkName, setLinkName] = useState("")
    const [coverImage, setCoverImage] = useState(null)

    const inputFile = useRef(null)

    const changeDisplay = () =>{
        if (displayName.buttonName === "EDIT") {
            setDisplayName({buttonName:"SAVE", buttonStyle:"light-button", inputStyle:"inp-light-border", textHide:true, nameHide:true, imgHide:true})
        }
        else if (accountName.length > 0) {
            setDisplayName({buttonName:"EDIT", buttonStyle:"light-border-button", inputStyle:"inp-disable", textHide:true, nameHide:false, imgHide:false})
        }
        else {
            setDisplayName({buttonName:"EDIT", buttonStyle:"light-border-button", inputStyle:"inp-disable", textHide:false, nameHide:true, imgHide:false})
        }
    }

    const changeWebsiteLink = () =>{
        if (websiteLink.buttonName === "EDIT") {
            setWebsiteLink({buttonName:"SAVE", buttonStyle:"light-button", inputStyle:"inp-light-border", hide:true, textHide:true})
            if (linkName.length === 0) {
                setLinkName("universe.xyz/")
            }
            else{
                setLinkName("universe.xyz/"+linkName)
            }
        }
        else if(linkName.length >= 14) {
            setWebsiteLink({buttonName:"EDIT", buttonStyle:"light-border-button", inputStyle:"inp-disable", hide:false, textHide:true})
            setLinkName(linkName.substring(13))
        }
        else {
            setWebsiteLink({buttonName:"EDIT", buttonStyle:"light-border-button", inputStyle:"inp-disable", hide:false, textHide:false})
            setLinkName("")
        }
    }

    return (
        <div className="container my-account">
            <h1 className="my-account-title">My account</h1>
            <p className="my-account-description">You can set preffered display name, create your branded profile URL and manage other personal settings</p>

            <div className="account-grid-container">
                <div className="account-name">
                    <div className="account-grid-name">
                        <h5>Display name</h5>
                    </div>
                    <div className="account-grid-input">
                        <Input className={displayName.inputStyle} type="text" value={accountName} onChange={(e)=>setAccountName(e.target.value)}></Input>
                        <p hidden={displayName.textHide} className="account-name-default-text">Enter your display name</p>
                        <p hidden={displayName.nameHide} className="account-profile-name">{accountName}</p>
                    </div>
                    <div className="account-grid-button">
                        <Button className={displayName.buttonStyle} onClick={()=>changeDisplay()} >{displayName.buttonName}
                        <img hidden={displayName.imgHide} src={pencilIcon} alt='Edit Icon' /></Button>
                    </div>
                </div>

                <div className="account-cover-image">
                    <div className="account-grid-name">
                        <h5>Cover image</h5>
                    </div>
                    <div className="account-grid-input cover">
                        <div className="account-picture">
                            {coverImage ? 
                                <img className="cover-img" src={URL.createObjectURL(coverImage)} alt='Cover' />
                            :
                                <img className="default-img" src={defaultImage} alt='Cover' />}
                        </div>
                        <p>We recommend an image of a least 400x400px. Gifs works too</p>
                        <input type="file" className="inp-disable" ref={inputFile} onChange={(e)=>setCoverImage(e.target.files[0])}></input>
                    </div>
                    <div className="account-grid-button">
                        <Button className="light-border-button" onClick={()=>inputFile.current.click()}>CHOOSE FILE</Button>
                    </div>
                </div>

                <div className="account-website-link">
                    <div className="account-grid-name">
                        <h5>Universe website link</h5>
                    </div>
                    <div className="account-grid-input">
                        <Input type="text" className={websiteLink.inputStyle} value={linkName} onChange={(e)=>setLinkName(e.target.value)}></Input>
                        <h5 hidden={websiteLink.hide}>universe.xyz/</h5>
                        <p className="link-default-text" hidden={websiteLink.textHide}>your_brand</p>
                        <p className="link-account-text" hidden={websiteLink.hide}>{linkName}</p>
                    </div>
                    <div className="account-grid-button">
                        <Button className={websiteLink.buttonStyle} onClick={()=>changeWebsiteLink()}>{websiteLink.buttonName}
                        <img hidden={websiteLink.hide} src={pencilIcon} alt='Edit Icon' /></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyAccount;