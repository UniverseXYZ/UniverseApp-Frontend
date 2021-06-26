import React, { useContext, useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { utils } from 'ethers';
import Tabs from '../tabs/Tabs';
import Button from '../button/Button';
import '../polymorphs/scramble/styles/PolymorphScramblePopup.scss';
import closeIcon from '../../assets/images/cross.svg';
import ethIcon from '../../assets/images/eth.svg';
import SelectComponent from '../select/SelectComponent';
import AppContext from '../../ContextAPI';
import { getPolymorphMeta } from '../../utils/api/polymorphs.js';
import { shortenEthereumAddress } from '../../utils/helpers/format.js';

const PolymorphScramblePopup = ({ onClose, polymorph, id, setPolymorph, setPolymorphGene }) => {
  const { selectedNftForScramble, polymorphContract } = useContext(AppContext);
  const [singleTraitTabSelected, setSingleTraitSelected] = useState(true);
  const [allTraitsTabSelected, setAllTraitsTabSelected] = useState(false);
  const [selectedTrait, setSelectedTrait] = useState(null);
  const [randomizeGenePrise, setRandomizeGenePrice] = useState('');

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
      name: 'Scramble all traits',
      active: allTraitsTabSelected,
      handler: () => {
        setSingleTraitSelected(false);
        setAllTraitsTabSelected(true);
      },
    },
  ];

  useEffect(async () => {
    try {
      const amount = await polymorphContract.randomizeGenomePrice();
      const formatedEther = utils.formatEther(amount);
      setRandomizeGenePrice(formatedEther);
    } catch (e) {
      alert(e);
    }
  }, []);

  const getRandomInt = (max) => Math.floor(Math.random() * max);

  const onScramble = async () => {
    onClose();
    document.getElementById('loading-hidden-btn').click();

    const traitsObj = {};

    if (singleTraitTabSelected) {
      if (selectedTrait.list.length !== 0) {
        traitsObj[selectedTrait.value] =
          selectedTrait.list[getRandomInt(selectedTrait.list.length)];
      }
    } else {
      try {
        if (!id) return;
        // Randomize Genom
        const amount = await polymorphContract.randomizeGenomePrice();
        const randomizeT = await polymorphContract.randomizeGenome(id, { value: amount });
        const randomizeR = await randomizeT.wait();
        console.log(randomizeR);

        // Update the view //

        // Get the new Meta
        const data = await getPolymorphMeta(id);
        setPolymorph(data);

        // Update the Gene
        const gene = await polymorphContract.geneOf(id);
        setPolymorphGene(shortenEthereumAddress(gene.toString()));

        // Close the modal
        document.getElementById('popup-root').remove();
        document.getElementById('scramble-hidden-btn').click();
      } catch (e) {
        alert(e);
      }
    }

    // setSelectedNftForScramble({
    //   ...selectedNftForScramble,
    //   ...traitsObj,
    // });
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
              <img src={polymorph?.data?.image} className="avatar-popup" alt="avatar" />
            </div>

            <div className="scramble--options--popup">
              <div className="name">{polymorph?.data?.name}</div>

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
                  Would you like to scramble your Polymorph into a brand new one? This will
                  randomize the genome, and reset the cost of a single trait scramble back to 0.01
                  ETH.
                </div>
              )}

              <div className="scramble--action">
                <div className="scramble--price">
                  <img src={ethIcon} alt="" /> {singleTraitTabSelected ? 0.02 : randomizeGenePrise}
                </div>
                <Button
                  className="light-button"
                  onClick={onScramble}
                  disabled={!selectedTrait && singleTraitTabSelected}
                >
                  Scramble
                </Button>
              </div>

              {singleTraitTabSelected ? (
                <div className="next-price-description">
                  * You’re about to morph the <b>Marine Pants</b>. Your next scramble will cost more
                  that last one. You have the same chance to receive the trait you already have as
                  the trait you may want.
                </div>
              ) : (
                <div className="next-price-description">
                  * This action might change your Character trait and can not be reversed later!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PolymorphScramblePopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  setPolymorph: PropTypes.func.isRequired,
  setPolymorphGene: PropTypes.func.isRequired,
  polymorph: PropTypes.oneOfType([PropTypes.object]).isRequired,
  id: PropTypes.string.isRequired,
};

export default PolymorphScramblePopup;
