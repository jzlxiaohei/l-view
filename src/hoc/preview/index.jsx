import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import hoistNonReactStatic from 'hoist-non-react-statics';
// import _ from 'lodash';
import cns from 'classnames';
import { observe } from 'mobx';
import './style.less';

export default function previewHoc(OriginComponent) {
  @observer
  class WidgetPreview extends React.Component {
    static propTypes = {
      model: PropTypes.object.isRequired,
      onSelect: PropTypes.func.isRequired,
      className: PropTypes.string,
      eventSystem: PropTypes.shape({
        on: PropTypes.func.isRequired,
        off: PropTypes.func.isRequired,
        emit: PropTypes.func.isRequired,
      })
    };

    constructor(props) {
      super(props);
      this.wrapperRef = React.createRef();
    }

    getRect() {
      const refDom = this.wrapperRef.current;
      const rect = refDom.getBoundingClientRect();
      const left = refDom.offsetLeft;
      const top = refDom.offsetTop;
      return {
        left,
        top,
        width: Math.floor(rect.width),
        height: Math.floor(rect.height),
      };
    }

    componentDidMount() {
      observe(this.props.model, 'draggable', change => {
        const { oldValue, newValue } = change;
        if (oldValue === false && newValue === true) {
          const rect = this.getRect();
          this.props.model.assignStyle(rect);
        }
        if (oldValue === true && newValue === false) {
          this.props.model.assignStyle({
            top: '$d',
            left: '$d',
          });
        }
      });
    }

    handelMouseDownForDrag = e => {
      const model = this.props.model;
      if (!model.draggable) {
        return;
      }

      this.lastDragX = e.clientX;
      this.lastDragY = e.clientY;
      const refDom = this.wrapperRef.current;

      refDom.ownerDocument.addEventListener('mousemove', this.handleDrag);
      refDom.ownerDocument.addEventListener('mouseup', this.handleDragEnd);
    };

    handleDragEnd = () => {
      const refDom = this.wrapperRef.current;
      refDom.ownerDocument.removeEventListener('mousemove', this.handleDrag);
      refDom.ownerDocument.removeEventListener('mouseup', this.handleDragEnd);
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
        left: oldLeft + deltaX,
      });
    };

    handleResizeStart = e => {
      const model = this.props.model;
      if (!model.resizable) {
        return;
      }
      e.stopPropagation();
      const refDom = this.wrapperRef.current;
      const { width, height } = this.getRect();
      this.lastWidth = width;
      this.lastHeight = height;
      this.lastResizeX = e.clientX;
      this.lastResizeY = e.clientY;
      refDom.ownerDocument.addEventListener('mousemove', this.handleMoveResize);
      refDom.ownerDocument.addEventListener('mouseup', this.handleResizeStop);
    };

    handleResizeStop = () => {
      const refDom = this.wrapperRef.current;

      refDom.ownerDocument.removeEventListener(
        'mousemove',
        this.handleMoveResize,
      );
      refDom.ownerDocument.removeEventListener(
        'mouseup',
        this.handleResizeStop,
      );
    };

    handleMoveResize = e => {
      const model = this.props.model;
      const { clientX, clientY } = e;
      const width = clientX - this.lastResizeX;
      const height = clientY - this.lastResizeY;
      model.assignStyle({
        width: this.lastWidth + width,
        height: this.lastHeight + height,
      });
    };

    handleClick = e => {
      e.stopPropagation();
      this.props.onSelect(this.props.model);
    };

    renderDragPoints() {
      const model = this.props.model;
      if (!model.resizable) {
        return null;
      }
      return (
        <React.Fragment>
          <div
            className="drag-point"
            onMouseDown={e => this.handleResizeStart(e)}
          />
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
        zIndex: style.zIndex,
      };
      if (model.draggable) {
        wrapperStyle.position = 'absolute';
      }
      // if (style.position === 'absolute') {
      //   _.assign(wrapperStyle, {
      //     top: style.top,
      //     left: style.left,
      //   });
      // }
      return wrapperStyle;
    }

    renderChildren(model) {
      if (model.children) {
        return model.children.map((ch, index) => {
          return (
            <ch.$Preview
              key={index}
              model={ch}
              onSelect={this.props.onSelect}
              eventSystem={this.props.eventSystem}
            />
          );
        });
      }
    }

    render() {
      const model = this.props.model;
      const { attr, style } = model;
      const wrapperClassName = cns({
        'widget-preview-wrapper': true,
        selected: model.selected,
        [this.props.className]: !!this.props.className,
      });
      const OriginElement = (
        <OriginComponent
          model={model}
          style={{
            ...style,
          }}
          attr={{
            ...attr,
          }}
          eventSystem={this.props.eventSystem}
        >
          {this.renderChildren(model)}
        </OriginComponent>
      );
      if(OriginComponent.NoWrapper) {
        return OriginElement
      }
      return (
        <div
          className={wrapperClassName}
          id={attr.id}
          ref={this.wrapperRef}
          onClick={this.handleClick}
          onMouseDown={this.handelMouseDownForDrag}
          style={this.getWrapperStyle()}
        >
          {OriginElement}
          {this.renderDragPoints()}
        </div>
      );
    }
  }

  hoistNonReactStatic(WidgetPreview, OriginComponent);
  WidgetPreview.$OriginComponent = OriginComponent;

  return WidgetPreview;
}
