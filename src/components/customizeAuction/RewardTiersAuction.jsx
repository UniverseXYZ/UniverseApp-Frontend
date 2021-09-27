/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button.jsx';
import cloudIcon from '../../assets/images/ion_cloud.svg';
import defaultImage from '../../assets/images/default-img.svg';
import CustomColorPicker from './CustomColorPicker.jsx';
import { useAuctionContext } from '../../contexts/AuctionContext.jsx';

const RewardTiersAuction = ({ values, onChange, editButtonClick }) => {
  const { auction, bidtype } = useAuctionContext();
  const arrLength = auction.rewardTiers.length;
  const [elRefs, setElRefs] = useState([]);

  const handleDescriptionChange = (event, tierId) => {
    onChange((prevValues) =>
      prevValues.map((tier) => {
        if (tier.id === tierId && event.target.value.length <= 600) {
          return { ...tier, description: event.target.value };
        }
        return tier;
      })
    );
  };

  useEffect(() => {
    setElRefs((elr) =>
      Array(arrLength)
        .fill()
        .map((_, i) => elr[i] || React.createRef())
    );
  }, [arrLength]);

  const handleUploadImage = (event, tierId) => {
    onChange((prevValues) =>
      prevValues.map((tier) => {
        if (tier.id === tierId) {
          return { ...tier, tierImg: event.target.files[0] };
        }

        return tier;
      })
    );
  };

  return (
    <div className="reward__tiers">
      <h3>Reward Tiers</h3>
      {auction &&
        auction.rewardTiers.map((tier, i) => {
          // eslint-disable-next-line react/prop-types
          const checkTier = values.find((valuesTier) => valuesTier.id === tier.id);
          const image = checkTier ? checkTier.tierImg : null;
          const description = checkTier ? checkTier.description : null;

          return (
            <div key={tier.id} className="customize__auction__tier">
              <div className="tier__header">
                <div className="tier__title">
                  <h4>{tier.name}</h4>
                  {window.innerWidth < 576 && (
                    <div className="pick__color">
                      <p>Pick tier color</p>
                      <CustomColorPicker index={i} onChange={onChange} onColor={tier.color} />
                    </div>
                  )}
                  <div className="tier__description">
                    <div className="winners">
                      Winners: <b>{tier.winners}</b>
                    </div>
                    <div className="winners">
                      NFTs per winner: <b>{tier.nftsPerWinner}</b>
                    </div>
                    {tier.minBidValue ? (
                      <div className="winners">
                        Minimum bid per tier:
                        <b>
                          {` ${tier.minBidValue}`} {bidtype}
                        </b>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                {window.innerWidth > 576 && (
                  <div className="pick__color">
                    <p>Pick tier color</p>
                    <CustomColorPicker index={i} onChange={onChange} onColor={tier.color} />
                  </div>
                )}
              </div>

              <div className="tier__body">
                <div className="custom__description">
                  <div className="custom__description__title">
                    <h4>Custom description</h4>
                    <p>
                      {values[i].description ? values[i].description.length : 0}
                      /600
                    </p>
                  </div>
                  <textarea
                    className={editButtonClick && !description ? 'inp error-inp' : 'inp'}
                    placeholder="Enter the description"
                    // eslint-disable-next-line react/prop-types
                    value={description}
                    onChange={(event) => handleDescriptionChange(event, tier.id)}
                  />
                  {editButtonClick && !description && (
                    <p className="error__text">Fill out the description</p>
                  )}
                  {values[i].description?.length >= 600 && (
                    <p className="warning-text">You have reached the max amount of symbols</p>
                  )}
                </div>
                <div className="upload__image">
                  <h4>Upload tier image (optional)</h4>
                  <div className="upload__image__div">
                    <div className="upload__image__description">
                      <img className="cloud__icon" src={cloudIcon} alt="Cloud" />
                      <h5>Drop your file here</h5>
                      <p>(min 800x800px, PNG/JPEG, max 3mb)</p>
                      <Button
                        className="light-border-button"
                        onClick={() => elRefs[i].current.click()}
                      >
                        Choose file
                      </Button>
                      <input
                        type="file"
                        className="inp-disable"
                        ref={elRefs[i]}
                        onChange={(e) => handleUploadImage(e, tier.id)}
                      />
                    </div>
                    <div className="upload__image__preview">
                      <h6>Preview</h6>
                      <div className="preview-div">
                        {image ? (
                          <img
                            src={URL.createObjectURL(image)}
                            className="preview__image"
                            alt="Platinum"
                          />
                        ) : (
                          <img
                            className="default__upload__image"
                            src={defaultImage}
                            alt="default"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

RewardTiersAuction.propTypes = {
  values: PropTypes.exact({
    description: PropTypes.string.isRequired,
    tierImg: PropTypes.oneOfType([PropTypes.any]),
  }),
  onChange: PropTypes.func.isRequired,
  editButtonClick: PropTypes.bool,
};

RewardTiersAuction.defaultProps = {
  values: [],
  editButtonClick: false,
};

export default RewardTiersAuction;
