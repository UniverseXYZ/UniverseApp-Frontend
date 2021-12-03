import React from 'react';
import OriginalCharactersSection from './OriginalCharactersSection.jsx';
import MintingAuctionsSection from './MintingAuctionsSection.jsx';
import UniverseProtocolSection from './UniverseProtocolSection.jsx';
import TShirtSection from './TShirtSection.jsx';

const About = () => (
  <div className="describe__section">
    <UniverseProtocolSection />
    <MintingAuctionsSection />
    <OriginalCharactersSection />
    <TShirtSection />
  </div>
);

export default About;
