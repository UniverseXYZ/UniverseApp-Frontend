import React, { useCallback, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Contract } from 'ethers';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import EthereumAddress from 'ethereum-address';
import closeIcon from '../../../assets/images/close-menu.svg';
import './TransferNFTPopup.scss';
import { Step1, Step2, Step3 } from './components';
import { Steps } from './constants';
import Contracts from '../../../contracts/contracts.json';
import { useAuthContext } from '../../../contexts/AuthContext';

const getTransferSchema = (nft) =>
  Yup.object().shape({
    receiverAddress: Yup.string()
      .required('This field can’t be empty')
      .test('receiverAddress', 'Wallet address is not valid', (value) =>
        EthereumAddress.isAddress(value)
      ),
    tokenId: Yup.string().required('This field can’t be empty'),
    amount: Yup.number()
      .required('This field can’t be empty')
      .min(1)
      .max(nft?.amount || 1),
  });

const { contracts: contractsData } = Contracts[process.env.REACT_APP_NETWORK_CHAIN_ID];

const Standards = {
  ERC721: 'ERC721',
  ERC1155: 'ERC1155',
};

const TransferNFTPopup = ({ close, nft }) => {
  const formik = useFormik({
    initialValues: {
      receiverAddress: '',
      tokenId: nft.tokenId,
      amount: nft.amount,
    },
    validateOnMount: true,
    validationSchema: getTransferSchema(nft),
  });
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  const [step, setStep] = useState(Steps.Form);

  const { signer } = useAuthContext();

  const handleSubmit = useCallback(async (values) => {
    const contract = new Contract(nft.collection.address, contractsData[nft.standard].abi, signer);
    const address = await signer.getAddress();

    let methodName = 'safeTransferFrom(address,address,uint256)';
    let params = [address, values.receiverAddress, values.tokenId];

    if (nft?.standard === Standards.ERC1155) {
      methodName = 'safeTransferFrom';
      params = [address, values.receiverAddress, values.tokenId, +values.amount, 0x0];
    }

    const gasLimit = await contract.estimateGas[methodName](...params);
    try {
      setStep(Steps.Loading);
      const res = await contract[methodName](...params, { gasLimit });
      await res.wait();
    } catch (e) {
      console.error(e);
    }
    setStep(Steps.Success);
  }, []);

  return (
    <div className="transfer--nft--popup" ref={ref}>
      <img
        className="close--popup"
        onClick={close}
        src={closeIcon}
        alt="Close"
        aria-hidden="true"
      />
      {step === Steps.Form && (
        <Step1
          close={close}
          nft={nft}
          formik={formik}
          showAmount={nft?.standard === Standards.ERC1155}
          onSubmit={handleSubmit}
        />
      )}
      {step === Steps.Loading && <Step2 close={close} />}
      {step === Steps.Success && (
        <Step3 close={close} receiverAddress={formik.values.receiverAddress} />
      )}
    </div>
  );
};

TransferNFTPopup.propTypes = {
  close: PropTypes.func.isRequired,
  nft: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default TransferNFTPopup;
