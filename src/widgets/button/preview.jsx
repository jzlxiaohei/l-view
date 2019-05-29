import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import preview from '@/hoc/preview';


@preview
class Button extends React.Component {

  static propTypes = {
    style: PropTypes.object.isRequired,
    attr: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div
        className="preview-widget-button"
        style={this.props.style}
      >
        {this.props.attr.text}
      </div>
    )
  }
}

export default Button;
