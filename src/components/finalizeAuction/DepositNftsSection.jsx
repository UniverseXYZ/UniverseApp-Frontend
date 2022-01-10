import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';
import emptyMark from '../../assets/images/emptyMark.svg';
import emptyWhite from '../../assets/images/emptyWhite.svg';
import warningIcon from '../../assets/images/Exclamation.svg';
import LoadingImage from '../general/LoadingImage';
import SVGImageLoader from '../marketplaceNFT/InlineSVG';
import videoIcon from '../../assets/images/video-icon.svg';
import doneIcon from '../../assets/images/Completed.svg';

const DepositNftsSection = ({
  transactions,
  handleDepositTier,
  completedCollectionsStep,
  completedAuctionCreationStep,
  completedDepositStep,
  approvedTxs,
  handleWithdraw,
  isCanceledAuction,
}) => {
  // Maybe count this in transaction config
  const getTotalTxNftsCount = () => {
    let totalCount = 0;
    transactions?.displayNfts.forEach((txNfts) => {
      txNfts.forEach((nft) => {
        totalCount += nft.count;
      });
    });
    return totalCount;
  };

  const getTxNftsCount = (txIndex) => {
    let totalCount = 0;
    transactions?.displayNfts[txIndex].forEach((nft) => {
      totalCount += nft.count;
    });
    return totalCount;
  };

  const getUniqueSlots = (slotArray) =>
    slotArray.filter((item, i, ar) => ar.indexOf(item) === i).length;

  const showActionButton = (txIndex) => {
    if (!isCanceledAuction) {
      if (approvedTxs.indexOf(txIndex) < 0) {
        const isDisabled =
          txIndex === 0
            ? !(completedCollectionsStep && approvedTxs.length === 0)
            : !(completedCollectionsStep && approvedTxs.indexOf(txIndex - 1) >= 0);

        return (
          <Button
            disabled={isDisabled}
            className="light-button"
            onClick={() => handleDepositTier(txIndex)}
          >
            Deposit
          </Button>
        );
      }
      return (
        <Button
          className="light-border-button"
          disabled={!isCanceledAuction}
          onClick={() => handleWithdraw(txIndex)}
        >
          Withdraw
        </Button>
      );
    }
    if (approvedTxs.indexOf(txIndex) >= 0) {
      return (
        <Button
          className="light-border-button"
          disabled={!isCanceledAuction}
          onClick={() => handleWithdraw(txIndex)}
        >
          Withdraw
        </Button>
      );
    }
    return (
      <Button disabled className="light-button">
        Deposit
      </Button>
    );
  };

  // TODO: Show loading
  return !transactions ? (
    <></>
  ) : (
    <div className="create__auction">
      <div className="step">
        <div className="circle">
          {completedDepositStep ? (
            <img alt="Completed" src={doneIcon} />
          ) : completedCollectionsStep ? (
            <img alt="Empty mark" src={emptyMark} />
          ) : (
            <img alt="Empty white" src={emptyWhite} />
          )}
        </div>
      </div>
      <div className="create__auction__body">
        <h2>Deposit NFTs</h2>
        <p className="auction__description">
          Deposit {getTotalTxNftsCount()} NFTs to the auction contract
        </p>
        {(!isCanceledAuction && approvedTxs.length) ||
        (isCanceledAuction && completedAuctionCreationStep && !approvedTxs.length) ? (
          <div className="warning__div">
            <img src={warningIcon} alt="Warning" />
            <p>You need to cancel the auction before you can withdraw you NFTs</p>
          </div>
        ) : (
          <></>
        )}

        {transactions.displayNfts.map((slotNfts, txIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className="transaction" key={txIndex}>
            <div className="transaction__details">
              <div className="transaction__header">
                <h4>Transaction {txIndex + 1}</h4>
                <div className="head">
                  <p>
                    Slots: <b>{getUniqueSlots(transactions.finalSlotIndices[txIndex])}</b>
                  </p>
                  <p>
                    Total NFTs: <b>{getTxNftsCount(txIndex)}</b>
                  </p>
                </div>
              </div>
              <div className="transaction__body">
                {slotNfts.map((nft) => {
                  const { artworkType, url, count, nftName } = nft;
                  const nftIsImage =
                    artworkType === 'png' ||
                    artworkType === 'jpg' ||
                    artworkType === 'jpeg' ||
                    artworkType === 'mpeg' ||
                    artworkType === 'webp';

                  return (
                    <div key={nft.id}>
                      <div className="transaction__image">
                        {count > 1 ? <div className="first" /> : <></>}
                        {count > 2 ? <div className="second" /> : <></>}

                        <div className="image-main">
                          {artworkType === 'mp4' && (
                            <video
                              className="preview-video"
                              onMouseOver={(event) => event.target.play()}
                              onFocus={(event) => event.target.play()}
                              onMouseOut={(event) => event.target.pause()}
                              onBlur={(event) => event.target.pause()}
                            >
                              <source src={url} type="video/mp4" />
                              <track kind="captions" />
                              Your browser does not support the video tag.
                            </video>
                          )}
                          {nftIsImage && <img className="preview-image" src={url} alt={nftName} />}
                          {artworkType === 'mp4' && (
                            <img className="video-icon" src={videoIcon} alt="Video Icon" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="deposit__button">{showActionButton(txIndex)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

DepositNftsSection.propTypes = {
  transactions: PropTypes.oneOfType([PropTypes.object]),
  handleDepositTier: PropTypes.func.isRequired,
  handleWithdraw: PropTypes.func.isRequired,
  completedAuctionCreationStep: PropTypes.bool,
  completedCollectionsStep: PropTypes.bool,
  completedDepositStep: PropTypes.bool,
  isCanceledAuction: PropTypes.bool.isRequired,
  approvedTxs: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

DepositNftsSection.defaultProps = {
  transactions: null,
  completedAuctionCreationStep: null,
  completedCollectionsStep: null,
  completedDepositStep: null,
};
export default DepositNftsSection;
