import { LoadingPopup } from "@app/components/loading-popup";
import { NFTCheckoutPopup, NFTMakeAnOfferPopup } from '@app/modules/nft/pages/nft-page/components';
import NotAuthenticatedPopup from "@legacy/popups/NotAuthenticatedPopup";
import React from "react";
import Popup from "reactjs-popup";
import { useSignInPopupStore } from "src/stores/signInPopup";
import ErrorPopup from "../../components/popups/ErrorPopup";
import WrongNetworkPopup from "../../components/popups/WrongNetworkPopup";
import { useAuthStore } from "../../stores/authStore";
import { useErrorStore } from "../../stores/errorStore";
import { useLoadingStore } from "../../stores/loadingStore";

export const Popups = () => {
  const { showWrongNetworkPopup, setShowWrongNetworkPopup } = useAuthStore(
    (state) => ({
      showWrongNetworkPopup: state.showWrongNetworkPopup,
      setShowWrongNetworkPopup: state.setShowWrongNetworkPopup,
    })
  );
  const showError = useErrorStore((s) => s.showError);
  const { showLoading, closeLoading, loadingTitle, loadingBody, transactions } =
    useLoadingStore((s) => ({
      showLoading: s.showLoading,
      closeLoading: s.closeLoading,
      loadingTitle: s.loadingTitle,
      loadingBody: s.loadingBody,
      transactions: s.transactions,
    }));

  const { showNotAuthenticatedPopup, onClose } = useSignInPopupStore((s) => ({
    showNotAuthenticatedPopup: s.showNotAuthenticatedPopup,
    onClose: s.onClose,
  }));

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
      <NFTCheckoutPopup />
      <NFTMakeAnOfferPopup />

      <Popup closeOnDocumentClick={false} open={showNotAuthenticatedPopup}>
        <NotAuthenticatedPopup close={onClose} />
      </Popup>
    </>
  );
};
