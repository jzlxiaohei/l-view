import React from 'react';
import PropTypes from 'prop-types';
import preview from '@/hoc/preview';
import './preview.less';

@preview
class Text extends React.Component {

  render() {
    return (
      <div
        className="preview-widget-text"
        style={this.props.style}
        dangerouslySetInnerHTML={{
          __html: this.props.attr.text,
        }}
      />
    )
  }
}

export default Text;
