import React, { useCallback, useEffect, useRef, useState } from 'react';

export const useImageLoaded = () => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const ref = useRef();

  const onLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const onError = useCallback(() => {
    setLoaded(false);
    setErrored(true);
  }, []);

  useEffect(() => {
    if (ref.current && ref.current.complete) {
      onLoad();
    }
  });

  return [ref, loaded, onLoad, errored, onError, setLoaded];
};
