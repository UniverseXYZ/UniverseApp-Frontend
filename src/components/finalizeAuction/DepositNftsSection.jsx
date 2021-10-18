import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';
import emptyMark from '../../assets/images/emptyMark.svg';
import emptyWhite from '../../assets/images/emptyWhite.svg';

const DepositNftsSection = ({
  transactions,
  handleDepositTier,
  completedCollectionsStep,
  completedDepositStep,
  approvedTxCount,
  approvedTx,
  handleWithdraw,
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

  // TODO: Show loading
  return !transactions ? (
    <></>
  ) : (
    <div className="create__auction">
      <div className="step">
        <div className="circle">
          {completedDepositStep ? (
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
        {transactions.displayNfts.map((slotNfts, txIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className="transaction" key={txIndex}>
            <div className="transaction__details">
              <div className="transaction__header">
                <h4>Transaction {txIndex + 1}</h4>
                <div className="head">
                  <p>
                    Slots: <b>{transactions.finalSlotIndices[txIndex].length}</b>
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
            <div className="deposit__button">
              {approvedTx.indexOf(txIndex) < 0 ? (
                <Button
                  disabled={
                    !completedCollectionsStep || txIndex === 0
                      ? false
                      : approvedTx.indexOf(txIndex - 1) < 0
                  }
                  className="light-button"
                  onClick={() => handleDepositTier(txIndex)}
                >
                  Deposit
                </Button>
              ) : (
                <Button className="light-border-button" onClick={() => handleWithdraw(txIndex)}>
                  Withdraw
                </Button>
              )}
            </div>
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
  completedDepositStep: PropTypes.bool.isRequired,
  completedCollectionsStep: PropTypes.bool.isRequired,
  approvedTxCount: PropTypes.number.isRequired,
  approvedTx: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default DepositNftsSection;
