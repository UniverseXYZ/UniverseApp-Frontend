import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import Popup from 'reactjs-popup';
import { utils } from 'ethers';
import { useHistory, useParams } from 'react-router-dom';
import uuid from 'react-uuid';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AppContext from '../../../ContextAPI';
import backArrow from '../../../assets/images/go-back-arrow.svg';
// import person from '../../../assets/images/randomise-person-images/person.png';
import Button from '../../button/Button';
import Tabs from '../../tabs/Tabs';
import PolymorphScrambleProp from './PolymorphScrambleProp';
import './styles/PolymorphScramblePage.scss';
import PolymorphScramblePopup from '../../popups/PolymorphScramblePopup';
import LoadingPopup from '../../popups/LoadingPopup';
import PolymorphScrambleCongratulationPopup from '../../popups/PolymorphScrambleCongratulationPopup';
import NotFound from '../../notFound/NotFound';
import { isEmpty } from '../../../utils/helpers';
import { getPolymorphMeta } from '../../../utils/api/polymorphs.js';
import { shortenEthereumAddress } from '../../../utils/helpers/format.js';
import loadingBg from '../../../assets/images/mint-polymorph-loading-bg.png';
import { polymorphOwner } from '../../../utils/graphql/queries';

const PolymorphScramblePage = () => {
  const history = useHistory();
  const { address } = useContext(AppContext);

  const [propertiesTabSelected, setPropertiesTabSelected] = useState(true);
  const [metadataTabSelected, setMetadataTabSelected] = useState(false);
  const [polymorphId, setPolymorphId] = useState(useParams().id);
  const [polymorphData, setPolymorphData] = useState({});
  const [polymorpGene, setPolymorphGene] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [morphOwner, setMorphOwner] = useState(false);
  const [geneCopied, setGeneCopied] = useState(false);
  const [ownerCopied, setOwnerCopied] = useState(false);
  const [morphSingleGenePrise, setMorphSingleGenePrice] = useState('');
  const { data } = useQuery(polymorphOwner(useParams().id));

  useEffect(() => {
    if (!data) return;
    const ownerOf = data?.transferEntities[0]?.to;
    const owner = ownerOf?.toLowerCase() === address?.toLowerCase();
    setIsOwner(owner);
    setMorphOwner(ownerOf);
  }, [data, address]);

  useEffect(async () => {
    if (!polymorphId) return;
    setLoading(true);
    const polymorphMeta = await getPolymorphMeta(polymorphId);
    setPolymorphData(polymorphMeta);
    setLoading(false);
  }, [polymorphId]);

  useEffect(async () => {
    if (!data) return;
    const gene = data?.transferEntities[0]?.gene;
    setPolymorphGene(gene.toString());
  }, [data]);

  useEffect(async () => {
    if (!data) return;
    const genomChangePrice = data?.transferEntities[0]?.priceForGenomeChange;
    const genomChangePriceToEther = utils.formatEther(genomChangePrice);
    setMorphSingleGenePrice(genomChangePriceToEther);
  }, [data]);

  const tabs = [
    {
      name: 'Properties',
      active: propertiesTabSelected,
      handler: () => {
        setPropertiesTabSelected(true);
        setMetadataTabSelected(false);
      },
    },
    {
      name: 'Metadata',
      active: metadataTabSelected,
      handler: () => {
        setPropertiesTabSelected(false);
        setMetadataTabSelected(true);
      },
    },
  ];

  const onOpenOptionsPopUp = () => {
    const scramblePopupButton = document.getElementById('popup-hidden-btn');
    scramblePopupButton.click();
  };

  const getAttributesMapping = (attributes = []) =>
    attributes.map((attr) => ({
      trait: attr.trait_type,
      name: attr.value,
      // chance: PropTypes.string.isRequired, //TODO:: We dont have it
    }));

  const attributes = getAttributesMapping(polymorphData?.data?.attributes);

  return (
    <div className="container scramble--wrapper">
      <Popup
        closeOnDocumentClick={false}
        trigger={
          <button
            type="button"
            id="popup-hidden-btn"
            aria-label="hidden"
            style={{ display: 'none' }}
          />
        }
      >
        {(close) => (
          <PolymorphScramblePopup
            onClose={close}
            polymorph={polymorphData}
            id={polymorphId}
            setPolymorph={setPolymorphData}
            setPolymorphGene={setPolymorphGene}
          />
        )}
      </Popup>
      <Popup
        closeOnDocumentClick={false}
        trigger={
          <button
            type="button"
            id="loading-hidden-btn"
            aria-label="hidden"
            style={{ display: 'none' }}
          />
        }
      >
        {(close) => <LoadingPopup onClose={close} />}
      </Popup>
      <Popup
        closeOnDocumentClick={false}
        trigger={
          <button
            type="button"
            id="scramble-hidden-btn"
            aria-label="hidden"
            style={{ display: 'none' }}
          />
        }
      >
        {(close) => (
          <PolymorphScrambleCongratulationPopup
            onClose={close}
            onOpenOptionsPopUp={onOpenOptionsPopUp}
            polymorph={polymorphData}
          />
        )}
      </Popup>
      <div
        className="go--back--wrapper"
        aria-hidden="true"
        onClick={() => history.push('/my-nfts')}
      >
        <img src={backArrow} alt="go back" />
        <span>My NFTs</span>
      </div>
      <div className="scramble--content">
        {!loading ? (
          <div className="avatar--wrapper">
            <img src={polymorphData?.data?.image} className="person" alt="Polymorph" />
          </div>
        ) : (
          <div className="loading" key={uuid()}>
            <img src={loadingBg} alt="polymorph" key={uuid()} />
            <div className="lds-roller">
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        )}

        <div className="scramble--options">
          <div className="name">{polymorphData?.data?.name}</div>
          <div className="description">{polymorphData?.data?.description}</div>

          <Tabs items={tabs} />
          {propertiesTabSelected ? (
            <>
              <div className="scramble--properties">
                {attributes.length &&
                  attributes.map((props) => <PolymorphScrambleProp key={uuid()} data={props} />)}
              </div>
            </>
          ) : (
            <div>
              <div className="metadata">
                <div className="mp--string--name">Next Morph Price</div>
                <div className="mp--string--value">{morphSingleGenePrise} ETH</div>
              </div>
              <div className="metadata">
                <div className="owner--string--name">Owner</div>
                <div className="owner--string--value">
                  {/* TODO: Take address from .env */}
                  <a
                    href={`https://etherscan.io/token/0x1cBB182322Aee8ce9F4F1f98d7460173ee30Af1F?a=${morphOwner}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {shortenEthereumAddress(morphOwner)}
                  </a>
                </div>
              </div>
              <div className="metadata">
                <div className="genome--string--name">Genome string</div>
                <div className="copy-div">
                  <div className="copy__div">
                    <div className="copy" title="Copy to clipboard">
                      <div className="copied-div" hidden={!geneCopied}>
                        Gene copied!
                        <span />
                      </div>
                      <CopyToClipboard
                        text={polymorpGene}
                        onCopy={() => {
                          setGeneCopied(true);
                          setTimeout(() => {
                            setGeneCopied(false);
                          }, 1000);
                        }}
                      >
                        <div className="genome--string--value">
                          {shortenEthereumAddress(polymorpGene)}
                        </div>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isOwner ? (
            <Button className="light-button" onClick={onOpenOptionsPopUp}>
              Scramble options
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PolymorphScramblePage;
