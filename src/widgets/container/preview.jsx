import React from 'react';
import PropTypes from 'prop-types';
import preview from '@/hoc/preview';

@preview
class Container extends React.Component {

  static propTypes = {
    style: PropTypes.object.isRequired,
    attr: PropTypes.object.isRequired,
    children: PropTypes.node,
  }

  render() {
    return (
      <div
        className="preview-widget-container"
        style={this.props.style}
      >
        {this.props.children}
      </div>
    )
  }
}

export default Container;
