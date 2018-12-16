import React from 'react';
import PropTypes from 'prop-types';
import preview from '@/hoc/preview';
// import Siema from 'siema';
import './preview.less';

// TODO: replace siema; may write myself
@preview
class Carousel extends React.Component {

  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <div
        key={this.props.children.length}
        className="preview-widget-carousel"
        ref={ref => this.containerRef = ref }
      >
        {this.props.children}
      </div>
    )
  }
}

export default Carousel;
