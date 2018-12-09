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
    const { attr } = this.props;
    return (
      <img
        src={attr.src}
        className="preview-widget-image"
        draggable={false}
        alt=""
      />
    )
  }
}

export default Image;
