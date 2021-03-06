import { observable, action, toJS } from 'mobx';
import _ from 'lodash';

class BaseModel {

  // `draggable: true` means `position: absolute`, and can be dragged by user
  @observable draggable = false;
  @observable resizable = true;
  @observable selected = false;
  @observable expanded = false;


  @action
  setSelected(_selected) {
    this.selected = _selected;
  }

  @action
  setExpanded(_expanded) {
    this.expanded = _expanded;
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
      if(value === '$d') {
        delete this.attr[key];
      } else {
        this.attr[key] = value;
      }
    })
  }

  @action
  assignStyle(style) {
    _.forOwn(style, (value, key) => {
      if(value === '$d') {
        delete this.style[key];
      } else {
        this.style[key] = value;
      }
    })
  }

  @observable children = [];

  @action
  push(child) {
    if(_.isArray(child)) {
      child.forEach(ch => {
        ch.$parent = this;
        this.children.push(ch)
      });
    } else {
      child.$parent = this;
      this.children.push(child);
    }
  }

  getJSON() {
    const json = {
      style: toJS(this.style),
      attr: toJS(this.attr),
      type: this.$type,
    }
    if (this.children.length) {
      json.children = this.children.map(ch => ch.getJSON())
    }
    return json;
  }

}

export default BaseModel;
