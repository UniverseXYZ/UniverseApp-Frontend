import { useEffect, useState } from 'react';
import { providers } from 'ethers';

export const useConnection = () => {
  const [address, setAddress] = useState();
  const [signer, setSigner] = useState();

  useEffect(() => {
    (async () => {
      if (typeof window.ethereum !== 'undefined') {
        const { ethereum } = window;

        const provider = new providers.Web3Provider(window.ethereum);
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

        setSigner(provider.getSigner(0));
        setAddress(accounts[0]);

        ethereum.on('accountsChanged', ([account]) => {
          if (account) {
            setAddress(account);
          }
        });
      } else {
        alert('Metamask is missing');
      }
    })();
  }, []);

  return {
    address,
    signer,
  };
};
