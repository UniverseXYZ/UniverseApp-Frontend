import React from 'react';
import PropTypes from 'prop-types';
import { utils } from 'ethers';
import ScrambleTypeImg from '../../assets/images/eventTypeScramble.svg';
import MintTypeImg from '../../assets/images/eventTypeMint.svg';
import TradeTypeImg from '../../assets/images/eventTypeTrade.svg';
import ListedTypeImg from '../../assets/images/eventTypeListed.svg';
import TransferTypeImg from '../../assets/images/eventTypeTransfer.svg';
import imgDiamondPaws from '../../assets/images/Diamond-paws.png';
import imgEsCrow from '../../assets/images/Escrow-small.png';
import imgFrankie from '../../assets/images/Frankie-small.png';
import imgGlenn from '../../assets/images/Glenn-small.png';
import imgGoldtooth from '../../assets/images/Goldtooth-small.png';
import imgGrishnak from '../../assets/images/Grishnak-small.png';
import imgCharles from '../../assets/images/Charles-small.png';
import imgMariguana from '../../assets/images/Mariguana-small.png';
import imgPaul from '../../assets/images/Paul-small.png';
import imgRagnar from '../../assets/images/Ragnar-small.png';
import imgXYZBot from '../../assets/images/XYZbot-small.png';

const characters = [
  'DiamondPaws',
  'EsCrow',
  'Frankie',
  'Glenn',
  'GoldTooth',
  'Grishnak',
  'Charles',
  'Mariguana',
  'Paul',
  'Ragnar',
  'XYZBot',
];

const characterImages = {
  DiamondPaws: imgDiamondPaws,
  EsCrow: imgEsCrow,
  Frankie: imgFrankie,
  Glenn: imgGlenn,
  GoldTooth: imgGoldtooth,
  Grishnak: imgGrishnak,
  Charles: imgCharles,
  Mariguana: imgMariguana,
  Paul: imgPaul,
  Ragnar: imgRagnar,
  XYZBot: imgXYZBot,
};

const getTypeImage = (type) => {
  if (type === 'scramble') {
    return ScrambleTypeImg;
  }
  if (type === 'mint') {
    return MintTypeImg;
  }
  if (type === 'trade') {
    return TradeTypeImg;
  }
  if (type === 'listed') {
    return ListedTypeImg;
  }
  return TransferTypeImg;
};

const getTypeEvent = (type) => {
  switch (type) {
    case 0:
      return 'mint';
    case 1:
      return 'scramble';
    case 2:
      return 'transfer';
    default:
      return 'transfer';
  }
};

const getSkinFromGenome = (gene) => {
  const genePosition = gene.substring(0, 2);
  return characters[parseInt(genePosition, 10) % 11];
};

const getName = (id) => `Polymorph #${id}`;

const getCharacterBaseImage = (character) => characterImages[character];

const PolymorphsActivityTableRow = (props) => {
  const { data, className, ethPrice } = props;

  return (
    <tr className={`row ${className}`}>
      <td className="td--image">
        <div className="polymorph--table--image--block">
          <img alt="img" src={getCharacterBaseImage(getSkinFromGenome(data.newGene))} />
        </div>
      </td>
      <td className="td--name">
        <span>{getName(data.tokenId)}</span>
      </td>
      <td className="td--skin">
        <span>{getSkinFromGenome(data.newGene)}</span>
      </td>
      <td className="td--event">
        <span>
          <div className="flex--event--block">
            <div className={`event--type event--type--${getTypeEvent(data.eventType)}`}>
              <img alt="img" src={getTypeImage(getTypeEvent(data.eventType))} />
            </div>
            <div className="text--event">{getTypeEvent(data.eventType)}</div>
          </div>
        </span>
      </td>
      <td className="td--price">
        <span className="price--eth">{utils.formatEther(data.price)} ETH</span>
        <span className="price--usd">
          {' '}
          (${(ethPrice * utils.formatEther(data.price)).toFixed(2)})
        </span>
      </td>
    </tr>
  );
};
PolymorphsActivityTableRow.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    skin: PropTypes.string,
    eventType: PropTypes.number,
    price: PropTypes.string,
    priceUSD: PropTypes.string,
    tokenId: PropTypes.string,
    newGene: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
  ethPrice: PropTypes.string,
};

PolymorphsActivityTableRow.defaultProps = {
  className: '',
  ethPrice: '',
};

export default PolymorphsActivityTableRow;
