import { createTypeData, signTypedData } from '../utils/EIP712';

const Types = {
  AssetType: [
    {name: 'assetClass', type: 'bytes4'},
    {name: 'data', type: 'bytes'}
  ],
  Asset: [
    {name: 'assetType', type: 'AssetType'},
    {name: 'value', type: 'uint256'}
  ],
  Order: [
    {name: 'maker', type: 'address'},
    {name: 'makeAsset', type: 'Asset'},
    {name: 'taker', type: 'address'},
    {name: 'takeAsset', type: 'Asset'},
    {name: 'salt', type: 'uint256'},
    {name: 'start', type: 'uint256'},
    {name: 'end', type: 'uint256'},
    {name: 'dataType', type: 'bytes4'},
    {name: 'data', type: 'bytes'},
  ]
};

export async function sign(provider: any, order: any, account: string, chainId: number | string, verifyingContract: string) {
  const data = createTypeData({
    name: 'Exchange',
    version: '2',
    chainId,
    verifyingContract
  }, 'Order', order, Types);
  return (await signTypedData({ currentProvider: provider }, account, data)).sig;
}
