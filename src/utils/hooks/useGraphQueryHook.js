import React, { useState, useEffect } from 'react';

export const useGraphQueryHook = (query) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryTraitRarity = async () => {
      const traitData = await query;
      setData(traitData);
      setLoading(false);
    };

    queryTraitRarity();
  }, []);

  return { data, loading };
};
