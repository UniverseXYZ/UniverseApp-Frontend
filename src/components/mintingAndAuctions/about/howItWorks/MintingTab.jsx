import React, { useState, useEffect } from 'react';
import mintingAccordionOne from '../../../../assets/images/minting-accordion1.png';
import mintingAccordionTwo from '../../../../assets/images/minting-accordion2.png';
import mintingAccordionThree from '../../../../assets/images/minting-accordion3.png';

const MintingTab = () => {
  const [isFirstAccordionOpened, setIsFirstAccordionOpened] = useState(false);
  const [isSecondAccordionOpened, setIsSecondAccordionOpened] = useState(false);
  const [isThirdAccordionOpened, setIsThirdAccordionOpened] = useState(false);

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
        className="accordion__item"
        onClick={() => setIsFirstAccordionOpened(!isFirstAccordionOpened)}
        aria-hidden="true"
      >
        <div className="accordion__item__header">
          <h2 className="title">1. Create Single NFTs or Organise NFT Collections</h2>
          <div className="toggle">
            <span className="horizontal" />
            {!isFirstAccordionOpened && <span className="vertical" />}
          </div>
        </div>
        <div className={`accordion__item__body ${isFirstAccordionOpened ? 'open' : ''}`}>
          <p className="desc">
            Create a single NFT or mint a large collection that you have been creating for months.
            Our tools give you the easy formating and editing options to easily curate a perfect
            collection before you launch. Eliminate mistakes with our review process.
          </p>
          <img src={mintingAccordionOne} alt="Create Single NFTs or Organise NFT Collections" />
        </div>
      </div>
      <div
        className="accordion__item"
        onClick={() => setIsSecondAccordionOpened(!isSecondAccordionOpened)}
        aria-hidden="true"
      >
        <div className="accordion__item__header">
          <h2 className="title">2. Upload Images, Audio or Video, and Fill the Meta Data</h2>
          <div className="toggle">
            <span className="horizontal" />
            {!isSecondAccordionOpened && <span className="vertical" />}
          </div>
        </div>
        <div className={`accordion__item__body ${isSecondAccordionOpened ? 'open' : ''}`}>
          <p className="desc">
            NFTs are empowering because they do not limit any type of artists, files are not limited
            and you can turn a painting, a video, a song, a beat, a sound, a picture, a drawing, a
            gif or anything that your creative mind can think of into an NFT. The possibilities are
            endless with art and the Universe.
          </p>
          <img
            src={mintingAccordionTwo}
            alt="Upload Images, Audio or Video, and Fill the Meta Data"
          />
        </div>
      </div>
      <div
        className="accordion__item last"
        onClick={() => setIsThirdAccordionOpened(!isThirdAccordionOpened)}
        aria-hidden="true"
      >
        <div className="accordion__item__header">
          <h2 className="title">3. Mint NFTs or Save for Later</h2>
          <div className="toggle">
            <span className="horizontal" />
            {!isThirdAccordionOpened && <span className="vertical" />}
          </div>
        </div>
        <div className={`accordion__item__body ${isThirdAccordionOpened ? 'open' : ''}`}>
          <p className="desc">
            This is where the magic happens. Mint NFTs instantly or save them for later for a
            collection or maybe it’s just not ready yet.
          </p>
          <img src={mintingAccordionThree} alt="Mint NFTs or Save for Later" />
        </div>
      </div>

      {/* <div className="launch__app__btn">
        <Button className="light-button">Launch app</Button>
      </div> */}
    </div>
  );
};

export default MintingTab;
