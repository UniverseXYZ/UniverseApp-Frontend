import './my-account.scss';

import pencilIcon from '../../assets/images/pencil.png';
import defaultImage from '../../assets/images/default-image.png'

const MyAccount = () => {
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
                        <input></input>
                    </div>
                    <div className="account-grid-button">
                        <button>EDIT <img src={pencilIcon}/></button>
                    </div>
                </div>

                <div className="account-cover-image">
                    <div className="account-grid-name">
                        <h5>Cover image</h5>
                    </div>
                    <div className="account-grid-input">
                        <div className="account-picture">
                            <img src={defaultImage}/>
                        </div>
                        <input></input>
                    </div>
                    <div className="account-grid-button">
                        <button>CHOOSE FILE</button>
                    </div>
                </div>

                <div className="account-website-link">
                    <div className="account-grid-name">
                        <h5>Universe website link</h5>
                    </div>
                    <div className="account-grid-input">
                        <input></input>
                    </div>
                    <div className="account-grid-button">
                        <button>EDIT <img src={pencilIcon}/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyAccount;