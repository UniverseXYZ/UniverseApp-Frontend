import React from 'react';
import HorizontalSlider from './HorizontalSlider';

export default {
  title: 'Form/DistributionCurve',
  component: HorizontalSlider,
};

export const Default = () => <HorizontalSlider />;
export const PropsValue = () => <HorizontalSlider value={50} />;
export const SetMaxMinValue = () => <HorizontalSlider min={80} max={150} value={90} />;
export const SoldOut = () => <HorizontalSlider max={2500} value={2500} />;
export const SectionWhiteBackgroundColor = () => <HorizontalSlider color1="black" color2="white" />;
