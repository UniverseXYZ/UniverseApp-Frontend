import './my-account.scss';
import Button from '../Button'
import Input from '../Input'
import pencilIcon from '../../assets/images/pencil.png';
import defaultImage from '../../assets/images/default-image.png'
import { useState } from 'react';

const MyAccount = () => {

    const [displayName, setDisplayName] = useState({buttonName:"EDIT", buttonStyle:"light-border-button", inputStyle:"inp-disable", textHide:false, nameHide:true, imgHide:false})
    const [websiteLink, setWebsiteLink] = useState({buttonName:"EDIT", buttonStyle:"light-border-button", inputStyle:"inp-disable", hide:false, textHide:false})

    const [accountName, setAccountName] = useState("")
    const [linkName, setLinkName] = useState("")
    const changeDisplay = () =>{
        if (displayName.buttonName == "EDIT") {
            // setDisplayName(previousDisplayName => ({ ...previousDisplayName,  buttonName:"SAVE" }))
            setDisplayName({buttonName:"SAVE", buttonStyle:"light-button", inputStyle:"inp-light-border", textHide:true, nameHide:true, imjHide:true})
            // setAccountName("")
        }
        else if(accountName.length > 0) {
            setDisplayName({buttonName:"EDIT", buttonStyle:"light-border-button", inputStyle:"inp-disable", textHide:true, nameHide:false, imgHide:false})
        }
    }

    const changeWebsiteLink = () =>{
        if (websiteLink.buttonName == "EDIT") {
            setWebsiteLink({buttonName:"SAVE", buttonStyle:"light-button", inputStyle:"inp-light-border", hide:true, textHide:true})
            if (linkName.length == 0) {
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
    }

    return (
        <div className="my-account">
            <h1 className="my-account-title">My Account</h1>
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
                        <img hidden={displayName.imgHide} src={pencilIcon}/></Button>
                    </div>
                </div>

                <div className="account-cover-image">
                    <div className="account-grid-name">
                        <h5>Cover image</h5>
                    </div>
                    <div className="account-grid-input cover">
                        <div className="account-picture">
                            <img src={defaultImage}/>
                        </div>
                        <p>We recommend an image of a least 400x400px. Gifs works too</p>
                        <input className="inp-disable"></input>
                    </div>
                    <div className="account-grid-button">
                        <Button className="light-border-button">CHOOSE FILE</Button>
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
                        <img hidden={websiteLink.hide} src={pencilIcon}/></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyAccount;