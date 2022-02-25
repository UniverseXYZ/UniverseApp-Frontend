import React, { useState, useEffect, useContext } from 'react';
import './SelectNfts.scss';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../button/Button';
import closeIconWhite from '../../../assets/images/marketplace/close.svg';
import mp3Icon from '../../../assets/images/mp3-icon.png';
import AppContext from '../../../ContextAPI';
import SearchFilters from '../../nft/SearchFilters';
import NFTCard from '../../nft/NFTCard';

const SelectNfts = (props) => {
  const { myNFTs, setSellNFTBundleDutchAuctionData } = useContext(AppContext);
  const { stepData, setStepData, bundleData } = props;
  const [selectedNFTsIds, setSelectedNFTsIds] = useState([]);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState([]);
  const history = useHistory();

  const clickContinue = () => {
    let dataBundleSale = bundleData;
    dataBundleSale = { ...dataBundleSale, selectedNfts: selectedGalleryItem };
    setStepData({ ...stepData, settings: { ...dataBundleSale } });
    setSellNFTBundleDutchAuctionData(bundleData);
    history.push('/nft-marketplace/summary');
  };

  useEffect(() => {
    const getSelectedNFTs = [];
    myNFTs.forEach((nft) => {
      if (selectedNFTsIds.includes(nft.id)) {
        getSelectedNFTs.push(nft);
      }
    });
    setSelectedGalleryItem(getSelectedNFTs);
  }, [selectedNFTsIds]);

  return (
    <div className="select--nfts--container">
      {stepData.selectedItem !== 'single' ? (
        <>
          <div className="section--title--block">
            <h3 className="section--title">Select NFTs</h3>
            <p className="section--hint--text">
              You can only select minted NFTs from your wallet. If you want to create NFTs, go to
              <Link to="/my-nfts">Minting</Link>.
            </p>
          </div>
          {myNFTs.filter((nft) => !nft.hidden).length ? (
            <>
              <SearchFilters data={myNFTs} />
              <div className="nfts__lists">
                {myNFTs
                  .filter((nft) => !nft.hidden)
                  .map((nft) => (
                    <NFTCard
                      key={nft.id}
                      nft={nft}
                      canSelect
                      selectedNFTsIds={selectedNFTsIds}
                      setSelectedNFTsIds={setSelectedNFTsIds}
                    />
                  ))}
              </div>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
      <div className="select--nfts--footer">
        <div className="select--nfts--footer--container">
          <div className="selected--nft--block">
            {selectedGalleryItem.map((elem, index) => (
              <div className="selected--nft--item" key={elem}>
                {elem.media.type === 'image/png' && (
                  <img src={URL.createObjectURL(elem.media)} alt="img" />
                )}
                {elem.media.type === 'audio/mpeg' && <img src={mp3Icon} alt="img" />}
                {elem.media.type === 'video/mp4' && (
                  <video
                    onMouseOver={(event) => event.target.play()}
                    onFocus={(event) => event.target.play()}
                    onMouseOut={(event) => event.target.pause()}
                    onBlur={(event) => event.target.pause()}
                    muted
                  >
                    <source src={URL.createObjectURL(elem.media)} type="video/mp4" />
                    <track kind="captions" />
                    Your browser does not support the video tag.
                  </video>
                )}
                <div
                  className="close--icon"
                  aria-hidden="true"
                  onClick={() => setSelectedNFTsIds(selectedNFTsIds.filter((i) => i !== elem.id))}
                >
                  <img src={closeIconWhite} alt="img" />
                </div>
              </div>
            ))}
          </div>
          <div className="buttons--group">
            <Button
              className="light-border-button"
              onClick={() => history.push('/nft-marketplace/select-method')}
            >
              Back
            </Button>
            <Button
              className="light-button"
              disabled={
                !bundleData.startPrice || !bundleData.bundleName || !selectedGalleryItem.length
              }
              onClick={clickContinue}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

SelectNfts.propTypes = {
  stepData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setStepData: PropTypes.func,
  bundleData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

SelectNfts.defaultProps = {
  setStepData: () => {},
};

export default SelectNfts;
