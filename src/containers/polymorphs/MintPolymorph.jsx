import React, { useState, useEffect, useContext } from 'react';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import uuid from 'react-uuid';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { utils, BigNumber, FixedNumber } from 'ethers';
import WelcomeWrapper from '../../components/ui-elements/WelcomeWrapper';
import Section2HorizontalScroll from '../../components/polymorphs/mint-polymorph/Section2HorizontalScroll';
import BondingCurve from '../../components/polymorphs/mint-polymorph/BondingCurve';
import Section3Randomise from '../../components/polymorphs/mint-polymorph/Section3Randomise';
import './MintPolymorph.scss';
import AppContext from '../../ContextAPI';
import MintPolymorphConfirmationPopup from '../../components/popups/MintPolymorphConfirmationPopup.jsx';
import LoadingPopup from '../../components/popups/LoadingPopup.jsx';

const MintPolymorph = () => {
  const { setDarkMode } = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);
  const [sliderValue, setSliderValue] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [mintedTokens, setMintedTokens] = useState([]);
  const [mintedPolymorphs, setMintedPolymorphs] = useState([]);
  const [loaderTriggerID, setLoaderTriggerId] = useState(uuid());
  const [totalMintedValue, setTotalMintedValue] = useState(0);
  const [showMintConfirmationPopup, setShowMintConfirmationPopup] = useState(false);
  const [showLoadingPopup, setShowLoadingPopup] = useState(false);

  const {
    polymorphContract,
    totalPolymorphs,
    setTotalPolymorphs,
    polymorphBaseURI,
    signer,
    connectWeb3,
    address,
    convertPolymorphObjects,
    userPolymorphs,
    setUserPolymorphs,
  } = useContext(AppContext);

  useEffect(() => {
    setTotalMintedValue(value);
  }, [value]);

  useEffect(() => {
    setDarkMode(true);
  }, []);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    if (+window.innerWidth <= 576) setMobile(true);
    else setMobile(false);
  }, []);

  const fetchTokensMetadataJson = async (metadataURIs) => {
    const metadataPromises = [];
    for (let i = 0; i < metadataURIs?.length; i += 1) {
      metadataPromises.push(axios(metadataURIs[i]));
    }
    return Promise.all(metadataPromises);
  };

  const mintPolymorphs = async (amount) => {
    if (!polymorphContract) {
      try {
        await connectWeb3();
      } catch (err) {
        alert(err.message || error);
      }
    }

    if (!polymorphContract) return;

    const mintedIds = [];
    const overrideOptions = {
      value: BigNumber.from((utils.parseEther(price.toString()) * amount).toString()),
    };

    try {
      const mintTx = await polymorphContract?.functions['bulkBuy(uint256)'](
        amount,
        overrideOptions
      );

      setShowLoadingPopup(true);

      const receipt = await mintTx?.wait();
      // eslint-disable-next-line no-restricted-syntax
      for (const event of receipt.events) {
        if (event.event !== 'Transfer') {
          // eslint-disable-next-line no-continue
          continue;
        }
        mintedIds.push(event.args.tokenId.toString());
      }

      const metadataURIs = mintedIds.map(
        (id) =>
          `https://us-central1-polymorphmetadata.cloudfunctions.net/images-function-ropsten?id=${id}`
      );
      const nftMetadataObjects = await fetchTokensMetadataJson(metadataURIs);

      setMintedTokens(nftMetadataObjects);
      const polymorphNFTs = userPolymorphs.concat(convertPolymorphObjects(nftMetadataObjects));
      setMintedPolymorphs(polymorphNFTs);
      setTotalMintedValue(totalPolymorphs + quantity);

      setShowLoadingPopup(false);
      setShowMintConfirmationPopup(true);
    } catch (err) {
      alert(err.message || error);
    }
  };

  return (
    <div className="mint--polymorph">
      <WelcomeWrapper
        title="Mint a Morph"
        hintText="Mint a polymorph with its own unique genetic code. Once you have minted a morph, you will be able to scramble and morph its genes as you please. All the traits in a polymorph can be altered by scrambling."
        ellipsesLeft={false}
        ellipsesRight={false}
        bgTextLeft
        bgTextRight
      >
        <BondingCurve
          setValue={setSliderValue}
          value={10000}
          max={10000}
          mobile={mobile}
          blur
          quantity={quantity}
          setQuantity={setQuantity}
          light={false}
          price={0.0777}
          trailingZeros={4}
          mintAction={mintPolymorphs}
        />
      </WelcomeWrapper>
      <Section2HorizontalScroll width={windowSize.width} height={windowSize.height} />
      <Section3Randomise mobile={mobile} />
      <div className="section4">
        <AnimatedOnScroll animationIn="fadeIn" animationInDelay={200}>
          <div className="section4--child">
            <BondingCurve
              setValue={setSliderValue}
              value={10000}
              colorPriceIcon="black"
              color1="black"
              color2="black"
              max={10000}
              mobile={mobile}
              quantity={quantity}
              setQuantity={setQuantity}
              light
              price={0.0777}
              trailingZeros={4}
              mintAction={mintPolymorphs}
            />
          </div>
        </AnimatedOnScroll>
      </div>
      <Popup closeOnDocumentClick={false} open={showLoadingPopup}>
        <LoadingPopup onClose={() => setShowLoadingPopup(false)} />
      </Popup>
      <Popup closeOnDocumentClick={false} open={showMintConfirmationPopup}>
        {(close) => (
          <MintPolymorphConfirmationPopup
            onClose={() => setShowMintConfirmationPopup(false)}
            quantity={quantity}
            mintedNFTs={mintedTokens}
          />
        )}
      </Popup>
    </div>
  );
};

export default MintPolymorph;
