import { useState } from 'react';
import closeIcon from '../../assets/images/close-menu.svg';
import subscribeIcon from '../../assets/images/subscribe.png';
import Button from '../button/Button';

const SubscribePopup = ({ close }) => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email).toLowerCase())) {
            setSubscribed(true);
        } else {
            alert('Email address is invalid.');
        }
    }

    return (
        <div className='subscribe__popup'>
            <img className='close__popup' onClick={close} src={closeIcon} alt='Close' />
            <div className='w-50'>
                <img src={subscribeIcon} alt='Subscribe' />
            </div>
            <div className='w-50'>
                {!subscribed ?
                    <>
                        <h1 className='title'>Subscribe for news & updates</h1>
                        <p className='desc'>Don’t miss the updates from us!</p>
                        <div className='subscribe__form'>
                            <input type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Button className='light-button w-100' onClick={handleSubscribe}>Subscribe</Button>
                        </div>
                    </> :
                    <>
                        <h1 className='title'>Thank you for subscribing!</h1>
                        <p className='desc'>You have successfully signed up for our newsletter.</p>
                        <Button className='light-button' onClick={close}>Close</Button>
                    </>
                }
            </div>
        </div>
    )
}

export default SubscribePopup;