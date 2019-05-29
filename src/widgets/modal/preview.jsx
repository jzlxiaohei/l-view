import React from 'react';
import PropTypes from 'prop-types';
import preview from '@/hoc/preview';
import cns from 'classnames';
import './index.less';

@preview
class Container extends React.Component {

  static NoWrapper = true;

  static propTypes = {
    style: PropTypes.object.isRequired,
    attr: PropTypes.object.isRequired,
    children: PropTypes.node,
  };

  handleCoverClick = (e) => {
    // if(e.target === e.currentTarget) {
      this.props.model.assignAttr({
        visible: false,
      })
    // }
  }

  render() {
    const coverClassName = cns('preview-widget-modal-cover', {
      visible: this.props.attr.visible,
    });
    return (
      <div className={coverClassName} onClick={this.handleCoverClick}>
        <div className="preview-widget-modal" style={this.props.style}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Container;
