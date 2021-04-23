import './CustomizeAuction.scss'
import arrow from '../../assets/images/arrow.svg';
import infoIcon from '../../assets/images/icon.svg';
import cloudIcon from '../../assets/images/ion_cloud.svg';
import defaultImage from '../../assets/images/default-img.svg';
import backgroundDef from '../../assets/images/background.svg';
import warningIcon from '../../assets/images/Exclamation.svg';
import { useHistory } from 'react-router-dom';
import Button from '../../components/button/Button'
import Input from '../../components/input/Input'
import { useRef, useState } from 'react';
import { Animated } from 'react-animated-css';
import Main from '../../components/myAccount/Main';
import About from '../../components/myAccount/About';
import PersonalLogo from '../../components/myAccount/PersonalLogo';
import Social from '../../components/myAccount/Social';

const CustomizeAuction = () =>{
    const history = useHistory();
    const [promoInfo, setPromoInfo] = useState(false)
    const [blurInfo, setBlurInfo] = useState(false)

    const inputPromo = useRef(null)
    const inputBackground = useRef(null)
    const inputPlatinum = useRef(null)
    const inputGold = useRef(null)
    const inputSilver = useRef(null)

    const [promoImage, setPromoImage] = useState(null)
    const [backgroundImage, setBackgroundImage]= useState(null)
    const [platinumImage, setPlatinumImage] = useState(null)
    const [goldImage, setGoldImage] = useState(null)
    const [silverImage, setSilverImage] = useState(null)

    return(
        <div className="container customize__auction">
            <div className="back-rew" onClick={() => {history.push('/reward-tiers') }}><img src={arrow} alt="back"/><span>Reward tiers</span></div>
            <div className="customize__auction_title">
                <h2>Customize Auction Landing Page</h2>
                <Button className="light-border-button">Preview</Button>
            </div>

            <div className="domain__branding">
                <h3>Domain & Branding</h3>
            </div>

            <div className="headline__link">
                <div className="auction__headline">
                    <div className="auction__headline__input">
                        <h5>Auction headline</h5>
                        <Input type="text" placeholder="Enter the auction name"></Input>
                        <p className="error__text">"Auction headline" is not allowed to be empty</p>
                    </div>
                    <div className="upload__promo">
                        <div className="upload__promo__title">
                            <h4>Upload promo image (optional) <img onMouseOver = {() => setPromoInfo(true)} onMouseLeave = {() => setPromoInfo(false)} src={infoIcon}/></h4>
                            {
                                promoInfo &&
                                <Animated animationIn="zoomIn">
                                    <div className="promo-info">
                                        <p>The promo image is an image on hero screen</p>
                                    </div>
                                </Animated>
                            }
                        </div>
                        <div className="upload__promo__body">
                            <img className="cloud__icon" src={cloudIcon}/>
                            <h5>Drop your file here</h5>
                            <p>(min 1080x1080px, 1:1 square ratio, PNG/JPEG, max 3mb)</p>
                            <Button className="light-border-button" onClick={() => inputPromo.current.click()}>Choose file</Button>
                            <input type="file" className="inp-disable" ref={inputPromo} onChange={(e) => setPromoImage(e.target.files[0])} />
                            <div className="promo__preview">
                                <h6>Preview</h6>
                                <div className="preview-div">
                                    {
                                        promoImage?
                                        <img className="preview__image" src={URL.createObjectURL(promoImage)}/>
                                        :
                                        <img className="default__promo__image" src={defaultImage} />
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="auction__link">
                    <div className="auction__link__input">
                        <h5>Auction link <img src={infoIcon}/></h5>
                        <Input type="text" value="universe.xyz/3LAU/auction1"></Input>
                        <p className="error__text">"Auction link" is not allowed to be empty</p>
                    </div>
                    <div className="upload__background">
                        <div className="upload__background__title">
                            <h4>Upload background image (optional)</h4>
                            <div className="background__blur">
                                Blur 
                                <img onMouseOver = {() => setBlurInfo(true)} onMouseLeave = {() => setBlurInfo(false)} src={infoIcon}/>
                                {
                                    blurInfo &&
                                    <Animated animationIn="zoomIn" style={{position: 'relative'}}>
                                        <div className="blur-info">
                                            <p>Background blur can help to focus user's attention on the most important elements of the page. We recommend using it when your background image has lots of small details.</p>
                                        </div>
                                    </Animated>
                                }
                                <div className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        className="toggle-switch-checkbox"
                                        name="toggleSwitch"
                                        id="toggleSwitch"
                                    />
                                    <label className="toggle-switch-label" htmlFor="toggleSwitch">
                                        <span className="toggle-switch-inner" />
                                        <span className="toggle-switch-switch" />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="upload__background__body">
                            <img className="cloud__icon" src={cloudIcon}/>
                            <h5>Drop your file here</h5>
                            <p>(min 1280x720px, 16:9 square ratio, PNG/JPEG, max 1mb)</p>
                            <div className="upload__background__buttons">
                                <Button className="light-border-button" onClick = {() => inputBackground.current.click()}>Choose file</Button>
                                {
                                    backgroundImage &&
                                    <Button className="light-border-button remove"  onClick= {() => setBackgroundImage(null)}>Remove</Button>
                                }    
                            </div>
                            <input type="file" className="inp-disable" ref={inputBackground} onChange={(e) => setBackgroundImage(e.target.files[0])} />
                            <div className="background__preview">
                                <h6>Preview</h6>
                                <div className="preview-div">
                                    {
                                        backgroundImage &&
                                        <img className="background__image" src={URL.createObjectURL(backgroundImage)}/>
                                    }
                                    <img className="background__default__image" src={backgroundDef} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="reward__tiers">
                <h3>Reward Tiers</h3>

                <div className="customize__auction__tier">
                    <div className="tier__header">
                        <div className="tier__title">
                            <h4>Platinum Tier</h4>
                            <div className="pick__color">
                                <p>Pick tier color</p>
                                <input type="color" />
                            </div>
                            <div className="tier__description">
                                <div className="winners">Winners: <b>5</b></div>
                                <div className="winners">NFTs per winner: <b>3</b></div>
                                <div className="winners">Minimum bid per tier: <b>40 ETH</b></div>
                            </div>
                        </div>
                        <div className="pick__color">
                            <p>Pick tier color</p>
                            <input type="color" />
                        </div>
                    </div>

                    <div className="tier__body">
                        <div className="custom__description">
                            <div className="custom__description__title">
                                <h4>Custom description</h4>
                                <p>0/600</p>
                            </div>
                            <textarea className="inp" placeholder="Enter the description"></textarea>
                            <p className="error__text">Fill out the description</p>
                        </div>
                        <div className="upload__image">
                            <h4>Upload tier image (optional)</h4>
                            <div className="upload__image__div">
                                <div className="upload__image__description">
                                    <img className="cloud__icon" src={cloudIcon}/>
                                    <h5>Drop your file here</h5>
                                    <p>(min 800x800px, PNG/JPEG, max 3mb)</p>
                                    <Button className="light-border-button" onClick = {()=> inputPlatinum.current.click()}>Choose file</Button>
                                    <input type="file" className="inp-disable" ref={inputPlatinum} onChange={(e) => setPlatinumImage(e.target.files[0])} />
                                </div>
                                <div className="upload__image__preview">
                                    <h6>Preview</h6>
                                    <div className="preview-div">
                                        {
                                            platinumImage?
                                            <img src={URL.createObjectURL(platinumImage)} className="preview__image" />
                                            :
                                            <img className="default__upload__image" src={defaultImage} />
                                        }    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="customize__auction__tier">
                    <div className="tier__header">
                        <div className="tier__title">
                            <h4>Gold Tier</h4>
                            <div className="pick__color">
                                <p>Pick tier color</p>
                                <input type="color" />
                            </div>
                            <div className="tier__description">
                                <div className="winners">Winners: <b>10</b></div>
                                <div className="winners">NFTs per winner: <b>2</b></div>
                            </div>
                        </div>
                        <div className="pick__color">
                            <p>Pick tier color</p>
                            <input type="color" />
                        </div>
                    </div>

                    <div className="tier__body">
                        <div className="custom__description">
                            <div className="custom__description__title">
                                <h4>Custom description</h4>
                                <p>0/600</p>
                            </div>
                            <textarea className="inp" placeholder="Enter the description"></textarea>
                            <p className="error__text">Fill out the description</p>
                        </div>
                        <div className="upload__image">
                            <h4>Upload tier image (optional)</h4>
                            <div className="upload__image__div">
                                <div className="upload__image__description">
                                    <img className="cloud__icon" src={cloudIcon}/>
                                    <h5>Drop your file here</h5>
                                    <p>(min 800x800px, PNG/JPEG, max 3mb)</p>
                                    <Button className="light-border-button" onClick = {() => inputGold.current.click()}>Choose file</Button>
                                    <input type="file" className="inp-disable" ref={inputGold} onChange={(e) => setGoldImage(e.target.files[0])} />
                                </div>
                                <div className="upload__image__preview">
                                    <h6>Preview</h6>
                                    <div className="preview-div">
                                        {
                                            goldImage?
                                            <img className="preview__image" src={URL.createObjectURL(goldImage)} />
                                            :
                                            <img className="default__upload__image" src={defaultImage} />
                                        }
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="customize__auction__tier">
                    <div className="tier__header">
                        <div className="tier__title">
                            <h4>Silver Tier</h4>
                            <div className="pick__color">
                                <p>Pick tier color</p>
                                <input type="color" />
                            </div>
                            <div className="tier__description">
                                <div className="winners">Winners: <b>20</b></div>
                                <div className="winners">NFTs per winner: <b>1</b></div>
                            </div>
                        </div>
                        <div className="pick__color">
                            <p>Pick tier color</p>
                            <input type="color" />
                        </div>
                    </div>

                    <div className="tier__body">
                        <div className="custom__description">
                            <div className="custom__description__title">
                                <h4>Custom description</h4>
                                <p>0/600</p>
                            </div>
                            <textarea className="inp" placeholder="Enter the description"></textarea>
                            <p className="error__text">Fill out the description</p>
                        </div>
                        <div className="upload__image">
                            <h4>Upload tier image (optional)</h4>
                            <div className="upload__image__div">
                                <div className="upload__image__description">
                                    <img className="cloud__icon" src={cloudIcon}/>
                                    <h5>Drop your file here</h5>
                                    <p>(min 800x800px, PNG/JPEG, max 3mb)</p>
                                    <Button className="light-border-button" onClick = {() => inputSilver.current.click()}>Choose file</Button>
                                    <input type="file" className="inp-disable" ref={inputSilver} onChange={(e) => setSilverImage(e.target.files[0])} />
                                </div>
                                <div className="upload__image__preview">
                                    <h6>Preview</h6>
                                    <div className="preview-div">
                                        {
                                            silverImage?
                                            <img className="preview__image" src={URL.createObjectURL(silverImage)} />
                                            :
                                            <img className="default__upload__image" src={defaultImage} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="about__artist">
                    <div className="about__artist__header">
                        <h3>About Artist</h3>
                        <div className="about__artist__warning">
                            <img src={warningIcon} />
                            <p>This information is unified across all Universe.xyz. Any edits made below will be visible in other Universe products and sections, e.g. My Account</p>
                        </div>
                    </div>
                    <Main />
                    <About />
                    <PersonalLogo />
                    <Social />
                </div>
                <div className="customize-buttons">
                    <Button className="light-button">Save and close</Button>
                    <Button className="light-border-button">Save and preview</Button>
                </div>
            </div>
        </div>
    )
}

export default CustomizeAuction