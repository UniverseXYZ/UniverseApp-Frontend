import React, {useRef, useEffect} from 'react';
import './inputs.scss';

const Input = ({ label, error, className, ...restProps }) => {
    const ref = useRef(null);

    useEffect(() => {
        ref.current.focus();
    })

    return (
        <div className="intup-l">
            {label && <label className='inp-label'>{label}</label>}
            <input ref={ref} className={`${className} ${error ? 'error-inp' : ''}`} {...restProps} />
            {error && <p className="error-message">{error}</p>}
        </div>
    )
}

export default Input;