import React, { useContext, useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { useHistory, useParams } from 'react-router-dom';
import uuid from 'react-uuid';
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

const PolymorphScramblePage = () => {
  const history = useHistory();
  const { selectedNftForScramble, setSelectedNftForScramble } = useContext(AppContext);

  const [propertiesTabSelected, setPropertiesTabSelected] = useState(true);
  const [metadataTabSelected, setMetadataTabSelected] = useState(false);
  const [polymorphId, setPolymorphId] = useState(useParams().id);
  const [polymorphData, setPolymorphData] = useState({});

  useEffect(async () => {
    if (!polymorphId) return;
    const data = await getPolymorphMeta(polymorphId);
    setPolymorphData(data);
    console.log(data);
  }, [polymorphId]);

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

  const onGoBack = () => {
    history.goBack();
  };

  const onOpenOptionsPopUp = () => {
    document.getElementById('popup-root').remove();
    document.getElementById('popup-hidden-btn').click();
  };

  const getAttributesMapping = (attributes = []) =>
    attributes.map((attr) => ({
      trait: attr.trait_type,
      name: attr.value,
      // chance: PropTypes.string.isRequired, //TODO:: We dont have it
    }));

  const attributes = getAttributesMapping(polymorphData?.data?.attributes);
  console.log('Scrabmlbe PAge rerender');

  return !isEmpty(selectedNftForScramble) ? (
    <div className="container scramble--wrapper">
      <Popup
        trigger={
          <button
            type="button"
            id="popup-hidden-btn"
            aria-label="hidden"
            style={{ display: 'none' }}
          />
        }
      >
        {(close) => <PolymorphScramblePopup onClose={close} />}
      </Popup>
      <Popup
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
        <div className="avatar--wrapper">
          <img src={polymorphData?.data?.image} className="person" alt="Polymorph" />
        </div>

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
            <div className="metadata">
              <div className="genome--string--name">Genome string</div>
              <div className="genome--string--value">
                {'0xDC25EF3F5B8A186998338A2ADA83795FBA2D695E'.substr(0, 14)}
                {'...'}
                {'0xDC25EF3F5B8A186998338A2ADA83795FBA2D695E'.substr(38)}
              </div>
            </div>
          )}

          <Button className="light-button" onClick={onOpenOptionsPopUp}>
            Scramble options
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <NotFound />
  );
};

export default PolymorphScramblePage;
