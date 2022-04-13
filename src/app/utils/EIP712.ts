const DOMAIN_TYPE = [
  {
    type: 'string',
    name: 'name'
  },
  {
    type: 'string',
    name: 'version'
  },
  {
    type: 'uint256',
    name: 'chainId'
  },
  {
    type: 'address',
    name: 'verifyingContract'
  }
];

export const createTypeData = (domainData: any, primaryType: any, message: any, types: any) => {
  return {
    types: Object.assign({
      EIP712Domain: DOMAIN_TYPE,
    }, types),
    domain: domainData,
    primaryType: primaryType,
    message: message
  };
};

export const signTypedData = (web3: any, from: any, data: any) => {
  return new Promise<any>(async (resolve, reject) => {
    function cb(err: any, result: any) {
      if (err) {
        return reject(err);
      }
      if (result.error) {
        return reject(result.error);
      }

      let sig = result.result;
      const sig0 = sig.substring(2);
      const r = '0x' + sig0.substring(0, 64);
      const s = '0x' + sig0.substring(64, 128);
      const v = parseInt(sig0.substring(128, 130), 16);


      // Signing sometimes returns invalid v part of signature.
      // We need to patch it otherwise signature cannot be verified in smart contract
      // https://ethereum.stackexchange.com/a/103755/79698
      if (sig.endsWith("00")) {
        sig = sig.slice(0, -2) + "1B"
      } else if (sig.endsWith("01")) {
        sig = sig.slice(0, -2) + "1C"
      } 

      resolve({
        data,
        sig,
        v, r, s
      });
    }
    if (web3.currentProvider.isMetaMask) {
      web3.currentProvider.sendAsync({
        jsonrpc: '2.0',
        method: 'eth_signTypedData_v3',
        params: [from, JSON.stringify(data)],
        id: new Date().getTime()
      }, cb);
    } else {
      const send = web3.currentProvider.sendAsync || web3.currentProvider.send;
      send.bind(web3.currentProvider)({
        jsonrpc: '2.0',
        method: 'eth_signTypedData_v4',
        params: [from, JSON.stringify(data)],
        id: new Date().getTime()
      }, cb);
    }
  });
}
