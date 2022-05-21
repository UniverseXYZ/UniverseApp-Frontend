import { Button, Text } from '@chakra-ui/react';
import Router, { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

import { AlertPopup } from '@app/components';

interface IBeforeUnloadPopupProps {
  show: boolean;
  title?: string;
  message?: string;
}

export const BeforeUnloadPopup = (props: IBeforeUnloadPopupProps) => {
  const {
    show,
    title = 'Are you sure you want to leave?',
    message = 'All the current progress will be saved but make sure you complete all the transactions before the launch date so the auction can start successfully.',
  } = props;

  const router = useRouter();

  const [nextUrl, setNextUrl] = useState<string>();

  useEffect(() => {
    const handler = (url: string) => {
      if (show && !nextUrl) {
        setNextUrl(url);

        const error = 'Route Canceled';

        Router.events.emit('routeChangeError', error, { shallow: false });

        throw error;
      }
    };

    router.events.on('routeChangeStart', handler);

    return () => {
      router.events.off('routeChangeStart', handler);
    };
  }, [router, show, nextUrl]);

  const handleCancel = useCallback(() => {
    setNextUrl(undefined);
  }, []);

  return (
    <AlertPopup
      isOpen={!!nextUrl}
      onClose={handleCancel}
      title={title}
      renderFooter={() => (
        <>
          <Button
            variant={'primary'}
            onClick={() => !!nextUrl && router.push((nextUrl))}
          >Yes, leave</Button>
          <Button
            variant={'ghost'}
            onClick={handleCancel}
          >Cancel</Button>
        </>
      )}
    >
      {!!message && (<Text>{message}</Text>)}
    </AlertPopup>
  );
}
