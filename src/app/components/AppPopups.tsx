import Popup from 'reactjs-popup';
import React from 'react';
import WrongNetworkPopup from '../../components/popups/WrongNetworkPopup';
import ErrorPopup from '../../components/popups/ErrorPopup';
import { useAuthContext } from '../../contexts/AuthContext';
import { useErrorContext } from '../../contexts/ErrorContext';

export const Popups = () => {
  const { showWrongNetworkPopup, setShowWrongNetworkPopup } = useAuthContext() as any;
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
