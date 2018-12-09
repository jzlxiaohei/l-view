import { observable, action } from 'mobx';
import _ from 'lodash';

class BaseModel {

  @observable draggable = false;
  @observable resizable = true;
  @observable selected = false;

  @action
  setSelected(_selected) {
    this.selected = _selected;
  }

  @action
  setDraggable(_draggable) {
    if(_draggable === this.draggable) {
      return;
    }
    if(_draggable) {
      this.draggable = false;
      this.assignStyle({
        position: 'absolute',
      })
    } else {
      this.draggable = true;
      this.assignStyle({
        position: undefined,
      })
    }
  }

  @action
  setResizable(_resizable) {
    this.resizable = _resizable;
  }

  @observable attr = {};

  @observable style = {};

  @action
  assignAttr(attr) {
    _.forOwn(attr, (value, key) => {
      this.attr[key] = value;
    })
  }

  @action
  assignStyle(style) {
    _.forOwn(style, (value, key) => {
      this.style[key] = value;
    })
  }

}

export default BaseModel;
