import React, { useState } from 'react';

const VerifiedOnly = () => {
  const [verified, setVerified] = useState(false);
  const handeClick = (e) => {
    setVerified(e.target.checked);
  };

  return (
    <div className="browse--nft--sidebar--filtration--item">
      <div className="browse--nft--sidebar--filtration--item--header verified" aria-hidden="true">
        <h3>Verified Only</h3>
        <label className="switch">
          <input type="checkbox" value={verified} checked={verified} onChange={handeClick} />
          <span className="slider round" />
        </label>
      </div>
    </div>
  );
};

export default VerifiedOnly;
