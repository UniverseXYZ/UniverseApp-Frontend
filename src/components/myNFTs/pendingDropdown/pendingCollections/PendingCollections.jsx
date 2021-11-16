import React, { useState, useEffect, useMemo } from 'react';
// import './PendingCollections.scss';
import { useMyNftsContext } from '../../../../contexts/MyNFTsContext';
import { SpinningLoader } from '../misc/SpinningLoader';
import PendingAccordion from '../pendingAccordion/PendingAccordion';

const PendingCollections = () => {
  const { myMintingCollections } = useMyNftsContext();

  const renderMintingCollections = useMemo(
    () =>
      myMintingCollections.map((coll) => (
        <div
          onClick={() =>
            window
              .open(`${process.env.REACT_APP_ETHERSCAN_URL}/tx/${coll.txHash}`, '_blank')
              .focus()
          }
          className="collection__card"
          key={coll.id}
          style={{ width: 160 }}
          aria-hidden
        >
          <span className="tooltiptext">View on Etherscan</span>
          <div className="collection__card__body">
            <div className="loading-image">
              <div className="image__bg__effect" />
              <img src={coll.coverUrl} alt={coll.name} />
              <SpinningLoader />
            </div>
          </div>
          <div className="collection__card__footer">
            <h1 className="collection__name">
              {coll.name.length > 15 ? `${coll.name.substring(0, 15)}...` : coll.name}
            </h1>
          </div>
        </div>
      )),
    [myMintingCollections.length]
  );

  return myMintingCollections.length ? (
    <PendingAccordion title="Pending Collections" dataLength={myMintingCollections.length}>
      {renderMintingCollections}
    </PendingAccordion>
  ) : (
    <></>
  );
};

export default PendingCollections;
