import React from 'react';
import PropTypes from 'prop-types';
// import { observer } from 'mobx-react';
import item from './hoc/item';
import { Radio } from 'antd';
import _ from 'lodash';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@item
class FormRadioGroup extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.node,
        value: PropTypes.string,
      }),
    ),
  };

  handleChange = e => {
    this.props.onChange({
      value: e.target.value,
    });
  };

  render() {
    return (
      <RadioGroup
        {..._.omit(this.props, 'options')}
        value={this.props.value}
        onChange={this.handleChange}
      >
        {this.props.options.map(opt => {
          return (
            <RadioButton key={opt.value} value={opt.value}>
              {opt.text}
            </RadioButton>
          );
        })}
      </RadioGroup>
    );
  }
}

export default FormRadioGroup;
