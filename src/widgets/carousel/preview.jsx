import React from 'react';
import PropTypes from 'prop-types';
import preview from '@/hoc/preview';
// import Siema from 'siema';
import './preview.less';

// TODO: replace siema; may write myself
@preview
class Carousel extends React.Component {

  constructor(props) {
    super(props);
    this.carouselRef = React.createRef();
    this.deltaX = 0;
  }

  handelMouseDown = e => {
    this.lastDragX = e.clientX - this.deltaX;
    this.lastDragY = e.clientY;
    const refDom = this.carouselRef.current;

    refDom.ownerDocument.addEventListener('mousemove', this.handleDrag);
    refDom.ownerDocument.addEventListener('mouseup', this.handleDragEnd);
  }

  handleDragEnd = () => {
    const refDom = this.carouselRef.current;
    refDom.ownerDocument.removeEventListener('mousemove', this.handleDrag);
    refDom.ownerDocument.removeEventListener('mouseup', this.handleDragEnd);
    //

  };

  handleDrag = e => {
    const { clientX, clientY } = e;
    const deltaX = clientX - this.lastDragX;
    const deltaY = clientY - this.lastDragY;
    if(Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }
    // this.lastDragX = clientX;
    this.deltaX = deltaX;
    this.carouselRef.current.style.transform = `translateX(${deltaX}px)`
  };

  componentDidMount() {
    this.carouselRef.current.addEventListener('mousedown', this.handelMouseDown);
  }

  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <div
        key={this.props.children.length}
        className="preview-widget-carousel"
        ref={this.carouselRef}
      >
        {this.props.children}
      </div>
    )
  }
}

export default Carousel;
