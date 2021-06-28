import React, { useState } from 'react';
import HorizontalRangeSlider from './RangeSlider';

export default {
  title: 'Form/RangeSlider',
  component: HorizontalRangeSlider,
};

export const Default = () => {
  const [values, setValues] = useState(20);
  return <HorizontalRangeSlider value={values} setValue={setValues} />;
};

export const Labels = () => {
  const [values, setValues] = useState(500);
  return (
    <HorizontalRangeSlider value={values} setValue={setValues} labelLeft="0" labelRight="100" />
  );
};

export const MinMaxValue = () => {
  const [values, setValues] = useState(200);
  return (
    <HorizontalRangeSlider
      value={values}
      setValue={setValues}
      labelLeft="80"
      labelRight="1000"
      min={80}
      max={1000}
    />
  );
};

export const StepRangeSlider = () => {
  const [values, setValues] = useState(200);
  return (
    <HorizontalRangeSlider
      value={values}
      setValue={setValues}
      labelLeft="80"
      labelRight="1000"
      min={80}
      max={1000}
      step={30}
    />
  );
};
