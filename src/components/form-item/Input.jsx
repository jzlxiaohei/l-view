import React from 'react';
// import { observer } from 'mobx-react';
import item from './hoc/item';
import { Input } from 'antd';

@item
class AutoInput extends React.Component {

  handleChange = e => {
    this.props.onChange({
      value: e.target.value
    });
  };

  render() {
    return (
      <Input
        {...this.props}
        value={this.props.value}
        onChange={this.handleChange}
      />
    );
  }
}

export default AutoInput;
