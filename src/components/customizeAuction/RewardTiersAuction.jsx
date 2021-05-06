import React, { useRef, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';
import cloudIcon from '../../assets/images/ion_cloud.svg';
import defaultImage from '../../assets/images/default-img.svg';
import CustomColorPicker from './CustomColorPicker';
import AppContext from '../../ContextAPI';

const RewardTiersAuction = ({ values, onChange }) => {
  const { auction, setAuction, bidtype } = useContext(AppContext);
  const arrLength = auction.tiers.length;
  const [elRefs, setElRefs] = useState([]);

  const handleDescriptionChange = (event, tierId) => {
    onChange((prevValues) =>
      prevValues.map((tier) => {
        if (tier.id === tierId) {
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
        auction.tiers.map((tier, i) => {
          // eslint-disable-next-line react/prop-types
          const image = values.find((valuesTier) => valuesTier.id === tier.id).tierImg;

          return (
            <div key={tier.id} className="customize__auction__tier">
              <div className="tier__header">
                <div className="tier__title">
                  <h4>{tier.name}</h4>
                  <div className="pick__color">
                    <CustomColorPicker />
                    <p>Pick tier color</p>
                  </div>
                  <div className="tier__description">
                    <div className="winners">
                      Winners: <b>{tier.winners}</b>
                    </div>
                    <div className="winners">
                      NFTs per winner: <b>{tier.nftsPerWinner}</b>
                    </div>
                    <div className="winners">
                      Minimum bid per tier:{' '}
                      <b>
                        {tier.minBid} {bidtype && bidtype}
                      </b>
                    </div>
                  </div>
                </div>
                <div className="pick__color">
                  <p>Pick tier color</p>
                  <CustomColorPicker />
                </div>
              </div>

              <div className="tier__body">
                <div className="custom__description">
                  <div className="custom__description__title">
                    <h4>Custom description</h4>
                    <p>0/600</p>
                  </div>
                  <textarea
                    className="inp"
                    placeholder="Enter the description"
                    // eslint-disable-next-line react/prop-types
                    value={values.find((valuesTier) => valuesTier.id === tier.id).description}
                    onChange={(event) => handleDescriptionChange(event, tier.id)}
                  />
                  <p className="error__text">Fill out the description</p>
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
};

RewardTiersAuction.defaultProps = {
  values: [],
};

export default RewardTiersAuction;
