import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '../tabs/Tabs';
import Button from '../button/Button';
import '../polymorphs/scramble/styles/PolymorphScramblePopup.scss';
import closeIcon from '../../assets/images/cross.svg';
import ethIcon from '../../assets/images/eth.svg';
import SelectComponent from '../select/SelectComponent';
import AppContext from '../../ContextAPI';
import person from '../../assets/images/randomise-person-images/person.png';

const PolymorphScramblePopup = ({ onClose }) => {
  const { selectedNftForScramble, setSelectedNftForScramble } = useContext(AppContext);
  const [singleTraitTabSelected, setSingleTraitSelected] = useState(true);
  const [allTraitsTabSelected, setAllTraitsTabSelected] = useState(false);
  const [selectedTrait, setSelectedTrait] = useState(null);

  const traits = [
    {
      label: 'Headwear',
      value: 'headWear',
      list: require
        .context('../../assets/images/randomise-person-images/headwears-img', false, /\.(png|svg)$/)
        .keys()
        .map(
          require.context(
            '../../assets/images/randomise-person-images/headwears-img',
            false,
            /\.(png|svg)$/
          )
        )
        .map((m) => m.default),
    },
    {
      label: 'Eyewear',
      value: 'eyeWear',
      list: require
        .context('../../assets/images/randomise-person-images/glasses-img', false, /\.(png|svg)$/)
        .keys()
        .map(
          require.context(
            '../../assets/images/randomise-person-images/glasses-img',
            false,
            /\.(png|svg)$/
          )
        )
        .map((m) => m.default),
    },
    {
      label: 'Torso',
      value: 'torso',
      list: require
        .context('../../assets/images/randomise-person-images/torso-img', false, /\.(png|svg)$/)
        .keys()
        .map(
          require.context(
            '../../assets/images/randomise-person-images/torso-img',
            false,
            /\.(png|svg)$/
          )
        )
        .map((m) => m.default),
    },
    {
      label: 'Pants',
      value: 'pants',
      list: require
        .context('../../assets/images/randomise-person-images/pants-img', false, /\.(png|svg)$/)
        .keys()
        .map(
          require.context(
            '../../assets/images/randomise-person-images/pants-img',
            false,
            /\.(png|svg)$/
          )
        )
        .map((m) => m.default),
    },
    {
      label: 'Footwear',
      value: 'footWear',
      list: require
        .context('../../assets/images/randomise-person-images/shoes-img', false, /\.(png|svg)$/)
        .keys()
        .map(
          require.context(
            '../../assets/images/randomise-person-images/shoes-img',
            false,
            /\.(png|svg)$/
          )
        )
        .map((m) => m.default),
    },
    {
      label: 'Left-hand accessory',
      value: 'leftHand',
      list: require
        .context(
          '../../assets/images/randomise-person-images/leftHand-images',
          false,
          /\.(png|svg)$/
        )
        .keys()
        .map(
          require.context(
            '../../assets/images/randomise-person-images/leftHand-images',
            false,
            /\.(png|svg)$/
          )
        )
        .map((m) => m.default),
    },
    {
      label: 'Right-hand accessory',
      value: 'rightHand',
      list: require
        .context(
          '../../assets/images/randomise-person-images/rightHand-images',
          false,
          /\.(png|svg)$/
        )
        .keys()
        .map(
          require.context(
            '../../assets/images/randomise-person-images/rightHand-images',
            false,
            /\.(png|svg)$/
          )
        )
        .map((m) => m.default),
    },
    {
      label: 'Background',
      value: 'background',
      list: require
        .context(
          '../../assets/images/randomise-person-images/background-img',
          false,
          /\.(png|svg)$/
        )
        .keys()
        .map(
          require.context(
            '../../assets/images/randomise-person-images/background-img',
            false,
            /\.(png|svg)$/
          )
        )
        .map((m) => m.default),
    },
  ];

  const tabs = [
    {
      name: 'Scramble single trait',
      active: singleTraitTabSelected,
      handler: () => {
        setSingleTraitSelected(true);
        setAllTraitsTabSelected(false);
      },
    },
    {
      name: 'Scramble all trait',
      active: allTraitsTabSelected,
      handler: () => {
        setSingleTraitSelected(false);
        setAllTraitsTabSelected(true);
      },
    },
  ];

  const getRandomInt = (max) => Math.floor(Math.random() * max);

  const onScramble = () => {
    onClose();

    document.getElementById('loading-hidden-btn').click();

    setTimeout(() => {
      document.getElementById('popup-root').remove();
      document.getElementById('scramble-hidden-btn').click();
    }, 2000);

    const traitsObj = {};

    if (singleTraitTabSelected) {
      if (selectedTrait.list.length !== 0) {
        traitsObj[selectedTrait.value] =
          selectedTrait.list[getRandomInt(selectedTrait.list.length)];
      }
    } else {
      // eslint-disable-next-line no-restricted-syntax
      for (const trait of traits) {
        if (trait.list.length !== 0) {
          traitsObj[trait.value] = trait.list[getRandomInt(trait.list.length)];
        }
      }
    }
    console.log('traits', traitsObj);
    setSelectedNftForScramble({
      ...selectedNftForScramble,
      ...traitsObj,
    });
  };

  return (
    <div className="scramble-popup">
      <button type="button" className="popup-close" onClick={onClose}>
        <img src={closeIcon} alt="" />
      </button>
      <div className="scramble-popup-div">
        <div className="scramble--popup">
          <div className="scramble--popup--content">
            <div className="avatar-wrapper-popup">
              <img src={person} className="avatar-popup" alt="avatar" />
            </div>

            <div className="scramble--options--popup">
              <div className="name">{selectedNftForScramble.name}</div>

              <Tabs items={tabs} />
              {singleTraitTabSelected ? (
                <>
                  <div className="description">
                    Mutating a single trait means you can morph a hat or morph a torso. This option
                    will only morph 1 gene.
                  </div>

                  <div className="traits--popup">
                    <SelectComponent
                      options={traits}
                      onChange={(trait) => setSelectedTrait(trait)}
                      placeholder="Pick a trait type to scramble"
                      value={selectedTrait}
                    />
                  </div>
                </>
              ) : (
                <div className="description">
                  This option will scramble all the genes and give you a completely new polymorph
                  style.
                </div>
              )}

              <div className="scramble--action">
                <div className="scramble--price">
                  <img src={ethIcon} alt="" /> {singleTraitTabSelected ? 0.02 : 0.16}
                </div>
                <Button
                  className="light-button"
                  onClick={onScramble}
                  disabled={!selectedTrait && singleTraitTabSelected}
                >
                  Scramble
                </Button>
              </div>

              <div className="next-price-description">
                * Your next scramble will cost more that last one
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PolymorphScramblePopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default PolymorphScramblePopup;
