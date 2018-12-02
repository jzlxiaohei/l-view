import React from 'react';
import { observer } from 'mobx-react';
// import PropTypes from 'prop-types'
import { SketchPicker } from 'react-color';
import item from '../hoc/item';
import { Popover } from 'antd';
import './style.less';


@item
class ColorPicker extends React.Component {
  handleChange = color => {
    this.props.onChange({
      value: color.hex
    });
  };

  render() {
    return (
      <Popover content={
        <SketchPicker
        {...this.props}
          color={this.props.value}
          onChangeComplete={this.handleChange}
        />
      }>
        <div
          className="comp-form-pick-color-btn"
          style={{
            background: this.props.value,
          }}
        />
      </Popover>
    );
  }
}

export default ColorPicker;
