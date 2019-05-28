import React from 'react';
import PropTypes from 'prop-types';
import preview from '@/hoc/preview';
import CarouselModel from './model';
import { observer } from 'mobx-react';
import { observe } from 'mobx';
import Slider from "react-slick";
import './preview.less';

@preview
@observer
class LvCarousel extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    model: PropTypes.instanceOf(CarouselModel),
  }

  state = {
    forceKey: 0,
  }

  componentDidMount() {
    observe(this.props.model, 'children', () => {
      this.setState({
        forceKey: this.state.forceKey + 1,
      })
    })
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '20px',
    };
    return (
      <div
        className="preview-widget-carousel"
        key={this.state.forceKey}
      >
        <Slider {...settings}>
          {this.props.children}
        </Slider>
      </div>
    )
  }
}

export default LvCarousel;
