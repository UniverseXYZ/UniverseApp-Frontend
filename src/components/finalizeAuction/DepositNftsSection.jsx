import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';
import emptyMark from '../../assets/images/emptyMark.svg';
import emptyWhite from '../../assets/images/emptyWhite.svg';
import warningIcon from '../../assets/images/Exclamation.svg';

const DepositNftsSection = ({
  transactions,
  handleDepositTier,
  completedCollectionsStep,
  completedAuctionCreationStep,
  approvedTxCount,
  approvedTxs,
  handleWithdraw,
  isCanceledAuction,
}) => {
  console.log(transactions);

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
            ? !(completedCollectionsStep && approvedTxCount === 0)
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
    return <></>;
  };

  // TODO: Show loading
  return !transactions ? (
    <></>
  ) : (
    <div className="create__auction">
      <div className="step">
        <div className="circle">
          {completedCollectionsStep ? (
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
                {slotNfts.map((nft) => (
                  <div>
                    <div className="transaction__image" key={nft.id}>
                      {nft.count > 1 ? <div className="first" /> : <></>}
                      {nft.count > 2 ? <div className="second" /> : <></>}

                      <div className="image-main">
                        <img src={nft.thumbnail_url} alt={nft.name} />
                      </div>
                    </div>
                    {/* <>{nft.count > 3 ? <span>+{nft.count - 3}</span> : <></>}</> */}
                  </div>
                ))}
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
  transactions: PropTypes.oneOfType([PropTypes.object]).isRequired,
  handleDepositTier: PropTypes.func.isRequired,
  handleWithdraw: PropTypes.func.isRequired,
  completedAuctionCreationStep: PropTypes.bool.isRequired,
  completedCollectionsStep: PropTypes.bool.isRequired,
  isCanceledAuction: PropTypes.bool.isRequired,
  approvedTxCount: PropTypes.number.isRequired,
  approvedTxs: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default DepositNftsSection;
