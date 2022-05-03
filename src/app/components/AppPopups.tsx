import Popup from 'reactjs-popup';
import React from 'react';
import WrongNetworkPopup from '../../components/popups/WrongNetworkPopup';
import ErrorPopup from '../../components/popups/ErrorPopup';
import { useErrorContext } from '../../contexts/ErrorContext';
import { useAuthStore } from '../../stores/authStore';

export const Popups = () => {
  const { showWrongNetworkPopup, setShowWrongNetworkPopup } = useAuthStore(state => ({showWrongNetworkPopup: state.showWrongNetworkPopup, setShowWrongNetworkPopup: state.setShowWrongNetworkPopup}));
  const { showError } = useErrorContext() as any;

  return (
    <>
      <Popup closeOnDocumentClick={false} open={showWrongNetworkPopup}>
        <WrongNetworkPopup close={() => setShowWrongNetworkPopup(false)} />
      </Popup>
      <Popup closeOnDocumentClick={false} open={showError}>
        <ErrorPopup />
      </Popup>
    </>
  );
}
