import React from 'react';
import PropTypes from 'prop-types';
import preview from '@/hoc/preview';
import { Carousel } from 'antd-mobile';
import CarouselModel from './Model';
import { observer } from 'mobx-react';

@preview
@observer
class LvCarousel extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    model: PropTypes.instanceOf(CarouselModel),
  }

  render() {
    return (
      <div
        key={this.props.children.length}
        className="preview-widget-carousel"
      >
        <Carousel
          autoplay={false}
          infinite
          slideWidth={0.8}
          selectedIndex={this.props.model.selectedIndex}
          cellSpacing={20}
        >
          {this.props.children}
        </Carousel>
      </div>
    )
  }
}

export default LvCarousel;
