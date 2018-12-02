import React from 'react';
import item from './hoc/item';
import { Slider } from 'antd';
// import _ from 'lodash';


function parseTransform(str) {
  const reg = /rotate\((\d+)deg\)/;
  const result = reg.exec(str);
  return {
    rotate: +initValue(result, 1),
  }
}

function stringifyTransform(transformObj) {
  return `rotate(${transformObj.rotate}deg)`

}

function initValue(obj, key, defaultValue=0) {
  if(obj && obj[key] !== undefined) {
    return obj[key];
  }
  return defaultValue;
}

// 暂时只考虑 rotate
// modelValue:  'rotate(18deg) skew(0)'
// viewValue: { rotate: 18, skew 0}

@item
class Transform extends React.PureComponent {

  static transformToView(modelValue) {
    return parseTransform(modelValue);
  }

  static transformToModel(viewValue) {
    return stringifyTransform(viewValue);
  }

  handleRotateChange = rotateValue => {
    this.props.onChange({
      value: {
        ...this.props.value,
        rotate: rotateValue
      }
    });
  };

  render() {
    return (
      <Slider
        min={0}
        max={360}
        {...this.props}
        value={this.props.value.rotate || 0}
        onChange={this.handleRotateChange}
      />
    );
  }
}

export default Transform;
