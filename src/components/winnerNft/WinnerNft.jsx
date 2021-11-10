/* eslint-disable consistent-return */
import React from 'react';
import './WinnerNft.scss';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import EditionsRemovePopup from '../popups/EditionsRemovePopup.jsx';
import crossSmall from '../../assets/images/nft-cross.svg';
import RectIcon from '../../assets/images/selectedNft-rect.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';

const WinnerNFT = ({ nft, onRemoveEdition }) => {
  const image =
    nft.artworkType && !nft.artworkType.endsWith('mpeg') && !nft.artworkType.endsWith('mp4');
  const mp4 = nft.artworkType && nft.artworkType.endsWith('mp4');
  const mpeg = nft.artworkType && nft.artworkType.endsWith('mpeg');

  return (
    <div className="imgs imgs-winner">
      {mp4 && (
        <video
          className="smallView-image"
          onMouseOver={(event) => event.target.play()}
          onFocus={(event) => event.target.play()}
          onMouseOut={(event) => event.target.pause()}
          onBlur={(event) => event.target.pause()}
        >
          <source src={nft.url} type="video/mp4" />
          <track kind="captions" />
          Your browser does not support the video tag.
        </video>
      )}

      {mpeg && <img className="smallView-image" src={mp3Icon} alt={nft.name} />}

      {image && <img className="smallView-image" src={nft.url} alt={nft.name} />}

      {nft.count > 1 && <span className="for-editions-count">{nft.count}</span>}

      <div className="delete-hover">
        {nft.count > 1 ? (
          <span className="upRemove-txt remove-eds">Select editions to remove</span>
        ) : (
          <span className="upRemove-txt remove">Remove</span>
        )}
        <img className="rec-img" src={RectIcon} alt="down-sideIcon" />
        {nft.count > 1 ? (
          <Popup
            trigger={<img className="del-img" src={crossSmall} alt="delete" aria-hidden="true" />}
          >
            {(close) => (
              <EditionsRemovePopup onClose={close} nft={nft} onRemoveEdition={onRemoveEdition} />
            )}
          </Popup>
        ) : (
          <img
            onClick={() => onRemoveEdition(nft.tokenIds)}
            className="del-img"
            src={crossSmall}
            alt="delete"
            aria-hidden="true"
          />
        )}
        )
      </div>
    </div>
  );
};

WinnerNFT.propTypes = {
  nft: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onRemoveEdition: PropTypes.func.isRequired,
};

export default WinnerNFT;
