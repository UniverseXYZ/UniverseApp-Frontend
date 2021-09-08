import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Animated } from 'react-animated-css';
import { useHistory } from 'react-router';
import Skeleton from 'react-loading-skeleton';
import twitterIcon from '../../assets/images/icons_twitter.svg';
import instagramIcon from '../../assets/images/instagram-outlined.svg';
import pencilIcon from '../../assets/images/edit.svg';
import copyIcon from '../../assets/images/copy.svg';
import AppContext from '../../ContextAPI';
import Button from '../button/Button';

const ArtistDetails = ({ onArtist }) => {
  const { loggedInArtist, setEditProfileButtonClick } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // Here need to get artist details
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="artist__details__section">
      {!loading ? (
        <Animated animationIn="zoomIn">
          {loggedInArtist.id !== onArtist.id ? (
            <div className="artist__details__section__container">
              <div className="avatar">
                <img src={onArtist.avatar} alt={onArtist.name} />
                <h2 className="show__on__mobile">{onArtist.name}</h2>
              </div>
              <div className="info">
                <h1 className="title">{onArtist.name}</h1>
                <p className="desc">{onArtist.about}</p>
                <div className="social__links">
                  {/* <Button className="light-border-button">
                    Edit <img src={pencilIcon} alt="Pencil" />
                  </Button> */}
                  <a href={onArtist.instagramUrl} target="_blank" rel="noreferrer">
                    <img src={instagramIcon} alt="Instagram" />
                  </a>
                  <a href={onArtist.twitterUrl} target="_blank" rel="noreferrer">
                    <img src={twitterIcon} alt="Twitter" />
                  </a>
                  <div className="copy-div">
                    <div className="copy" title="Copy to clipboard">
                      <div className="copied-div" hidden={!copied}>
                        URL copied!
                        <span />
                      </div>
                      <CopyToClipboard
                        text={onArtist.address}
                        onCopy={() => {
                          setCopied(true);
                          setTimeout(() => {
                            setCopied(false);
                          }, 1000);
                        }}
                      >
                        <span>
                          <img src={copyIcon} alt="Copy to clipboard icon" className="copyImg" />
                          Copy URL
                        </span>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="artist__details__section__container">
              <div className="avatar">
                <img src={URL.createObjectURL(loggedInArtist.avatar)} alt={loggedInArtist.name} />
                <h2 className="show__on__mobile">{loggedInArtist.name}</h2>
              </div>
              <div className="info">
                <h1 className="title">{loggedInArtist.name}</h1>
                <p className="desc">{loggedInArtist.about}</p>
                <div className="social__links">
                  {/* <Button
                    className="light-border-button"
                    onClick={() => {
                      history.push('/my-account');
                      setEditProfileButtonClick(false);
                    }}
                  >
                    Edit <img src={pencilIcon} alt="Pencil" />
                  </Button> */}
                  {loggedInArtist.instagramLink ? (
                    <a
                      href={`https://www.instagram.com/${loggedInArtist.instagramLink}`}
                      target="_blank"
                      title={`https://www.instagram.com/${loggedInArtist.instagramLink}`}
                      rel="noreferrer"
                    >
                      <img src={instagramIcon} alt="Instagram" />
                    </a>
                  ) : (
                    <></>
                  )}
                  {loggedInArtist.twitterLink ? (
                    <a
                      href={`https://twitter.com/${loggedInArtist.twitterLink}`}
                      target="_blank"
                      title={`https://twitter.com/${loggedInArtist.twitterLink}`}
                      rel="noreferrer"
                    >
                      <img src={twitterIcon} alt="Twitter" />
                    </a>
                  ) : (
                    <></>
                  )}
                  <div className="copy-div">
                    <div className="copy" title="Copy to clipboard">
                      <div className="copied-div" hidden={!copied}>
                        URL copied!
                        <span />
                      </div>
                      <CopyToClipboard
                        text={window.location.href}
                        onCopy={() => {
                          setCopied(true);
                          setTimeout(() => {
                            setCopied(false);
                          }, 1000);
                        }}
                      >
                        <span>
                          <img src={copyIcon} alt="Copy to clipboard icon" className="copyImg" />
                          Copy URL
                        </span>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Animated>
      ) : (
        <div className="artist__details__section__container">
          <div className="avatar">
            <Skeleton
              height={window.innerWidth > 576 ? 280 : 90}
              width={window.innerWidth > 576 ? 280 : 90}
              circle
            />
            <h2 className="show__on__mobile">
              <Skeleton width={200} />
            </h2>
          </div>
          <div className="info">
            <h1 className="title">
              <Skeleton width={200} />
            </h1>
            <p className="desc">
              <Skeleton height={200} />
            </p>
            <div className="social__links">
              <Skeleton width={300} height={50} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ArtistDetails.propTypes = {
  onArtist: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ArtistDetails;
