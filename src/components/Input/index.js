import './inputs.scss';
const Input = ({ label, error, className, ...restProps }) => {
    return (
        <div className="intup-l">
            {label && <label class='inp-label'>{label}</label>}
            <input className={`${className} ${error ? 'error-inp' : ''}`} {...restProps} />
            {error && <p className="error-message">{error}</p>}
        </div>
    )
}

export default Input;