import React from 'react';
import PropTypes from 'prop-types';
import preview from '@/hoc/preview';

@preview
class Image extends React.Component {

  static propTypes = {
    src: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired,
  }

  render() {
    return (
      <img
        className="preview-widget-image"
        src={this.props.attr.src}
        style={this.props.style}
        alt=""
        draggable={false}
      />
    )
  }
}

export default Image;
