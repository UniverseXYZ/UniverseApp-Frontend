import React, { useRef, useState } from 'react';
import Button from '../button/Button';
import cloudIcon from '../../assets/images/ion_cloud.svg';
import defaultImage from '../../assets/images/default-img.svg';
import CustomColorPicker from './CustomColorPicker';

const RewardTiersAuction = () => {
  const inputPlatinum = useRef(null);
  const inputGold = useRef(null);
  const inputSilver = useRef(null);

  const [platinumImage, setPlatinumImage] = useState(null);
  const [goldImage, setGoldImage] = useState(null);
  const [silverImage, setSilverImage] = useState(null);

  const [platinumDescription, setPlatinumDescription] = useState('');
  const [goldDescription, setGoldDescription] = useState('');
  const [silverDescription, setSilverDescription] = useState('');

  return (
    <div className="reward__tiers">
      <h3>Reward tiers</h3>

      <div className="customize__auction__tier">
        <div className="tier__header">
          <div className="tier__title">
            <h4>Platinum tier</h4>
            <div className="pick__color">
              <CustomColorPicker />
              <p>Pick tier color</p>
            </div>
            <div className="tier__description">
              <div className="winners">
                Winners: <b>5</b>
              </div>
              <div className="winners">
                NFTs per winner: <b>3</b>
              </div>
              <div className="winners">
                Minimum bid per tier: <b>40 ETH</b>
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
              onChange={(e) => setPlatinumDescription(e.target.value)}
            />
            {platinumDescription.length === 0 && (
              <p className="error__text">Fill out the description</p>
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
                  onClick={() => inputPlatinum.current.click()}
                >
                  Choose file
                </Button>
                <input
                  type="file"
                  className="inp-disable"
                  ref={inputPlatinum}
                  onChange={(e) => setPlatinumImage(e.target.files[0])}
                />
              </div>
              <div className="upload__image__preview">
                <h6>Preview</h6>
                <div className="preview-div">
                  {platinumImage ? (
                    <img
                      src={URL.createObjectURL(platinumImage)}
                      className="preview__image"
                      alt="Platinum"
                    />
                  ) : (
                    <img className="default__upload__image" src={defaultImage} alt="default" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="customize__auction__tier">
        <div className="tier__header">
          <div className="tier__title">
            <h4>Gold tier</h4>
            <div className="pick__color">
              <CustomColorPicker />
              <p>Pick tier color</p>
            </div>
            <div className="tier__description">
              <div className="winners">
                Winners: <b>10</b>
              </div>
              <div className="winners">
                NFTs per winner: <b>2</b>
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
              onChange={(e) => setGoldDescription(e.target.value)}
            />
            {goldDescription.length === 0 && (
              <p className="error__text">Fill out the description</p>
            )}
          </div>
          <div className="upload__image">
            <h4>Upload tier image (optional)</h4>
            <div className="upload__image__div">
              <div className="upload__image__description">
                <img className="cloud__icon" src={cloudIcon} alt="Cloud" />
                <h5>Drop your file here</h5>
                <p>(min 800x800px, PNG/JPEG, max 3mb)</p>
                <Button className="light-border-button" onClick={() => inputGold.current.click()}>
                  Choose file
                </Button>
                <input
                  type="file"
                  className="inp-disable"
                  ref={inputGold}
                  onChange={(e) => setGoldImage(e.target.files[0])}
                />
              </div>
              <div className="upload__image__preview">
                <h6>Preview</h6>
                <div className="preview-div">
                  {goldImage ? (
                    <img
                      className="preview__image"
                      src={URL.createObjectURL(goldImage)}
                      alt="Gold"
                    />
                  ) : (
                    <img className="default__upload__image" src={defaultImage} alt="Default" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="customize__auction__tier">
        <div className="tier__header">
          <div className="tier__title">
            <h4>Silver tier</h4>
            <div className="pick__color">
              <CustomColorPicker />
              <p>Pick tier color</p>
            </div>
            <div className="tier__description">
              <div className="winners">
                Winners: <b>20</b>
              </div>
              <div className="winners">
                NFTs per winner: <b>1</b>
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
              onChange={(e) => setSilverDescription(e.target.value)}
            />
            {silverDescription.length === 0 && (
              <p className="error__text">Fill out the description</p>
            )}
          </div>
          <div className="upload__image">
            <h4>Upload tier image (optional)</h4>
            <div className="upload__image__div">
              <div className="upload__image__description">
                <img className="cloud__icon" src={cloudIcon} alt="Cloud" />
                <h5>Drop your file here</h5>
                <p>(min 800x800px, PNG/JPEG, max 3mb)</p>
                <Button className="light-border-button" onClick={() => inputSilver.current.click()}>
                  Choose file
                </Button>
                <input
                  type="file"
                  className="inp-disable"
                  ref={inputSilver}
                  onChange={(e) => setSilverImage(e.target.files[0])}
                />
              </div>
              <div className="upload__image__preview">
                <h6>Preview</h6>
                <div className="preview-div">
                  {silverImage ? (
                    <img
                      className="preview__image"
                      src={URL.createObjectURL(silverImage)}
                      alt="Silver"
                    />
                  ) : (
                    <img className="default__upload__image" src={defaultImage} alt="Default" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardTiersAuction;
