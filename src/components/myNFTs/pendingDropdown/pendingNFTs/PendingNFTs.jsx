import React, { useMemo, useState, useEffect } from 'react';
import './PendingNFTs.scss';
import PropTypes from 'prop-types';
import Blockies from 'react-blockies';
import mp3Icon from '../../../../assets/images/mp3-icon.png';
import { useAuthContext } from '../../../../contexts/AuthContext';
import { SpinningLoader } from '../misc/SpinningLoader';
import PendingAccordion from '../pendingAccordion/PendingAccordion';
import universeIcon from '../../../../assets/images/universe-img.svg';
import { formatAddress } from '../../../../utils/helpers/format';

const PendingNFTs = ({ mintingNfts }) => {
  const { loggedInArtist, address } = useAuthContext();

  const [user, setUser] = useState(loggedInArtist);

  useEffect(() => {
    setUser(loggedInArtist);
  }, [loggedInArtist]);

  const generateLink = (addr) => `${process.env.REACT_APP_ETHERSCAN_URL}/tx/${addr}`;
  const renderMintingNfts = useMemo(
    () =>
      mintingNfts.map((nft) => (
        <div
          onClick={() => window.open(generateLink(nft.txHashes[0]), '_blank').focus()}
          className="nft__card"
          key={nft.id}
          style={{ width: 160 }}
          aria-hidden
        >
          {nft.txHashes.length === 1 ? (
            <span className="tooltiptext">View on Etherscan</span>
          ) : (
            <span className="tooltiptext-big">
              <p className="title"> View on Etherscan:</p>
              <div className="tooltiptext-big-body">
                {nft.txHashes.map((txHash, i) => (
                  <div className="txns" key={nft.txHash}>
                    <span>Txn{i + 1}:</span>
                    <a target="_blank" href={generateLink(txHash)} rel="noreferrer">
                      {formatAddress(txHash)}
                    </a>
                  </div>
                ))}
              </div>
            </span>
          )}

          <div className="nft__card__header">
            <div className="three__images">
              {user &&
              (user.avatar || (user.profileImageUrl && user.profileImageUrl.length > 48)) ? (
                <div className="creator--details">
                  <img src={user.avatar} alt="first" />
                </div>
              ) : (
                <div className="creator--details">
                  <Blockies className="blockie--details" seed={address} size={9} scale={3} />
                </div>
              )}

              <div className="collection--details">
                {nft.collection.address ===
                process.env.REACT_APP_UNIVERSE_ERC_721_ADDRESS.toLowerCase() ? (
                  <img src={universeIcon} alt={nft.collection.name} />
                ) : (
                  <img src={nft.collection?.coverUrl} alt="second" />
                )}
              </div>

              {user &&
              (user.avatar || (user.profileImageUrl && user.profileImageUrl.length > 48)) ? (
                <div className="owner--details">
                  <img src={user?.avatar} alt="last" />
                </div>
              ) : (
                <div className="owner--details">
                  <Blockies className="blockie--details" seed={address} size={9} scale={3} />
                </div>
              )}
            </div>
            <p className="nfts__qantity">{`${nft.numberOfEditions}/${nft.numberOfEditions}`}</p>
          </div>
          <div className="nft__card__body">
            <div className="loading-image">
              <div className="image__bg__effect" />
              {nft.artworkType &&
                !nft.artworkType.endsWith('mpeg') &&
                !nft.artworkType.endsWith('mp4') && <img src={nft.thumbnailUrl} alt={nft.name} />}
              {nft.artworkType && nft.artworkType.endsWith('mp4') && (
                <video>
                  <source src={nft.thumbnailUrl} type="video/mp4" />
                  <track kind="captions" />
                  Your browser does not support the video tag.
                </video>
              )}
              {nft.artworkType && nft.artworkType.endsWith('mpeg') && (
                <img className="nft--image" src={mp3Icon} alt={nft.name} />
              )}
              <SpinningLoader />
            </div>
          </div>
          <div className="nft__card__footer">
            <h1 className="nft__name">{nft.name}</h1>
          </div>
        </div>
      )),
    [mintingNfts.length]
  );

  return mintingNfts.length ? (
    <PendingAccordion title="Pending NFTs" dataLength={mintingNfts.length}>
      {renderMintingNfts}
    </PendingAccordion>
  ) : (
    <></>
  );
};

PendingNFTs.propTypes = {
  mintingNfts: PropTypes.oneOfType([PropTypes.array]).isRequired,
};
export default PendingNFTs;
