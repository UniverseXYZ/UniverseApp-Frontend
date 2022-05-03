import React from 'react';
// import './SelectComponent.scss';
import PropTypes from 'prop-types';
import Select from 'react-select';

const SelectComponent = (props) => {
  const { options, onChange, placeholder } = props;
  const styles = {
    placeholder: (defaultStyles) => ({
      ...defaultStyles,
      color: '#CACACA',
      fontFamily: 'Space Grotesk, sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '16px',
    }),
    control: (base, state) => ({
      ...base,
      fontFamily: 'Space Grotesk, sans-serif',
      fontStyle: 'normal',
      fontWeight: 'bold',
      border: '1px solid rgba(0, 0, 0, 0.1);',
      opacity: '0.7',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid rgba(0, 0, 0, 0.1);',
      },
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: '#000000',
      transform: state.isFocused && state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
    }),
    option: (base, state) => ({
      ...base,
      color: '#000000',
      fontFamily: 'Space Grotesk, sans-serif',
      fontStyle: 'normal',
      fontWeight: 'bold',
      padding: '15px',
      opacity: state.isFocused ? '1' : '0.7',
      background: state.isSelected || state.isFocused ? 'rgba(0, 0, 0, 0.05)' : null,
      borderRadius: '6px',
    }),
  };

  return (
    <Select
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      styles={styles}
      components={{
        IndicatorSeparator: () => null,
      }}
      menuPlacement="auto"
    />
  );
};

SelectComponent.defaultProps = {
  placeholder: '',
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
};

export default SelectComponent;
