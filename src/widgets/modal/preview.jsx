import React from 'react';
import PropTypes from 'prop-types';
import preview from '@/hoc/preview';
import cns from 'classnames';
import './index.less';
import { EventTypes } from './constants'

@preview
class Container extends React.Component {
  static NoWrapper = true;

  static propTypes = {
    style: PropTypes.object.isRequired,
    attr: PropTypes.object.isRequired,
    children: PropTypes.node,
  };

  showModalListener = (arg) => {
    const { model } = this.props;
    if(arg.modalId && arg.modalId === model.attr.id) {
      model.assignAttr({
        visible: true,
      })
    }
  }

  componentDidMount() {
    const { eventSystem } = this.props;
    eventSystem.on(EventTypes.showModal, this.showModalListener)
  }

  componentWillUnmount() {
    const { eventSystem } = this.props;
    eventSystem.off(EventTypes.showModal, this.showModalListener)
  }



  handleCoverClick = e => {
    // if (e.target === e.currentTarget) {
    //   this.props.model.assignAttr({
    //     visible: false,
    //   });
    // }
    this.props.onClick(e);
  };

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
