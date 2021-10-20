import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';

const Option = (props) => {
  const { isSelected, label, value } = props;
  return (
    <div>
      <components.Option {...props}>
        <input type="checkbox" value={value} checked={isSelected} onChange={() => null} /> <i />
        <label>{label}</label>
      </components.Option>
    </div>
  );
};

Option.propTypes = {
  isSelected: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

Option.defaultProps = {
  isSelected: false,
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

const SelectComponent = (props) => {
  const { options, onChange, placeholder, isMulti } = props;
  const styles = {
    placeholder: (defaultStyles) => ({
      ...defaultStyles,
      color: '#CACACA',
      fontFamily: 'Space Grotesk, sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '16px',
    }),
    container: (defaultStyles) => ({
      ...defaultStyles,
      // position: 'unset',
      width: '60%',
      background:
        'linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(to right, #bceb00, #00eaea) border-box',
      boxShadow: '0px 10px 20px rgb(136 120 172 / 20%)',
      border: '1px solid transparent',
      borderRadius: '15px',
      cursor: 'pointer',
      position: 'relative',
    }),
    menu: (defaultStyles) => ({
      ...defaultStyles,
      width: '160%',
      position: 'absolute',
      right: '3%',
      top: '90%',
    }),
    indicatorsContainer: (defaultStyles) => ({
      ...defaultStyles,
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
      padding: '2px 8px 2px 10px',
      cursor: 'pointer',
    }),
    valueContainer: (base, state) => ({
      ...base,
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: '#000000',
      transform: state.selectProps.menuIsOpen ? 'rotate(-180deg)' : 'rotate(0)',
      transition: '250ms',
    }),
    option: (base, state) => ({
      ...base,
      color: state.isDisabled ? 'color: rgba(0, 0, 0, 0.2)' : '#000000',
      fontFamily: 'Space Grotesk, sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      padding: '15px',
      opacity: state.isFocused ? '1' : '0.7',
      background: state.isSelected || state.isFocused ? '#F6FAF3' : null,
      '&:active': {
        background: '#F6FAF3',
      },
      borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
    }),
  };

  return (
    <Select
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      styles={styles}
      components={{
        Option,
        Placeholder,
        IndicatorSeparator: () => null,
      }}
      menuPlacement="auto"
      isMulti={isMulti}
      controlShouldRenderValue={false}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      isClearable={false}
      // menuIsOpen
    />
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
