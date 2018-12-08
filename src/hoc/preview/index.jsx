import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import _ from 'lodash';
import './style.less';

export default function previewHoc(OriginComponent) {

  @observer
  class WidgetPreview extends React.Component {

    static propTypes = {
      model: PropTypes.object.isRequired,
    }

    constructor(props) {
      super(props);
      this.wrapperRef = React.createRef();
    }

    componentDidMount() {
    }

    componentWillUnmount() {
      this.destroyDrag();
    }

    getRect() {
      const refDom = this.wrapperRef.current;
      const rect = refDom.getBoundingClientRect();
      const left = refDom.offsetLeft;
      const top =  refDom.offsetTop;
      return {
        left,
        top,
        width: Math.floor(rect.width),
        height: Math.floor(rect.height),
      }
    }

    initDrag() {
      const { top, left } = this.getRect();
      this.props.model.assignStyle({
        top,
        left,
      });
    }

    handelMouseDownForDrag = e => {
      const model = this.props.model;
      if(!model.draggable) {
        return;
      }

      this.lastDragX = e.clientX;
      this.lastDragY = e.clientY;
      const refDom = this.wrapperRef.current;

      refDom.ownerDocument.addEventListener(
        'mousemove',
        this.handleDrag
      );
      refDom.ownerDocument.addEventListener(
        'mouseup',
        this.handleDragEnd
      );
    };

    handleDragEnd = () => {
      const refDom = this.wrapperRef.current;
      refDom.ownerDocument.removeEventListener(
        'mousemove',
        this.handleDrag
      );
      refDom.ownerDocument.removeEventListener(
        'mouseup',
        this.handleDragEnd
      );
    };

    handleDrag = e => {
      const model = this.props.model;
      const { clientX, clientY } = e;
      const deltaX = clientX - this.lastDragX;
      const deltaY = clientY - this.lastDragY;
      this.lastDragX = clientX;
      this.lastDragY = clientY;
      const oldTop = parseFloat(model.style.top) || 0;
      const oldLeft = parseFloat(model.style.left) || 0;
      model.assignStyle({
        top: oldTop + deltaY,
        left: oldLeft + deltaX
      });
    };


    handleResizeStart = (e) => {
      const model = this.props.model;
      if(!model.resizable) {
        return;
      }
      e.stopPropagation();
      const refDom = this.wrapperRef.current;
      const {width, height } = this.getRect();
      this.lastWidth = width;
      this.lastHeight = height;
      this.lastResizeX = e.clientX;
      this.lastResizeY = e.clientY;
      refDom.ownerDocument.addEventListener(
        'mousemove',
        this.handleMoveResize
      );
      refDom.ownerDocument.addEventListener(
        'mouseup',
        this.handleResizeStop
      );
    }

    handleResizeStop = () => {
      const refDom = this.wrapperRef.current;

      refDom.ownerDocument.removeEventListener(
        'mousemove',
        this.handleMoveResize
      );
      refDom.ownerDocument.removeEventListener(
        'mouseup',
        this.handleResizeStop
      );
    }

    handleMoveResize = (e) => {
      const model = this.props.model;
      const { clientX, clientY } = e;
      const width = clientX - this.lastResizeX;
      const height = clientY - this.lastResizeY;
      model.assignStyle({
        width: this.lastWidth + width,
        height: this.lastHeight + height,
      });
    }

    renderDragPoints() {
      return (
        <React.Fragment>
          <div className="drag-point" onMouseDown={(e) => this.handleResizeStart(e)} />
        </React.Fragment>
      );
    }

    getWrapperStyle() {
      const model = this.props.model;
      const { style } = model;
      let wrapperStyle = {
        width: style.width,
        height: style.height,
        top: style.top,
        left: style.left,
      }
      if (style.position === 'absolute') {
         _.assign(wrapperStyle, {
          top: style.top,
          left: style.left,
        })
      }
      return wrapperStyle;
    }

    render() {
      const model = this.props.model;
      const { attr } = model;
      return (
        <div
          className="widget-preview-wrapper"
          ref={this.wrapperRef}
          onMouseDown={this.handelMouseDownForDrag}
          style={this.getWrapperStyle()}>
          <OriginComponent
            model={model}
            style={_.omit(model.style, ['top', 'left'])}
            attr={{
              ...attr
            }}
          />
          {this.renderDragPoints()}
        </div>
      )
    }
  }

  hoistNonReactStatic(WidgetPreview, OriginComponent)
  WidgetPreview.$OriginComponent = OriginComponent

  return WidgetPreview;
}
