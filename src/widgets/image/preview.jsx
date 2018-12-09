import React from 'react';
import PropTypes from 'prop-types';
import preview from '@/hoc/preview';
import './preview.less';

@preview
class Image extends React.Component {

  static propTypes = {
    style: PropTypes.object.isRequired,
    attr: PropTypes.object.isRequired,
  }

  render() {
    const { attr, style } = this.props;
    return (
      <img
        src={attr.src}
        className="preview-widget-image"
        style={{
          width: style.width,
          height: style.height,
        }}
        draggable={false}
        alt=""
      />
    )
  }
}

export default Image;
