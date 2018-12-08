import React from 'react';
import PropTypes from 'prop-types';
// import { observer } from 'mobx-react';
import item from './hoc/item';
import { Radio, Tooltip } from 'antd';
import _ from 'lodash';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@item
class FormRadioGroup extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.node.isRequired,
        value: PropTypes.string.isRequired,
        toolTip: PropTypes.object, // antd tooltip options
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
          const child = (
            <RadioButton key={opt.value} value={opt.value}>
              {opt.text}
            </RadioButton>
          );
          if (opt.toolTip) {
            return (
              <Tooltip key={opt.value} trigger="hover" {...opt.toolTip}>
                {child}
              </Tooltip>
            )
          }
          return child;
        })}
      </RadioGroup>
    );
  }
}

export default FormRadioGroup;
