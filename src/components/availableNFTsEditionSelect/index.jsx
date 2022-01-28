import React, { useEffect, useState, useRef } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';
import { FixedSizeList as List } from 'react-window';
import { handleClickOutside } from '../../utils/helpers';

const Option = (props) => {
  const { isSelected, label, value, isDisabled } = props;
  return (
    <div className={`available-select ${isDisabled ? 'disabled' : ''}`}>
      <components.Option className="option" {...props}>
        <input
          className="option"
          type="checkbox"
          value={value}
          checked={isSelected}
          onChange={() => null}
        />{' '}
        <i className="option" />
        <label className="option">{label}</label>
      </components.Option>
    </div>
  );
};

Option.propTypes = {
  isSelected: PropTypes.bool,
  isDisabled: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
};

Option.defaultProps = {
  isSelected: false,
  isDisabled: false,
  label: '',
};

const Placeholder = (props) => (
  <components.Placeholder {...props}>
    <p>Edition # </p>
  </components.Placeholder>
);

Placeholder.propTypes = {
  isSelected: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

Placeholder.defaultProps = {
  isSelected: false,
  label: '',
};

const MenuList = (props) => {
  const { children, maxHeight, getValue, options } = props;
  const height = 30;
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * height;

  return (
    <>
      <span className="choose-edition">Choose edition number</span>
      <List
        className="list"
        height={maxHeight}
        itemCount={children.length}
        itemSize={height}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    </>
  );
};

MenuList.propTypes = {
  children: PropTypes.node.isRequired,
  maxHeight: PropTypes.number.isRequired,
  getValue: PropTypes.func.isRequired,
  options: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

const styles = {
  placeholder: (defaultStyles) => ({
    ...defaultStyles,
    color: '#CACACA',
    fontFamily: 'Space Grotesk, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    width: 'fit-content',
  }),
  container: (defaultStyles) => ({
    ...defaultStyles,
    width: '95px',
    background:
      'linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(135deg, #bceb00, #00eaea) border-box',
    boxShadow: '0px 10px 20px rgb(136 120 172 / 20%)',
    border: '1px solid transparent',
    borderRadius: '15px',
    cursor: 'pointer',
    position: 'relative',
  }),
  menu: (defaultStyles) => ({
    ...defaultStyles,
    width: '225px',
    position: 'absolute',
    right: '3%',
    top: '80%',
  }),
  indicatorsContainer: () => ({
    '& > div': {
      padding: 0,
    },
  }),
  input: (defaultStyles) => ({
    ...defaultStyles,
    appearance: 'auto',
    caretColor: 'transparent',
    cursor: 'pointer',
  }),
  control: (base, state) => ({
    ...base,
    fontFamily: 'Space Grotesk, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    border: '1px solid rgba(0, 0, 0, 0.1);',
    opacity: '0.7',
    boxShadow: 'none',
    '&:hover': {
      border: '1px solid rgba(0, 0, 0, 0.1);',
    },
    fontSize: '12px',
    lineHeight: '18px',
    alignItems: 'center',
    color: '#000000',
    background: '#ffffff',
    borderRadius: '12px',
    flexGrow: '0',
    padding: '0 8px 2px 0',
    cursor: 'pointer',
    minHeight: 'initial',
    width: '100%',
  }),
  valueContainer: (base, state) => ({
    ...base,
    padding: '0 0 0 8px',
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: '#000000',
    transform: state.selectProps.menuIsOpen ? 'rotate(-180deg)' : 'rotate(0)',
    transition: '250ms',
    width: '14px',
  }),
  option: (base, state) => ({
    ...base,
    color: state.isDisabled ? 'color: rgba(0, 0, 0, 0.2)' : '#000000',
    fontFamily: 'Space Grotesk, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '15px',
    cursor: 'pointer',
    opacity: state.isFocused ? '1' : '0.7',
    background: state.isSelected || state.isFocused ? '#F6FAF3' : null,
    '&:active': {
      background: '#F6FAF3',
    },
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
    '& label': {
      cursor: 'pointer',
      fontSize: '12px',
    },
    '&:first-of-type': {
      borderTop: '1px solid rgba(0, 0, 0, 0.2)',
      borderBottom: 'none',
    },
    '& i::after': {
      borderColor: '#000 !important',
    },
  }),
};

const SelectComponent = (props) => {
  const { options, onChange, placeholder, isMulti } = props;
  const [isOpen, toggleIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    setSelectedOptions([]);
    const selected = options.filter((op) => op.isSelected);
    setSelectedOptions(selected);
  }, [options]);

  const handleToggle = (e) => {
    if (e.target.classList.contains('option')) return;
    toggleIsOpen(!isOpen);
  };

  useEffect(() => {
    document.addEventListener(
      'click',
      (e) => handleClickOutside(e, 'react-select-wrapper', ref, toggleIsOpen),
      true
    );
    return () => {
      document.removeEventListener(
        'click',
        (e) => handleClickOutside(e, 'react-select-wrapper', ref, toggleIsOpen),
        true
      );
    };
  });

  return (
    <div
      className="react-select-wrapper"
      ref={ref}
      aria-hidden
      role="button"
      onClick={handleToggle}
    >
      <Select
        options={options}
        isOptionDisabled={(option) => option.isDisabled}
        onChange={onChange}
        placeholder={placeholder}
        styles={styles}
        value={selectedOptions}
        components={{
          Option,
          Placeholder,
          MenuList,
          IndicatorSeparator: () => null,
        }}
        menuPlacement="auto"
        isMulti={isMulti}
        controlShouldRenderValue={false}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        isClearable={false}
        menuIsOpen={isOpen}
      />
    </div>
  );
};

SelectComponent.defaultProps = {
  placeholder: '',
  isMulti: false,
};

SelectComponent.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  isMulti: PropTypes.bool,
};

export default SelectComponent;
