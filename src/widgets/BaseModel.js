import { observable, action } from 'mobx';
import _ from 'lodash';

class BaseModel {


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
