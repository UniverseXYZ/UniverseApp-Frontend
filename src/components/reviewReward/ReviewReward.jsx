import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Animated } from 'react-animated-css';
import AppContext from '../../ContextAPI';
import Button from '../button/Button';
import arrow from '../../assets/images/arrow.svg';
import pencil from '../../assets/images/pencil.svg';
import infoIcon from '../../assets/images/icon.svg';
import checkIcon from '../../assets/images/check.svg';
import editIcon from '../../assets/images/edit.svg';
import removeIcon from '../../assets/images/remove.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import videoIcon from '../../assets/images/video-icon.svg';

const Reward = () => {
  const location = useLocation();
  const history = useHistory();
  const { auction, setAuction } = useContext(AppContext);
  const [hideIcon, setHideIcon] = useState(false);
  const ref = useRef(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownID, setDropdownID] = useState(0);
  const tierId = location.state;
  const tierById = auction.tiers.find((element) => element.id === tierId);

  const handleEdit = (id) => {
    document.body.classList.add('no__scroll');
  };

  const handleRemove = (id) => {
    document.body.classList.add('no__scroll');
    setAuction({
      ...auction,
      tiers: [
        ...auction.tiers.filter((tier) => tier.id !== tierById.id),
        { ...tierById, nfts: tierById.nfts.filter((item) => item.id !== id) },
      ],
    });
  };

  const handleCreate = () => {
    history.push('/reward-tiers', tierId);
  };

  useEffect(() => {
    console.log(auction);
  });
  return (
    <div className="container reviw-reward">
      <div
        className="back-rew"
        onClick={() => {
          history.push('/select-nfts', tierId);
        }}
        aria-hidden="true"
      >
        <img src={arrow} alt="back" />
        <span>Select NFTs</span>
      </div>
      <div>
        <div className="head-part">
          <h2 className="tier-title">Review Reward Tier</h2>
          <Button
            className="light-border-button"
            onClick={() => {
              history.push('/create-tiers', tierId);
            }}
          >
            Edit <img src={pencil} alt="edit" />
          </Button>
        </div>
        <div className="tier-inf">
          <div className="tName">
            <p>Tier name</p>
            <span>{tierById.name}</span>
          </div>
          <div className="numberWinn">
            <p>Number of winners</p>
            <span>{tierById.winners}</span>
          </div>
          <div className="perWin">
            <p>NFTs per winner</p>
            <span>{tierById.nftsPerWinner}</span>
          </div>
        </div>
        <div className="totalNft">
          <p>
            Total NFTs:&nbsp;<b>{tierById.winners * tierById.nftsPerWinner}</b>
            <div className="total__nfts__info">
              {hideIcon && (
                <Animated animationIn="zoomIn" style={{ position: 'relative' }}>
                  <div className="info-text">
                    <p>
                      Total amount of NFTs that will be distributed to the current reward tier
                      winners.
                    </p>
                  </div>
                </Animated>
              )}
              <img
                onMouseOver={() => setHideIcon(true)}
                onFocus={() => setHideIcon(true)}
                onMouseLeave={() => setHideIcon(false)}
                onBlur={() => setHideIcon(false)}
                src={infoIcon}
                alt="total"
              />
            </div>
          </p>
        </div>
      </div>

      <div className="rev-reward">
        {tierById.nfts.map((nft, index) => (
          <div className="rev-reward__box">
            <div className="rev-reward__box__image">
              {nft.previewImage.type === 'video/mp4' && (
                <video
                  onMouseOver={(event) => event.target.play()}
                  onFocus={(event) => event.target.play()}
                  onMouseOut={(event) => event.target.pause()}
                  onBlur={(event) => event.target.pause()}
                >
                  <source src={URL.createObjectURL(nft.previewImage)} type="video/mp4" />
                  <track kind="captions" {...props} />
                  Your browser does not support the video tag.
                </video>
              )}
              {nft.previewImage.type === 'audio/mpeg' && (
                <img className="preview-image" src={mp3Icon} alt={nft.name} />
              )}
              {nft.previewImage.type !== 'audio/mpeg' && nft.previewImage.type !== 'video/mp4' && (
                <img
                  className="preview-image"
                  src={URL.createObjectURL(nft.previewImage)}
                  alt={nft.name}
                />
              )}
              {nft.previewImage.type === 'video/mp4' && (
                <img className="video__icon" src={videoIcon} alt="Video Icon" />
              )}
              {nft.selected && <img className="check__icon" src={checkIcon} alt="Check Icon" />}
            </div>
            <div className="rev-reward__box__name">
              <h3>{nft.name}</h3>
              <button
                type="button"
                className="three__dots"
                onClick={() => {
                  setShowDropdown(!showDropdown);
                  setDropdownID(nft.id);
                }}
              >
                <span />
                <span />
                <span />
                {dropdownID === nft.id && showDropdown && (
                  <ul ref={ref} className="edit__remove">
                    <li className="edit" onClick={() => handleEdit(nft.id)} aria-hidden="true">
                      <p>Edit</p>
                      <img src={editIcon} alt="Edit" />
                    </li>
                    <li className="remove" onClick={() => handleRemove(nft.id)} aria-hidden="true">
                      <p>Remove</p>
                      <img src={removeIcon} alt="Remove" />
                    </li>
                  </ul>
                )}
              </button>
            </div>
            <div className="rev-reward__box__footer">
              <div className="collection__details">
                {nft.type === 'collection' && (
                  <>
                    {typeof nft.collectionAvatar === 'string' &&
                    nft.collectionAvatar.startsWith('#') ? (
                      <div
                        className="random__bg__color"
                        style={{ backgroundColor: nft.collectionAvatar }}
                      >
                        {nft.collectionName.charAt(0)}
                      </div>
                    ) : (
                      <img
                        src={URL.createObjectURL(nft.collectionAvatar)}
                        alt={nft.collectionName}
                      />
                    )}
                    <span>{nft.collectionName}</span>
                  </>
                )}
              </div>
              <span className="ed-count">{`x${nft.generatedEditions.length}`}</span>
            </div>
            {nft.generatedEditions.length > 1 && (
              <>
                <div className="rev-reward__box__highlight__one" />
                <div className="rev-reward__box__highlight__two" />
              </>
            )}
          </div>
        ))}
      </div>
      <div className="create-btn">
        {tierById.nfts.length > 0 ? (
          <Button className="light-button" onClick={() => handleCreate()}>
            Create tier
          </Button>
        ) : (
          <Button className="light-button" disabled>
            Create tier
          </Button>
        )}
      </div>
    </div>
  );
};

export default Reward;
