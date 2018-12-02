import React from 'react';
import { observer } from 'mobx-react';
// import PropTypes from 'prop-types'
import { SketchPicker } from 'react-color';
import item from './hoc/item';

@item
@observer
class ColorPicker extends React.Component {
  handleChange = color => {
    this.props.onChange({
      value: color.hex
    });
  };

  render() {
    return (
      <SketchPicker
        {...this.props}
        color={this.props.value}
        onChangeComplete={this.handleChange}
      />
    );
  }
}

export default ColorPicker;
