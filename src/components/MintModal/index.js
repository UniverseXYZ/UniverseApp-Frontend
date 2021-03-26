import './modals.scss';
import { useState, useEffect, useContext, useRef } from 'react';
import MintNft from './mintNft';
import MintNftCollection from './mintNftCollection';
import MintSingleNft from './mintSingleNft';
import CreateNftCol from './createNftCol';
import closeIcon from '../../assets/images/cross.png';
import AppContext from '../../ContextAPI';

const MintModal = ({ open, onClose, ...restProps }) => {
    const { handleClickOutside, setShowModal } = useContext(AppContext);
    const [activeView, setActiveView] = useState(null);
    const [collections, setCollections] = useState([]);
    const ref = useRef(null);

    const handleNtfClick = (type) => {
        setActiveView(type);
    };

    useEffect(() => {
        document.addEventListener('click', (e) => handleClickOutside(e, 'mod-div', ref, setShowModal), true);
        return () => {
            document.removeEventListener('click', (e) => handleClickOutside(e, 'mod-div', ref, setShowModal), true);
        };
    })

    return (
        <div className="whole-modal">
            <div ref={ref} {...restProps} className='mod-div'>
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