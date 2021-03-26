import './modals.scss';
import { useState } from 'react';
import MintNft from './mintNft';
import MintNftCollection from './mintNftCollection';
import MintSingleNft from './mintSingleNft';
import CreateNftCol from './createNftCol';
import closeIcon from '../../assets/images/cross.png';

const MintModal = ({ open, onClose, ...restProps }) => {
    const [activeView, setActiveView] = useState(null);
    const [collections, setCollections] = useState([]);

    const handleNtfClick = (type) => {
        setActiveView(type);
    };

    return (
        <div className="whole-modal">
            <div {...restProps} className='mod-div'>
                <button className='modal-close' onClick={onClose}><img src={closeIcon} alt=""/></button>
                {activeView === null && <MintNft onClick={handleNtfClick} />}
                {activeView === 'collection' && <MintNftCollection onClick={handleNtfClick} collections={collections} />}
                {activeView === 'single' && <MintSingleNft onClick={handleNtfClick} />}
                {activeView === 'create-col' && <CreateNftCol onClick={handleNtfClick} />}
            </div>
        </div>
    )
}

export default MintModal;