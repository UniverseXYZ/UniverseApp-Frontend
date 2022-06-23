import { INFTPageContext } from '@app/modules/nft/pages/nft-page/NFTPage.context';

export const sortOwners = (owners: INFTPageContext['owners']) => {
  return owners.sort((a, b) => {
    const aValue = a.order?.take.value ? parseInt(a.order.take.value) : Infinity;
    const bValue = b.order?.take.value ? parseInt(b.order.take.value) : Infinity;

    return aValue > bValue ? 1 : -1;
  });
};
