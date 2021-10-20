import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NFTsingle from '../../../../assets/images/howItWork/NFTsingle.png';
import NFTcollection from '../../../../assets/images/NFTcollection.png';
import Button from '../../../button/Button';
import minting from '../../../../assets/images/howItWork/AuctionMinting.png';
import myNFTs from '../../../../assets/images/howItWork/myNFTs.png';

const MintingTab = () => {
  const [isFirstAccordionOpened, setIsFirstAccordionOpened] = useState(true);
  const [isSecondAccordionOpened, setIsSecondAccordionOpened] = useState(false);
  const [isThirdAccordionOpened, setIsThirdAccordionOpened] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      if (document.querySelectorAll('.accordion__item__body')) {
        const elems = document.querySelectorAll('.accordion__item__body');
        elems.forEach((el, i) => {
          el.style.animationDuration = '.5s';
        });
      }
    }, 500);
  }, []);

  return (
    <div className="accordion">
      <div
        className={`accordion__item ${isFirstAccordionOpened ? 'opened' : ''}`}
        onClick={() => setIsFirstAccordionOpened(!isFirstAccordionOpened)}
        aria-hidden="true"
      >
        <div className="accordion__item__header">
          <div className="toggle">
            <span className="horizontal" />
            {!isFirstAccordionOpened && <span className="vertical" />}
          </div>
          <h2 className="title">Create single NFTs or organise NFT collections</h2>
        </div>
        <div className={`accordion__item__body ${isFirstAccordionOpened ? 'open' : ''}`}>
          <div className="dropdown-info">
            <p>
              Create a single NFT or mint a large collection that you have been creating for months.
              Our tools give you easy formatting and editing options to easily curate a perfect
              collection before you launch. Eliminate mistakes with our review process.
            </p>
            <div className="image-section">
              <div>
                <img src={NFTsingle} alt="single" />
              </div>
              <div>
                <img src={NFTcollection} alt="collection" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`accordion__item middle ${isSecondAccordionOpened ? 'opened' : ''}`}
        onClick={() => setIsSecondAccordionOpened(!isSecondAccordionOpened)}
        aria-hidden="true"
      >
        <div className="accordion__item__header">
          <div className="toggle">
            <span className="horizontal" />
            {!isSecondAccordionOpened && <span className="vertical" />}
          </div>
          <h2 className="title">Upload images, audio or video, and fill the meta data</h2>
        </div>
        <div className={`accordion__item__body ${isSecondAccordionOpened ? 'open' : ''}`}>
          <div className="dropdown-info-middle">
            <p>
              NFTs are empowering because they do not limit any type of artists. Files are not
              limited and you can turn a painting, video, song, beat, sound, picture, drawing, .gif
              or anything that your creative mind can think of into an NFT. The possibilities are
              endless with art and the Universe.
            </p>
            <img src={minting} alt="mint" />
          </div>
        </div>
      </div>
      <div
        className={`accordion__item last ${isThirdAccordionOpened ? 'opened' : ''}`}
        onClick={() => setIsThirdAccordionOpened(!isThirdAccordionOpened)}
        aria-hidden="true"
      >
        <div className="accordion__item__header">
          <div className="toggle">
            <span className="horizontal" />
            {!isThirdAccordionOpened && <span className="vertical" />}
          </div>
          <h2 className="title">Mint NFTs or save for later</h2>
        </div>
        <div className={`accordion__item__body ${isThirdAccordionOpened ? 'open' : ''}`}>
          <div className="dropdown-info-last">
            <p>
              This is where the magic happens. Mint NFTs instantly or save them for later for a
              collection or maybe it’s just not yet ready for launch.
            </p>
            <img src={myNFTs} alt="myNFT" />
          </div>
        </div>
      </div>

      <div className="launch__app__btn">
        <Button
          className="light-button"
          onClick={() => history.push('/setup-auction/auction-settings')}
        >
          Set up auction
        </Button>
      </div>
    </div>
  );
};

export default MintingTab;
