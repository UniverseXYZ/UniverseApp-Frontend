import React from 'react';
import './WinnerNft.scss';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import EditionsRemovePopup from '../popups/EditionsRemovePopup.jsx';
import crossSmall from '../../assets/images/nft-cross.svg';
import RectIcon from '../../assets/images/selectedNft-rect.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';

const WinnerNFT = ({ data, nft }) => (
  <div key={nft.id} className="imgs imgs-winner">
    {nft.artworkType && nft.artworkType.endsWith('mp4') && (
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
    {nft.artworkType && nft.artworkType.endsWith('mpeg') && (
      <img className="smallView-image" src={mp3Icon} alt={nft.name} />
    )}
    {nft.artworkType && !nft.artworkType.endsWith('mpeg') && !nft.artworkType.endsWith('mp4') && (
      <img className="smallView-image" src={nft.url} alt={nft.name} />
    )}
    {nft.numberOfEditions && nft.numberOfEditions > 1 && (
      <span className="for-editions-count">{nft.numberOfEditions}</span>
    )}
    <div className="delete-hover">
      {nft.numberOfEditions > 1 ? (
        <span className="upRemove-txt remove-eds">Select editions to remove</span>
      ) : (
        <span className="upRemove-txt remove">Remove</span>
      )}
      <img className="rec-img" src={RectIcon} alt="down-sideIcon" />
      {nft.numberOfEditions > 1 ? (
        <Popup
          trigger={<img className="del-img" src={crossSmall} alt="delete" aria-hidden="true" />}
        >
          {(close) => <EditionsRemovePopup onClose={close} data={data} nft={nft} />}
        </Popup>
      ) : (
        <img className="del-img" src={crossSmall} alt="delete" aria-hidden="true" />
      )}
    </div>
  </div>
);

WinnerNFT.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  nft: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default WinnerNFT;
