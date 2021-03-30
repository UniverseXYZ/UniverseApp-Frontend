import './modals.scss';
import { useContext, useState } from 'react';
import MintNft from './mintNft';
import MintNftCollection from './mintNftCollection';
import MintSingleNft from './mintSingleNft';
import CreateNftCol from './createNftCol';
import PopupComponent from '../Popups/popup';
import AppContext from '../../ContextAPI';


const MintModal = ({ open, onClose, ...restProps }) => {
    const { activeView, setActiveView } = useContext(AppContext);
    const [collections, setCollections] = useState([]);

    const handleNtfClick = (type) => {
        setActiveView(type);
    };

    return (
        <div className="whole-modal">
            <div {...restProps} className='mod-div'>
                <PopupComponent onClose={onClose} />    
                {activeView === null && <MintNft onClick={handleNtfClick} />}
                {activeView === 'collection' && <MintNftCollection onClick={handleNtfClick} collections={collections} />}
                {activeView === 'single' && <MintSingleNft onClick={handleNtfClick} />}
                {activeView === 'create-col' && <CreateNftCol onClick={handleNtfClick} />}
            </div>
        </div>
    )
}

export default MintModal;
