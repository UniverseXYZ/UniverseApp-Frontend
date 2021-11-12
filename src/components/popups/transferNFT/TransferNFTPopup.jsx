import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Contract } from 'ethers';
import closeIcon from '../../../assets/images/close-menu.svg';
import './TransferNFTPopup.scss';
import { Step1, Step2, Step3 } from './components';
import { Steps } from './constants';
import Contracts from '../../../contracts/contracts.json';
import { useAuthContext } from '../../../contexts/AuthContext';

const { contracts: contractsData } = Contracts[process.env.REACT_APP_NETWORK_CHAIN_ID];

const TransferNFTPopup = ({ close, nft }) => {
  const [receiverAddress, setReceiverAddress] = useState('');
  const [step, setStep] = useState(Steps.Form);

  const { signer } = useAuthContext();

  const contract = useMemo(
    () => new Contract(nft.collection.address, contractsData.ERC721.abi, signer),
    [nft, signer]
  );

  const handleSubmit = useCallback(async () => {
    const gasLimit = await contract.estimateGas['safeTransferFrom(address,address,uint256)'](
      nft.owner,
      receiverAddress,
      nft.tokenId
    );
    try {
      setStep(Steps.Loading);
      const res = await contract['safeTransferFrom(address,address,uint256)'](
        nft.owner,
        receiverAddress,
        nft.tokenId,
        {
          gasLimit,
        }
      );
      await res.wait();
    } catch (e) {
      console.error(e);
    }
    setStep(Steps.Success);
  }, [receiverAddress, contract]);

  return (
    <div className="transfer--nft--popup">
      <img
        className="close--popup"
        onClick={close}
        src={closeIcon}
        alt="Close"
        aria-hidden="true"
      />
      {step === 1 && (
        <Step1
          close={close}
          nft={nft}
          receiverAddress={receiverAddress}
          setReceiverAddress={setReceiverAddress}
          onSubmit={handleSubmit}
        />
      )}
      {step === 2 && <Step2 close={close} />}
      {step === 3 && <Step3 close={close} receiverAddress={receiverAddress} />}
    </div>
  );
};

TransferNFTPopup.propTypes = {
  close: PropTypes.func.isRequired,
  nft: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default TransferNFTPopup;
