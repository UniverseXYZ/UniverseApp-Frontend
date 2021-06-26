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

const GENE_POSITIONS_MAP = {
  PANTS: 2,
  TORSO: 3,
  FOOTWEAR: 4,
  FACE: 5,
  HEAD: 6,
  RIGHT_WEAPON: 7,
  LEFT_WEAPON: 8,
};

const WEAR_TO_GENE_POSITION_MAP = {
  Pants: GENE_POSITIONS_MAP.PANTS,
  Torso: GENE_POSITIONS_MAP.TORSO,
  Footwear: GENE_POSITIONS_MAP.FOOTWEAR,
  Eyewear: GENE_POSITIONS_MAP.FACE,
  Headwear: GENE_POSITIONS_MAP.HEAD,
  WeaponRight: GENE_POSITIONS_MAP.RIGHT_WEAPON,
  WeaponLeft: GENE_POSITIONS_MAP.LEFT_WEAPON,
};

const PolymorphScramblePopup = ({ onClose, polymorph, id, setPolymorph, setPolymorphGene }) => {
  const { convertPolymorphObjects, polymorphContract, userPolymorphs, setUserPolymorphs } =
    useContext(AppContext);
  const [singleTraitTabSelected, setSingleTraitSelected] = useState(true);
  const [allTraitsTabSelected, setAllTraitsTabSelected] = useState(false);
  const [selectedTrait, setSelectedTrait] = useState('');
  const [randomizeGenePrise, setRandomizeGenePrice] = useState('');
  const [morphSingleGenePrise, setMorphSingleGenePrice] = useState('');

  const traitableAttributes = polymorph.data.attributes.filter(
    (attr) => WEAR_TO_GENE_POSITION_MAP[attr.trait_type]
  );
  const traits = traitableAttributes.map((attr) => ({
    label: attr.trait_type,
    value: attr.trait_type,
  }));

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
      // Fetch randomize Price
      const amount = await polymorphContract.randomizeGenomePrice();
      const formatedEther = utils.formatEther(amount);
      setRandomizeGenePrice(formatedEther);

      // Fetch single genom change price
      const genomChangePrice = await polymorphContract.priceForGenomeChange(id);
      const genomChangePriceToEther = utils.formatEther(genomChangePrice);
      setMorphSingleGenePrice(genomChangePriceToEther);
    } catch (e) {
      alert(e);
    }
  }, []);

  const onScramble = async () => {
    onClose();
    document.getElementById('loading-hidden-btn').click();

    try {
      if (singleTraitTabSelected) {
        // Take the Gene Position
        const genePosition = WEAR_TO_GENE_POSITION_MAP[selectedTrait?.label];
        if (!genePosition) {
          alert('There is no such Gene !');
          return;
        }

        // Morph a Gene
        const genomeChangePrice = await polymorphContract.priceForGenomeChange(id);
        const morphGeneT = await polymorphContract.morphGene(id, genePosition, {
          value: genomeChangePrice,
        });
        await morphGeneT.wait();
      } else {
        if (!id) return;
        // Randomize Genom
        const amount = await polymorphContract.randomizeGenomePrice();
        const randomizeT = await polymorphContract.randomizeGenome(id, { value: amount });
        await randomizeT.wait();
      }
      // Update the view //

      // Get the new Meta
      const data = await getPolymorphMeta(id);
      setPolymorph(data);

      // Update the Gene
      const gene = await polymorphContract.geneOf(id);
      setPolymorphGene(shortenEthereumAddress(gene.toString()));

      // Update userPolymorphs
      const newPolymorph = convertPolymorphObjects([data]);
      const updatedPolymorphs = userPolymorphs.map((existingPolymorph) => {
        if (existingPolymorph.id === newPolymorph[0].id) {
          return newPolymorph[0];
        }
        return existingPolymorph;
      });

      setUserPolymorphs(updatedPolymorphs);

      // Close the modal
      document.getElementById('popup-root').remove();
      document.getElementById('scramble-hidden-btn').click();
    } catch (err) {
      alert(err.message || err);
    }
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
                    Mutating a single trait means you can morph a hat or morph a torso. This option will only morph 1
                    gene.
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
                  <img src={ethIcon} alt="" />
                  {singleTraitTabSelected ? morphSingleGenePrise : randomizeGenePrise}
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
