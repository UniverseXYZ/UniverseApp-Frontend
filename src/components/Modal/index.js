import './modals.scss';

import closeIcon from '../../assets/images/cross.png';

const Modal = ({ open, onClose, children, ...restProps }) => {
    if (!open) return null;

    return (
        <div className="whole-modal">
        <div {...restProps} className='mod-div'>
            <button className='modal-close' onClick={onClose}><img src={closeIcon} /></button>
            {children}
        </div>
        </div>
    )
}

export default Modal;