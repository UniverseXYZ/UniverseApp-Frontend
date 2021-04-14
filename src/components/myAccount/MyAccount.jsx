import { useRef, useState, useEffect, useContext } from 'react';
import Button from '../button/Button';
import Input from '../input/Input';
import pencilIcon from '../../assets/images/edit.svg';
import defaultImage from '../../assets/images/default-img.svg';
import instagramLogo from '../../assets/images/instagram-outlined.svg'
import twitterLogo from '../../assets/images/icons_twitter.svg'
import infoIcon from '../../assets/images/icon.svg'
import warningIcon from '../../assets/images/Exclamation.svg'
import cloudIcon from '../../assets/images/ion_cloud.svg'
import AppContext from '../../ContextAPI';

const MyAccount = () => {
    const { loggedInArtist, setLoggedInArtist } = useContext(AppContext);

    const [hideIcon, setHideIcon] = useState(true)
    const [nameEditing, setNameEditing] = useState(true)
    const [aboutEditing, setAboutEditing] = useState(true)
    const [logoEditing, setLogoEditing] = useState(true)
    const [socialEditing, setSocialEditing] = useState(true)

    const accountInput = useRef(null)
    const logoInput = useRef(null)

    const [accountName, setAccountName] = useState(loggedInArtist.name)
    const [accountPage, setAccountPage] = useState(loggedInArtist.universePageAddress)
    const [accountImage, setAccountImage] = useState(loggedInArtist.avatar)
    const [about, setAbout] = useState(loggedInArtist.about)
    const [logo, setLogo] = useState(loggedInArtist.personalLogo)
    const [twitterLink, setTwitterLink] = useState(loggedInArtist.twitterLink)
    const [instagramLink, setInstagramLink] = useState(loggedInArtist.instagramLink)

    const saveDisplayChanges = () => {
        setLoggedInArtist({
            ...loggedInArtist,
            name: accountName,
            universePageAddress: accountPage,
            avatar: accountImage,
        })
        setNameEditing(true)
        
    }  
    const cancelDisplayChanges = () => {
        setAccountName(loggedInArtist.name)
        setAccountPage(loggedInArtist.universePageAddress)
        setAccountImage(loggedInArtist.avatar);
        setNameEditing(true)
    }  

    const saveAboutChanges = () => {
        setLoggedInArtist({
            ...loggedInArtist,
            about: about,
        })
        setAboutEditing(true)
    }
    const cancelAboutChanges = () => {
        setAbout(loggedInArtist.about)
        setAboutEditing(true)
    }

    const saveLogoChanges = () => {
        setLoggedInArtist({
            ...loggedInArtist,
            personalLogo: logo,
        })
        setLogoEditing(true)
    }
    const cancelLogoChanges = () => {
        setLogo(loggedInArtist.personalLogo)
        setLogoEditing(true)
    }
    
    const saveSocialChanges = () => {
        setLoggedInArtist({
            ...loggedInArtist,
            instagramLink: instagramLink,
            twitterLink: twitterLink,
        })
        setSocialEditing(true)
    }

    const cancelSocialChanges = () => {
        setTwitterLink(loggedInArtist.twitterLink)
        setInstagramLink(loggedInArtist.instagramLink)
        setSocialEditing(true)
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Universe Minting - My Profile'
        return () => { document.title = 'Universe Minting' };
    }, [])

    return (
        <div className="my-account container">
            <div className="my-account-title">
                <div className="my-account-description">
                    <h1>My Profile</h1>
                    <p>You can set preffered display name, create your branded profile URL and manage other personal settings</p>
                </div>
                <Button className="light-button">Preview my Universe Page</Button>
            </div>
            
            <div className="account-grid-container">
                {nameEditing?
                    <div className="account-grid-name">
                        <div className="account-picture">
                            <div className="account-image">
                                {accountImage &&
                                    <img className="account-img" src={URL.createObjectURL(accountImage)} alt='Avatar' />
                                }
                                {!accountImage && loggedInArtist.avatar &&
                                    <img className="account-img" src={URL.createObjectURL(loggedInArtist.avatar)} alt='Avatar' />
                                }
                                {!accountImage && !loggedInArtist.avatar &&
                                    <img className="default-img" src={defaultImage} alt='Avatar' />
                                }                            
                            </div>
                        </div>
                        <div className="account-grid-name-edit">
                            <div className="account-name">
                                {loggedInArtist.name ?
                                    <h2>{loggedInArtist.name}</h2> :
                                    <h2>Your Name</h2>
                                }
                                {loggedInArtist.universePageAddress ?
                                    <div className="account-link">
                                        <p className="link">universe.xyz/</p>
                                        <p className="link">{loggedInArtist.universePageAddress}</p>
                                    </div> :
                                    <div className="account-link">
                                        <p className="link">universe.xyz/</p>                                        
                                        <p className="default-address">youraddress</p>
                                    </div>
                                }
                                
                            </div>
                            <Button className="light-border-button" onClick={() => setNameEditing(false)}>Edit <img src={pencilIcon} alt="Edit Icon" /></Button>
                        </div>
                    </div> :
                    <div className="account-grid-name1">
                        <div className="account-picture">
                            <div className="account-image">
                                {accountImage &&
                                    <img className="account-img" src={URL.createObjectURL(accountImage)} alt='Avatar' />
                                }
                                {!accountImage && loggedInArtist.avatar &&
                                    <img className="account-img" src={URL.createObjectURL(loggedInArtist.avatar)} alt='Avatar' />
                                }
                                {!accountImage && !loggedInArtist.avatar &&
                                    <img className="default-img" src={defaultImage} alt='Avatar' />
                                }
                            </div>
                            <div className="account-picture-editing">
                                <p>We recomend an image of at least 400x400.</p>
                                <Button className="light-border-button" onClick={() => accountInput.current.click()}>Choose file</Button>
                                <input type="file" className="inp-disable" ref={accountInput} onChange={(e) => e.target.files[0] && setAccountImage(e.target.files[0])}></input>
                            </div>
                        </div>
                        <div className="account-grid-name-editing">    
                            <h5>Display name</h5>
                            <Input placeholder="Enter your display name" className="inp" value={accountName} onChange={(e) => setAccountName(e.target.value)}/>
                                
                            <h5>Universe page address <img src={infoIcon} alt='Info Icon' onMouseOver={() => setHideIcon(false)} onMouseLeave={()=>setHideIcon(true)}/></h5>
                            <div hidden={hideIcon} className="info-text">
                                <p>Universe page is your own brand landing page within the Universe ecosystem. It can contain your logo, description, and social links.</p>
                            </div>
                            <Input placeholder="Enter your universe page address" className="inp" value={accountPage} onChange={(e) => setAccountPage(e.target.value)}/>
                            {
                                (accountName !== loggedInArtist.name ||
                                    accountPage !== loggedInArtist.universePageAddress ||
                                    (accountImage && loggedInArtist.avatar && accountImage.name !== loggedInArtist.avatar.name)) ?
                                <div className="display-warning">
                                    <img alt='' src={warningIcon}/>
                                    <p>Your edits will be visible on the My Universe landing page but will not be displayed on the current running auctions landing pages.</p>
                                </div> : null
                            }                            
                            <div className="account-display-buttons">
                                <Button className="light-button" onClick={() => saveDisplayChanges()}>Save changes</Button>
                                <Button className="light-border-button" onClick={() => cancelDisplayChanges()}>Cancel</Button>
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
                            <p className="about-text">{loggedInArtist.about}</p>
                            }
                            
                            <Button className="light-border-button" onClick={() => setAboutEditing(false)}>Edit <img src={pencilIcon} alt="Edit Icon" /></Button>
                        </div>
                    :

                        <div className="account-grid-about-editing">
                            <textarea placeholder="Enter few words about yourself" className="inp" value={about} onChange = {(e) => setAbout(e.target.value)}/>
                            <div className="account-display-buttons">
                                <Button className="light-button" onClick={() => saveAboutChanges()}>Save changes</Button>
                                <Button className="light-border-button" onClick={() => cancelAboutChanges()}>Cancel</Button>
                            </div>
                        </div>
                    }
                </div>

                <div className="account-grid-logo">
                    <h5>Personal logo</h5>
                    {logoEditing?
                        <div className="account-grid-logo-edit">
                            {loggedInArtist.personalLogo ?
                                <img alt='' className="image-logo" src={URL.createObjectURL(loggedInArtist.personalLogo)}/>
                                :
                                <img className="default-logo" src={defaultImage} alt="Cover"/>    
                            }     
                            <Button className="light-border-button" onClick={() => setLogoEditing(false)}>Edit <img src={pencilIcon} alt="Edit Icon" /></Button>
                        </div>
                    :
                        <div className="account-grid-logo-editing">
                            <div className="import-logo">
                                <img alt='' className="cloud" src={cloudIcon}/>
                                <h5>Drop your file here</h5>
                                <p>(min 300x300px, SVG/PNG/JPEG, max 1mb)</p>
                                <input type="file" className="inp-disable" ref={logoInput} onChange={(e)=> e.target.files[0] && setLogo(e.target.files[0])}></input>
                                <Button className="light-border-button" onClick={() => logoInput.current.click()}>Choose file</Button>
                                <div className="import-logo-preview">
                                    <h6>Preview</h6>
                                    <div className="logo-picture">
                                        {logo &&
                                            <img className="logo-img" src={URL.createObjectURL(logo)} alt='Cover' />
                                        }
                                        {!logo && loggedInArtist.personalLogo &&
                                            <img className="logo-img" src={URL.createObjectURL(loggedInArtist.personalLogo)} alt='Cover' />
                                        }
                                        {!loggedInArtist.personalLogo && !logo &&
                                            <img className="default-image" src={defaultImage} alt='Cover'/>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="account-display-buttons">
                                <Button className="light-button" onClick={() => saveLogoChanges()}>Save changes</Button>
                                <Button className="light-border-button" onClick={() => cancelLogoChanges()}>Cancel</Button>
                            </div>
                        </div>
                    }
                    
                </div>

                <div className="account-grid-social">
                    <h5>Social</h5>
                    {socialEditing?
                        <div className="account-grid-social-edit">
                            <div className="social-sites">
                            {!loggedInArtist.instagramLink ?
                                <div className="site">
                                    <img alt='' src={instagramLogo}/>
                                    <p className="site-link">instagram.com/</p>
                                    <p className="site-default-address">youraddress</p>
                                </div> :
                                <div className="site">
                                    <img alt='' src={instagramLogo}/>
                                    <p className="site-link">instagram.com/</p>
                                    <p className="site-link">{loggedInArtist.instagramLink}</p>
                                </div>
                            }
                            {!loggedInArtist.twitterLink ?
                                <div className="site">
                                    <img alt='' src={twitterLogo}/>
                                    <p className="site-link">twitter.com/</p>
                                    <p className="site-default-address">youraddress</p>
                                </div> :
                                <div className="site">
                                    <img alt='' src={twitterLogo}/>
                                    <p className="site-link">twitter.com/</p>
                                    <p className="site-link">{loggedInArtist.twitterLink}</p>
                                </div>
                            }   
                                
                            </div>
                            <Button className="light-border-button" onClick={() => setSocialEditing(false)}>Edit <img src={pencilIcon} alt="Edit Icon" /></Button>
                        </div> :
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
                                <Button className="light-button" onClick={() => saveSocialChanges()}>Save changes</Button>
                                <Button className="light-border-button" onClick={() => cancelSocialChanges()}>Cancel</Button>
                            </div>
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}

export default MyAccount;