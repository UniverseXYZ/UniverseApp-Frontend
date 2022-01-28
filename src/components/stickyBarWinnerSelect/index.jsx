import React, { useEffect, useState, useRef } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';
import { handleClickOutside } from '../../utils/helpers';

const Option = (props) => {
  const { value } = props;
  return (
    <div className="available-select">
      <components.Option className="option" {...props}>
        <label className="option">
          label {value.label}
          value {value.value}
          nfts count {value.nftsCount}
        </label>
      </components.Option>
    </div>
  );
};

Option.propTypes = {
  label: PropTypes.string,
  nftsCount: PropTypes.number,
  value: PropTypes.string.isRequired,
};

Option.defaultProps = {
  label: '',
  nftsCount: 0,
};

const ValueContainer = (props) => {
  const { getValue, hasValue, options } = props;
  const currentSelected = getValue();
  const values = options.find((o) => o.value === currentSelected[0].value);

  if (!values)
    return (
      <div className="value-container-custom">
        <components.ValueContainer className="value-container" {...props}>
          <p>Please select a winner</p>
        </components.ValueContainer>
      </div>
    );
  return (
    <div className="value-container-custom">
      <components.ValueContainer className="value-container" {...props}>
        <label className="option">
          label {values.label}
          value {values.value}
          nfts count {values.nftsCount}
        </label>
      </components.ValueContainer>
    </div>
  );
};

ValueContainer.propTypes = {
  hasValue: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      nftsCount: PropTypes.number.isRequired,
    })
  ).isRequired,
  getValue: PropTypes.func.isRequired,
};

ValueContainer.defaultProps = {
  hasValue: true,
};

const styles = {
  placeholder: (defaultStyles) => ({
    ...defaultStyles,
  }),
  container: (defaultStyles) => ({
    ...defaultStyles,
  }),
  menu: (defaultStyles) => ({
    ...defaultStyles,
    width: '160%',
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
  }),
  valueContainer: (base, state) => ({
    ...base,
    padding: '0 8px',
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: '#000000',
    transform: state.selectProps.menuIsOpen ? 'rotate(-180deg)' : 'rotate(0)',
    transition: '250ms',
  }),
  option: (base, state) => ({
    ...base,
  }),
};

const SelectComponent = (props) => {
  const { options, onChange, selectedWinner } = props;
  const ref = useRef(null);

  return (
    <div className="react-select-wrapper" ref={ref} aria-hidden role="button">
      <Select
        options={options}
        isOptionDisabled={(option) => option.isDisabled}
        onChange={onChange}
        styles={styles}
        components={{
          Option,
          ValueContainer,
          IndicatorSeparator: () => null,
        }}
        menuPlacement="auto"
        defaultValue={options[0]}
        value={options[selectedWinner]}
        closeMenuOnSelect
        hideSelectedOptions={false}
        isClearable={false}
        getOptionValue={(option) => option}
      />
    </div>
  );
};

SelectComponent.defaultProps = {};

SelectComponent.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  selectedWinner: PropTypes.number.isRequired,
};

export default SelectComponent;
