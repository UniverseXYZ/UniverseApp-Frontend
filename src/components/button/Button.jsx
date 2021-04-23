import './Button.scss';

const Button = ({ children, ...restProps }) => <button {...restProps}>{children}</button>;

export default Button;
