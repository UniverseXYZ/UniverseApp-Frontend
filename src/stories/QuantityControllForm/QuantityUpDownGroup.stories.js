import React, { useState } from 'react';
import QuantityUpDownGroup from './QuantityUpDownGroup';

export default {
  title: 'Form/QuantityControllForm',
  component: QuantityUpDownGroup,
};

export const Default = () => {
  const [values, setValues] = useState(1);
  return <QuantityUpDownGroup labelText="Quantity" value={values} onChange={setValues} />;
};

export const ButtonsContent = () => {
  const [values, setValues] = useState(1);
  return (
    <QuantityUpDownGroup
      labelText="Quantity"
      value={values}
      onChange={setValues}
      btnLeftText={<div className="down" />}
      btnRightText={
        <>
          <div className="up--horizontal" />
          <div className="up--vertical" />
        </>
      }
    />
  );
};

export const MinMaxProps = () => {
  const [values, setValues] = useState(5);
  return (
    <QuantityUpDownGroup
      labelText="Quantity"
      value={values}
      onChange={setValues}
      btnLeftText={<div className="down" />}
      min={5}
      max={8}
      btnRightText={
        <>
          <div className="up--horizontal" />
          <div className="up--vertical" />
        </>
      }
    />
  );
};

export const LabelText = () => {
  const [values, setValues] = useState(5);
  return (
    <QuantityUpDownGroup
      labelText="Label"
      value={values}
      onChange={setValues}
      btnLeftText={<div className="down" />}
      min={5}
      max={8}
      btnRightText={
        <>
          <div className="up--horizontal" />
          <div className="up--vertical" />
        </>
      }
    />
  );
};
