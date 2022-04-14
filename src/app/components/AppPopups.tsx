import Popup from 'reactjs-popup';
import React from 'react';
import WrongNetworkPopup from '../../components/popups/WrongNetworkPopup';
import ErrorPopup from '../../components/popups/ErrorPopup';
import { useAuthStore } from '../../stores/authStore';
import { useLoadingStore } from '../../stores/loadingStore';
import { useErrorStore } from '../../stores/errorStore';
import { useNftCheckoutStore } from '../../stores/nftCheckoutStore';
import { LoadingPopup } from '@app/modules/marketplace/components/popups/loading-popup';
import { NFTCheckoutPopup } from '@app/modules/nft/pages/nft-page/components';

export const Popups = () => {
  const { showWrongNetworkPopup, setShowWrongNetworkPopup } = useAuthStore(state => ({showWrongNetworkPopup: state.showWrongNetworkPopup, setShowWrongNetworkPopup: state.setShowWrongNetworkPopup}));
  const showError = useErrorStore(s => s.showError)
  const {showLoading, closeLoading, loadingTitle, loadingBody, transactions} = useLoadingStore(s => ({showLoading: s.showLoading, closeLoading: s.closeLoading, loadingTitle: s.loadingTitle, loadingBody: s.loadingBody, transactions: s.transactions}));
  const { NFT, order } = useNftCheckoutStore(s => ({ NFT: s.NFT, order: s.order }))

  return (
    <>
      <Popup closeOnDocumentClick={false} open={showWrongNetworkPopup}>
        <WrongNetworkPopup close={() => setShowWrongNetworkPopup(false)} />
      </Popup>
      <Popup closeOnDocumentClick={false} open={showError}>
        <ErrorPopup />
      </Popup>
      <LoadingPopup
        isOpen={showLoading}
        onClose={closeLoading}
        heading={loadingTitle}
        text={loadingBody}
        transactions={transactions}
      />
      {NFT?.tokenId && order?.id && (
        <NFTCheckoutPopup />
      )}
    </>
  );
}
