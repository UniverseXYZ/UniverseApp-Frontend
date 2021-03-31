import './modals.scss';
import { useContext } from 'react';
import MintNft from './mintNft';
import MintNftCollection from './mintNftCollection';
import MintSingleNft from './mintSingleNft';
import PopupComponent from '../Popups/popup';
import AppContext from '../../ContextAPI';


const MintModal = ({ open, onClose, ...restProps }) => {
    const { activeView, setActiveView } = useContext(AppContext);

    const handleNtfClick = (type) => {
        setActiveView(type);
    };

    return (
        <div className="whole-modal">
            <div {...restProps} className='mod-div'>
                <PopupComponent onClose={onClose} />
                {activeView === null && <MintNft onClick={handleNtfClick} />}
                {activeView === 'single' && <MintSingleNft onClick={handleNtfClick} />}
                {activeView === 'collection' && <MintNftCollection onClick={handleNtfClick} />}
            </div>
        </div>
    )
}

export default MintModal;
