import {useEffect, useState} from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {Animated} from "react-animated-css";
import {NotificationManager} from 'react-notifications';
import twitterIcon from '../../assets/images/icons_twitter.svg';
import instagramIcon from '../../assets/images/instagram-outlined.svg';
import copyIcon from '../../assets/images/copy.svg';
import Skeleton from 'react-loading-skeleton';

const ArtistDetails = ({onArtist}) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Here need to get artist details
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [])

    return (
        <div className='artist__details__section'>
            {!loading ? 
                <Animated animationIn="zoomIn" animationOut="fadeOutUp" isVisible={true}>
                    <div className='artist__details__section__container'>
                        <div className='avatar'>
                            <img src={onArtist.avatar} alt={onArtist.name} />
                            <h2 className='show__on__mobile'>{onArtist.name}</h2>
                        </div>
                        <div className='info'>
                            <h1 className='title'>{onArtist.name}</h1>
                            <p className='desc'>{onArtist.about}</p>
                            <div className='social__links'>
                                <a href={onArtist.instagramUrl} target='_blank'>
                                    <img src={instagramIcon} alt='Instagram' />
                                </a>
                                <a href={onArtist.twitterUrl} target='_blank'>
                                    <img src={twitterIcon} alt='Twitter' />
                                </a>
                                <CopyToClipboard text={onArtist.address} onCopy={() => NotificationManager.success('Copied!')}>
                                    <div className='copy__to__clipboard'>
                                        <img src={copyIcon} alt='Copy to clipboard' />
                                        <span>Copy URL</span>
                                    </div>
                                </CopyToClipboard>
                            </div>
                        </div>
                    </div> 
                </Animated> :
                <div className='artist__details__section__container'>
                    <div className='avatar'>
                        <Skeleton height={window.screen.width > 576 ? 280 : 90} width={window.screen.width > 576 ? 280 : 90} circle={true} />
                        <h2 className='show__on__mobile'><Skeleton width={200} /></h2>
                    </div>
                    <div className='info'>
                        <h1 className='title'><Skeleton width={200} /></h1>
                        <p className='desc'><Skeleton height={200} /></p>
                        <div className='social__links'>
                            <Skeleton width={300} height={50} />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ArtistDetails;