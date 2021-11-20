import React, { useEffect, useState, useContext, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import uuid from 'react-uuid';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import backArrow from '../../../assets/images/go-back-arrow.svg';
import Tabs from '../../tabs/Tabs';
// import './styles/LobstersInfoPage.scss';
import { getLobsterMeta } from '../../../utils/api/lobsters.js';
import { shortenEthereumAddress } from '../../../utils/helpers/format.js';
import loadingBg from '../../../assets/images/lobby-lobsters/img_placeholder.png';
import GeneParser from '../../../utils/helpers/LobsterGeneParser';
import { lobsterOwner, queryLobstersGraph } from '../../../utils/graphql/lobsterQueries';
import AppContext from '../../../ContextAPI';
import LobsterTrait from '../../polymorphs/scramble/LobsterTrait';
import { useRouter } from 'next/router';

const LobsterInfoPage = () => {
  const router = useRouter();
  const [propertiesTabSelected, setPropertiesTabSelected] = useState(true);
  const [metadataTabSelected, setMetadataTabSelected] = useState(false);
  const [lobsterId, setLobsterId] = useState();
  const [lobsterData, setLobsterData] = useState({});
  const [lobsterGene, setLobsterGene] = useState('');
  const [loading, setLoading] = useState(false);
  const [owner, setOwner] = useState('');
  const [geneCopied, setGeneCopied] = useState(false);
  const [traitsMap, setTraitsMap] = useState({});
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    setLobsterId(router.query?.id);
  }, [router.query?.id]);

  useEffect(async () => {
    if (!lobsterId) return;
    setLoading(true);
    const lobsterMetadata = await getLobsterMeta(lobsterId);
    setLobsterData(lobsterMetadata);

    const data = await queryLobstersGraph(lobsterOwner(lobsterId));

    const gene = data?.transferEntities[data?.transferEntities.length - 1]?.gene;
    if (gene) {
      setLobsterGene(gene.toString());
      const parsedGenes = GeneParser.parse(gene.toString());
      setTraitsMap(parsedGenes);
    }

    const ownerOf = data?.transferEntities[0]?.to;
    setOwner(ownerOf);

    setLoading(false);
  }, [lobsterId]);

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

  const getAttributesMapping = (attributes = []) =>
    attributes.map((attr) => ({
      trait: attr.trait_type,
      name: attr.value,
      // chance: PropTypes.string.isRequired, //TODO:: We dont have it
    }));

  const linkName = readMore ? 'Read Less' : 'Read More';
  const attributes = getAttributesMapping(lobsterData?.data?.attributes);

  const renderTraits = useMemo(
    () =>
      attributes.length && Object.keys(traitsMap).length !== 0 ? (
        attributes.map((attributeProps) => {
          const chance = traitsMap[attributeProps.trait.toUpperCase()];
          attributeProps.chance = chance;
          return <LobsterTrait key={uuid()} traitData={attributeProps} />;
        })
      ) : (
        <></>
      ),
    [lobsterData?.data?.attributes, traitsMap]
  );

  if (!lobsterId) {
    return null;
  }

  return (
    <div className="container scramble--wrapper">
      <div
        className="go--back--wrapper"
        aria-hidden="true"
        onClick={() => router.push('/my-nfts')}
      >
        <img src={backArrow} alt="go back" />
        <span>My NFTs</span>
      </div>
      <div className="scramble--content">
        {!loading && lobsterData?.data?.image ? (
          <img src={lobsterData?.data?.image} className="avatar person" alt="Lobby Lobster" />
        ) : (
          <div className="loading" key={uuid()}>
            <img src={loadingBg} alt="lobster" key={uuid()} />
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
          <div className="name">{lobsterData?.data?.name}</div>
          <div className="description">
            {readMore ? (
              lobsterData?.data?.description
            ) : (
              <>{lobsterData?.data?.description?.substring(0, 155)}</>
            )}
            {lobsterData?.data?.description ? (
              <>
                <span> </span>
                <a
                  style={{ cursor: 'pointer', fontWeight: 'bold' }}
                  aria-hidden
                  className="read-more-link"
                  onClick={() => {
                    setReadMore(!readMore);
                  }}
                >
                  <span>{linkName}</span>
                </a>
              </>
            ) : (
              <></>
            )}
          </div>

          <Tabs items={tabs} id={lobsterId} attributes={attributes} />
          {propertiesTabSelected ? (
            <>
              <div className="scramble--properties">{renderTraits}</div>
            </>
          ) : (
            <div>
              <div className="metadata">
                <div className="owner--string--name">Owner</div>
                <div className="owner--string--value">
                  {/* TODO: VIK: REPLACE FOR PRODUCTION */}
                  <a
                    href={`${process.env.REACT_APP_ETHERSCAN_URL}/token/${process.env.REACT_APP_LOBSTERS_CONTRACT_ADDRESS}?a=${owner}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {shortenEthereumAddress(owner)}
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
                        text={lobsterGene}
                        onCopy={() => {
                          setGeneCopied(true);
                          setTimeout(() => {
                            setGeneCopied(false);
                          }, 1000);
                        }}
                      >
                        <div className="genome--string--value">
                          {shortenEthereumAddress(lobsterGene)}
                        </div>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LobsterInfoPage;
