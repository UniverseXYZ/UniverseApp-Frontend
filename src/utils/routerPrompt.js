import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import PopupComponent from '../components/popups/Popup';

export function RouterPrompt({ when, onOK, editing }) {

  const router = useRouter();

  const [currentPath, setCurrentPath] = useState('');

  const handler = useCallback((pathname) => {
    if (
      pathname !== '/setup-auction/auction-settings' &&
      pathname !== '/setup-auction/reward-tiers' &&
      pathname !== '/create-tiers' &&
      pathname !== '/setup-auction/review-auction'
    ) {
      setCurrentPath(pathname);
      document.getElementById('show-popup')?.click();
      throw '';
    }
  }, []);

  useEffect(() => {
    if (!(when && editing)) {
      return;
    }

    router.events.on('routeChangeStart', handler)

    return () => {
      router.events.off('routeChangeStart', handler)
    };
  }, [when, editing, handler]);

  const handleOK = useCallback(async () => {
    if (onOK) {
      const canRoute = await Promise.resolve(onOK());
      if (canRoute) {
        router.events.off('routeChangeStart', handler)
        router.push(currentPath);
      }
    }
  }, [currentPath, onOK, handler]);

  return <PopupComponent onClose={handleOK} />;
}

RouterPrompt.propTypes = {
  when: PropTypes.bool.isRequired,
  onOK: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
};
