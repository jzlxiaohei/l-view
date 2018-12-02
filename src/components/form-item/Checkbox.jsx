import React from 'react';
import item from './hoc/item';
import { Checkbox } from 'antd';
// import _ from 'lodash';

@item
class AutoInput extends React.PureComponent {
  handleChange = e => {
    this.props.onChange({
        value: e.target.checked
    });
  };

  render() {
    return (
      <Checkbox
        {...this.props}
        checked={this.props.value}
        onChange={this.handleChange}
      />
    );
  }
}

export default AutoInput;
