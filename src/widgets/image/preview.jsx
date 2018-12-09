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
    const { style, attr } = this.props;
    return (
      <img
        {...attr}
        className="preview-widget-image"
        style={style}
        draggable={false}
        alt=""
      />
    )
  }
}

export default Image;
