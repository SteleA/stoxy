import React from 'react';
import './slider.css';

require('rc-slider/assets/index.css');
require('rc-tooltip/assets/bootstrap.css');

const Tooltip = require('rc-tooltip');
const Slider = require('rc-slider');

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

export default ({ value, dragging, index, ...restProps }) => {
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Range {...restProps} />
    </Tooltip>
  );
};
