/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import Popup from 'reactjs-popup';
import CarouselForNfts from '../carouselForNfts/corouselForNfts';
import mp3Icon from '../../assets/images/mp3-icon.png';
import crossSmall from '../../assets/images/nft-cross.svg';
import RectIcon from '../../assets/images/selectedNft-rect.svg';
import Button from '../button/Button.jsx';
import EditionsRemovePopup from '../popups/EditionsRemovePopup.jsx';
import SelectComponent from '../stickyBarWinnerSelect';

const CreatTiersStickyBar = ({
  winnersData,
  tierSettings,
  handleContinue,
  disabled,
  onRemoveEdition,
  selectedWinner,
  setSelectedWinner,
}) => {
  const [winnersOptions, setWinnersOptions] = useState([
    { value: 0, label: 'Winner #1', nftsCount: 0 },
  ]);
  const [totalNFTsCount, seTotalNFTsCount] = useState(0);

  useEffect(() => {
    const options = winnersData.map((winner) => ({
      value: winner.slot,
      label: `Winner #${winner.slot + 1}`,
      nftsCount: winner.nftIds.length,
    }));

    let nftsCount = 0;

    options.forEach((o) => {
      nftsCount += o.nftsCount;
    });

    seTotalNFTsCount(nftsCount);
    setWinnersOptions(options);
  }, [winnersData]);

  return (
    <div className="selected-ntf create-tiers-sticky-bar">
      <div className="container selected-body">
        <div className="winners-and-totals-mobile">
          <span>Winners : {winnersData.length}</span>
          <span>Total NFTs : {totalNFTsCount}</span>
        </div>
        <div className="select-component-tablet">
          <SelectComponent
            options={winnersOptions}
            onChange={(data) => setSelectedWinner(data.value)}
            selectedWinner={selectedWinner}
          />
        </div>
        <div className="infoSelect-div">
          <CarouselForNfts
            winnersData={winnersData}
            selectedWinner={selectedWinner}
            onRemoveEdition={onRemoveEdition}
          />
        </div>
        <div className="sel-info">
          <div className="winners-and-totals">
            <span>Winners : {winnersData.length}</span>
            <span>Total NFTs : {totalNFTsCount}</span>
          </div>
          <div className="continue-nft">
            <div className="select-component-mobile">
              <SelectComponent
                options={winnersOptions}
                onChange={(data) => setSelectedWinner(data.value)}
                selectedWinner={selectedWinner}
              />
            </div>
            <Button
              onClick={() => handleContinue(winnersData)}
              disabled={!disabled}
              className="light-button"
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

CreatTiersStickyBar.propTypes = {
  winnersData: PropTypes.oneOfType([PropTypes.array]).isRequired,
  tierSettings: PropTypes.oneOfType([PropTypes.object]).isRequired,
  handleContinue: PropTypes.func.isRequired,
  setSelectedWinner: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  onRemoveEdition: PropTypes.func.isRequired,
  selectedWinner: PropTypes.number.isRequired,
};

export default CreatTiersStickyBar;
