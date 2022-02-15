import React, { useEffect, useState, useRef } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';
import { handleClickOutside } from '../../utils/helpers';
import WinnerIcon from '../../assets/images/winner-icon.svg';

const Option = (props) => {
  const { value } = props;
  return (
    <div className="available-select">
      <components.Option className="option" {...props}>
        <label className="option-items">
          <img src={WinnerIcon} alt="winner icon" />
          <span className="label-and-value">
            {value.label}
            <span className="nfts-count">{value.nftsCount} NFTs</span>
          </span>
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
          <img src={WinnerIcon} alt="winner icon" />
          <span className="label-and-value">
            {values.label}
            <span className="nfts-count">{values.nftsCount} NFTs</span>
          </span>
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
    '&:hover': {
      '&+.box--shadow--effect--block': {
        opacity: '0.2 !important',
      },
    },
  }),
  menu: (defaultStyles) => ({
    ...defaultStyles,
    width: '100%',
    boxShadow: ' 0px 10px 36px rgba(136, 120, 172, 0.14)',
    borderRadius: '12px',
    padding: '8px',
    marginBottom: '0',
  }),
  indicatorsContainer: () => ({
    width: '14px',
    height: '21px',
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
    display: 'grid',
    gridTemplateColumns: '1fr 20px',
    flexWrap: 'nowrap',
    width: '100%',
    minWidth: '100px',
    borderRadius: '12px',
    padding: '12px 18px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderColor: state.selectProps.menuIsOpen ? 'transparent' : 'rgba(0, 0, 0, 0.1)',
    background: state.selectProps.menuIsOpen
      ? 'linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(135deg, #bceb00, #00eaea) border-box !important'
      : '',
    '&:hover': {
      background: state.selectProps.menuIsOpen
        ? 'linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(135deg, #bceb00, #00eaea) border-box !important'
        : '',
    },
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
  const [isOpen, toggleIsOpen] = useState(false);

  const handleToggle = (e) => {
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
        hideSelectedOptions
        isClearable={false}
        getOptionValue={(option) => option}
        menuIsOpen={isOpen}
      />
      <div className="box--shadow--effect--block" />
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
