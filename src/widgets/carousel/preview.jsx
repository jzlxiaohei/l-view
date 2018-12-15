import React from 'react';
import PropTypes from 'prop-types';
import preview from '@/hoc/preview';
import Siema from 'siema';


@preview
class Carousel extends React.Component {

  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }

  static propTypes = {
    children: PropTypes.node,
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    this.destroy();
  }

  componentDidUpdate(prevProps, prevState) {
    this.destroy();
    this.init();
  }


  init() {
    this.siema = new Siema({
      selector: this.containerRef
    });
  }

  destroy() {
    if (this.siema) {
      this.siema.destroy();
      this.siema = undefined;
    }
  }



  render() {
    return (
      <div
        className="preview-widget-carousel"
        ref={ref => this.containerRef = ref }
      >
        {this.props.children}
      </div>
    )
  }
}

export default Carousel;
