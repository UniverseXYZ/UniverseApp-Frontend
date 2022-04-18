import Popup from 'reactjs-popup';
import WrongNetworkPopup from '../src/components/popups/WrongNetworkPopup';
import ErrorPopup from '../src/components/popups/ErrorPopup';
import React from 'react';
import { useAuthContext } from '../src/contexts/AuthContext';
import { useErrorContext } from '../src/contexts/ErrorContext';

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
