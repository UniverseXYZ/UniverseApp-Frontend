import './Account.scss';
import Button from '../button/Button';
import Input from '../input/Input';
import pencilIcon from '../../assets/images/edit.svg';
import defaultImage from '../../assets/images/default-img.svg';
import { useRef, useState } from 'react';
import instagramLogo from '../../assets/images/instagram-outlined.svg'
import twitterLogo from '../../assets/images/icons_twitter.svg'
import infoIcon from '../../assets/images/icon.svg'
import warningIcon from '../../assets/images/Exclamation.svg'
import cloudIcon from '../../assets/images/ion_cloud.svg'

const MyAccount = () => {

    const [hideIcon, setHideIcon] = useState(true)
    const [nameEditing, setNameEditing] = useState(true)
    const [aboutEditing, setAboutEditing] = useState(true)
    const [logoEditing, setLogoEditing] = useState(true)
    const [socialEditing, setSocialEditing] = useState(true)

    const accountInput = useRef(null)
    const logoInput = useRef(null)

    const [accountDisplay, setAccountDisplay] = useState({name:"", pageAddress:"", accountImage: null})
    const [accountName, setAccountName] = useState("")
    const [accountPage, setAccountPage] = useState("")
    const [accountImage, setAccountImage] = useState(null)

    const [about, setAbout] = useState("")
    const [aboutNew, setAboutNew] =useState("")

    const [logoImage, setLogoImage] = useState(null)
    const [logo, setLogo] = useState(null)

    const [socialDisplay, setSocialDisplay] = useState({twitter:"", instagram:""})
    const [twitterLink, setTwitterLink] = useState("")
    const [instagramLink, setInstagramLink] = useState("")

    const saveDisplayChanges = () => {
        if (accountImage) {
            setAccountDisplay({name:accountName, pageAddress:accountPage, accountImage: accountImage})
            setAccountImage(null);
        }
        else{
            setAccountDisplay(previousAccountDisplay => ({...previousAccountDisplay, name:accountName, pageAddress:accountPage}))
        }
        
        setNameEditing(true)
        
    }  
    const cancelDisplayChanges = () => {
        setAccountName(accountDisplay.name)
        setAccountPage(accountDisplay.pageAddress)
        setNameEditing(true)
        setAccountImage(null);
    }  

    const saveAboutChanges = () => {
        setAbout(aboutNew)
        setAboutEditing(true)
    }
    const cancelAboutChanges = () => {
        setAboutNew(about)
        setAboutEditing(true)
    }

    const saveLogoChanges = () => {
        if (logoImage) {
            setLogo(logoImage)
        }
        setLogoEditing(true)
    }
    const cancelLogoChanges = () => {
        setLogoImage(null)
        setLogoEditing(true)
    }
    
    const saveSocialChanges = () => {
        setSocialDisplay({twitter:twitterLink, instagram:instagramLink})
        setSocialEditing(true)
    }

    const cancelSocialChanges = () => {
        setTwitterLink(socialDisplay.twitter)
        setInstagramLink(socialDisplay.instagram)
        setSocialEditing(true)
    }

    return (
        <div className="my-account container">
            <div className="my-account-title">
                <div className="my-account-description">
                    <h1>My Profile</h1>
                    <p>You can set preffered display name, create your branded profile URL and manage other personal settings</p>
                </div>
                <Button className="light-button">PREVIEW MY UNIVERSE PAGE</Button>
            </div>
            
            <div className="account-grid-container">
                {nameEditing?
                    <div className="account-grid-name">
                        <div className="account-picture">
                            <div className="account-image">
                                {accountImage &&
                                    <img className="account-img" src={URL.createObjectURL(accountImage)} alt='Cover' />
                                }
                                {!accountImage && accountDisplay.accountImage &&
                                    <img className="account-img" src={URL.createObjectURL(accountDisplay.accountImage)} alt='Cover' />
                                }
                                {!accountImage && !accountDisplay.accountImage &&
                                    <img className="default-img" src={defaultImage} alt='Cover' />
                                }                            
                            </div>
                        </div>
                        <div className="account-grid-name-edit">
                            <div className="account-name">
                                {accountDisplay.name!==""?
                                    <h2>{accountDisplay.name}</h2>
                                :
                                    <h2>Your Name</h2>
                                }
                                {accountDisplay.pageAddress !== ""?
                                    <div className="account-link">
                                        <p className="link">universe.xyz/</p>
                                        <p className="link">{accountDisplay.pageAddress}</p>
                                    </div>
                                :
                                    <div className="account-link">
                                        <p className="link">universe.xyz/</p>                                        
                                        <p className="default-address">youraddress</p>
                                    </div>
                                }
                                
                            </div>
                            <Button className="light-border-button" onClick={() => setNameEditing(false)}>EDIT <img src={pencilIcon} alt="Edit Icon" /></Button>
                        </div>
                    </div>
                    :
                    <div className="account-grid-name1">
                        <div className="account-picture">
                            <div className="account-image">
                                {accountImage &&
                                    <img className="account-img" src={URL.createObjectURL(accountImage)} alt='Cover' />
                                }
                                {!accountImage && accountDisplay.accountImage &&
                                    <img className="account-img" src={URL.createObjectURL(accountDisplay.accountImage)} alt='Cover' />
                                }
                                {!accountImage && !accountDisplay.accountImage &&
                                    <img className="default-img" src={defaultImage} alt='Cover' />
                                }
                                
                            </div>
                            <div className="account-picture-editing">
                                <p>We recomend an image of at least 400x400.</p>
                                <Button className="light-border-button" onClick={() => accountInput.current.click()}>CHOOSE FILE</Button>
                                <input type="file" className="inp-disable" ref={accountInput} onChange={(e)=>e.target.files[0] && setAccountImage(e.target.files[0])}></input>
                            </div>  
                                        
                        </div>
                        <div className="account-grid-name-editing">    
                            <h5>Display name</h5>
                            <Input placeholder="Enter your display name" className="inp" value={accountName} onChange={(e)=>setAccountName(e.target.value)}/>
                                
                            <h5>Universe page address <img src={infoIcon} alt='Info Icon' onMouseOver={()=>setHideIcon(false)} onMouseLeave={()=>setHideIcon(true)}/></h5>
                            <div hidden={hideIcon} className="info-text">
                                <p>Universe page is your own brand landing page within the Universe ecosystem. It can contain your logo, description, and social links.</p>
                            </div>
                            <Input placeholder="Enter your display name" className="inp" value={accountPage} onChange={(e) => setAccountPage(e.target.value)}/>
                            {
                                (accountName!==accountDisplay.name || accountPage!==accountDisplay.pageAddress || accountImage)?
                                <div className="display-warning">
                                    <img alt='' src={warningIcon}/>
                                    <p>Your edits will be visible on the My Universe landing page but will not be displayed on the current running auctions landing pages.</p>
                                </div>
                                :null
                            }                            
                            <div className="account-display-buttons">
                                <Button className="light-button" onClick={() => saveDisplayChanges()}>SAVE CHANGES</Button>
                                <Button className="light-border-button" onClick={() => cancelDisplayChanges()}>CANCEL</Button>
                            </div>
                        </div> 
                    </div>
                }

                <div className="account-grid-about">
                    <h5>About</h5>
                    {aboutEditing?
                        <div className="account-grid-about-edit">
                            {about===""?
                            <p className="about-default-text">Write few sentences about yourself</p>
                            :
                            <p className="about-text">{about}</p>
                            }
                            
                            <Button className="light-border-button" onClick={() => setAboutEditing(false)}>EDIT <img src={pencilIcon} alt="Edit Icon" /></Button>
                        </div>
                    :

                        <div className="account-grid-about-editing">
                            <textarea placeholder="Enter few words about yourself" className="inp" value={aboutNew} onChange = {(e) => setAboutNew(e.target.value)}/>
                            <div className="account-display-buttons">
                                <Button className="light-button" onClick={() => saveAboutChanges()}>SAVE CHANGES</Button>
                                <Button className="light-border-button" onClick={() => cancelAboutChanges()}>CANCEL</Button>
                            </div>
                        </div>
                    }
                </div>

                <div className="account-grid-logo">
                    <h5>Personal logo</h5>
                    {logoEditing?
                        <div className="account-grid-logo-edit">
                            {logo?
                                <img alt='' className="image-logo" src={URL.createObjectURL(logo)}/>
                                :
                                <img className="default-logo" src={defaultImage} alt="Cover"/>    
                            }     
                            <Button className="light-border-button" onClick={()=> setLogoEditing(false)}>EDIT <img src={pencilIcon} alt="Edit Icon" /></Button>
                        </div>
                    :
                        <div className="account-grid-logo-editing">
                            <div className="import-logo">
                                <img alt='' className="cloud" src={cloudIcon}/>
                                <h5>Drop your file here</h5>
                                <p>(min 300x300px, SVG/PNG/JPEG, max 1mb)</p>
                                <input type="file" className="inp-disable" ref={logoInput} onChange={(e)=> e.target.files[0] && setLogoImage(e.target.files[0])}></input>
                                <Button className="light-border-button" onClick={() => logoInput.current.click()}>CHOOSE FILE</Button>
                                <div className="import-logo-preview">
                                    <h6>Preview</h6>
                                    <div className="logo-picture">
                                    {
                                        logoImage &&
                                        <img className="logo-img" src={URL.createObjectURL(logoImage)} alt='Cover' />
                                    }
                                    {
                                        !logoImage && logo &&
                                        <img className="logo-img" src={URL.createObjectURL(logo)} alt='Cover' />
                                    }
                                    {
                                        !logoImage && !logo &&
                                        <img className="default-image" src={defaultImage} alt='Cover'/>
                                    }  


                                    </div>
                                </div>
                            </div>
                            <div className="account-display-buttons">
                                <Button className="light-button" onClick={() => saveLogoChanges()}>SAVE CHANGES</Button>
                                <Button className="light-border-button" onClick={() => cancelLogoChanges()}>CANCEL</Button>
                            </div>
                        </div>
                    }
                    
                </div>

                <div className="account-grid-social">
                    <h5>Social</h5>
                    {socialEditing?
                        <div className="account-grid-social-edit">
                            <div className="social-sites">
                            {socialDisplay.instagram === ""?
                                <div className="site">
                                    <img alt='' src={instagramLogo}/>
                                    <p className="site-link">instagram.com/</p>
                                    <p className="site-default-address">youraddress</p>
                                </div>
                            :
                                <div className="site">
                                    <img alt='' src={instagramLogo}/>
                                    <p className="site-link">instagram.com/</p>
                                    <p className="site-link">{socialDisplay.instagram}</p>
                                </div>
                            }
                            {socialDisplay.twitter === ""?
                                <div className="site">
                                    <img alt='' src={twitterLogo}/>
                                    <p className="site-link">twitter.com/</p>
                                    <p className="site-default-address">youraddress</p>
                                </div>
                            :
                                <div className="site">
                                    <img alt='' src={twitterLogo}/>
                                    <p className="site-link">twitter.com/</p>
                                    <p className="site-link">{socialDisplay.twitter}</p>
                                </div>
                            }   
                                
                            </div>
                            <Button className="light-border-button" onClick={() => setSocialEditing(false)}>EDIT <img src={pencilIcon} alt="Edit Icon" /></Button>
                        </div>
                    :
                        <div className="account-grid-social-editing">
                            <div className="instagram">
                                <h5>Instagram profile</h5>
                                <img alt='' src={instagramLogo}/>
                                <Input placeholder="instagram.com/username" className="inp" value={instagramLink} onChange={(e) => setInstagramLink(e.target.value)}/>
                            </div>
                            <div className="twitter">
                                <h5>Twitter profile</h5>
                                <img alt='' src={twitterLogo}/>
                                <Input  placeholder="twitter.com/username" className="inp" value={twitterLink} onChange={(e) => setTwitterLink(e.target.value)}/>
                            </div>
                            
                            <div className="account-display-buttons">
                                <Button className="light-button" onClick={() => saveSocialChanges()}>SAVE CHANGES</Button>
                                <Button className="light-border-button" onClick={() => cancelSocialChanges()}>CANCEL</Button>
                            </div>
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}

export default MyAccount;