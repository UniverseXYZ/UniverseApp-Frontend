import './Footer.scss';
import Logo from '../../assets/images/light.svg'
import twitter from '../../assets/images/Twitter.svg'
import discord from '../../assets/images/Discord.svg'
import Btn from '../button/Button';

const Footer = () => {
    return (
        <footer>
            <div className="footer">
                <div className="universe">
                    <div className="logo-div">
                        <img src={Logo} alt="logo"/>
                    </div>
                    <div className="subscribe">
                        <p>Stay up to date with our newsletter</p>
                        <input placeholder="Enter your email" />
                        <Btn className="light-button">Subscribe</Btn>
                    </div>
                </div>
                <div className="universe-list">
                    <div className="universe-global">
                        <ul>
                            <li>Universe Global</li>
                            <li>Home</li>
                            <li>Whitepaper</li>
                            <li className="grey">Team</li>
                        </ul>
                    </div>
                    <div className="minting-auctions">
                        <ul>
                            <li>Minting & Auctions</li>
                            <li>Minting & Auctions</li>
                            <li>Active auctions</li>
                            <li>Upcoming releases</li>
                        </ul>
                    </div>
                    <div className="coming-soon">
                        <ul>
                            <li>Coming Soons</li>
                            <li className="grey">Kekit</li>
                            <li className="grey">KekDAO</li>
                            <li className="grey">gaming</li>
                        </ul>
                    </div>
                </div>
                
            </div>
            <div className="footer-bottom">
                <div className="footer-links">
                    <div className="op-sourced"><span>Universe.xyz © 2021. Open-sourced.</span></div>
                    <div className="powered-by"><span>Powered by kekDAO.</span></div>
                </div>
                <div className="icons">
                    <img src={twitter} alt="twiter"/>
                    <img src={discord} alt="discord"/>
                </div>
            </div>
        </footer>
    )
}

export default Footer;