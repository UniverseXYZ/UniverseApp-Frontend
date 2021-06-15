import React from 'react';
import WelcomeWrapper from '../../components/ui-elements/WelcomeWrapper';
import './MintPolymorph.scss';

const MintPolymorph = () => (
  <div className="mint--polymorph">
    <WelcomeWrapper
      title="Mint Polymorph"
      hintText="Here is where we will mint Polymorphs. Polymorphs are completely random. Once you own a Polymorph the items can be morphed again multiple times to your liking."
      ellipsesLeft={false}
      ellipsesRight={false}
    >
      <div className="welcome--slider--bonding--curve">
        <div className="row1">
          <div className="alert--info">
            <p>
              The Bonding Curve contract will mint you an original Polymorph. This base skin will be
              permanent but the traits and items will be morphable at any time.
            </p>
          </div>
          <h5>Bonding curve</h5>
          <p>
            12500/25000
            <span> Minted</span>
          </p>
        </div>
      </div>
    </WelcomeWrapper>
  </div>
);

export default MintPolymorph;
