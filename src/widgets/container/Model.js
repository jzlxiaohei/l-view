import BaseModel from '../BaseModel';
import { observable, action } from 'mobx';
import _ from 'lodash';

class Container extends BaseModel {

  @observable children = [];

  @action
  push(child) {
    this.children.push(child);
  }

  @action
  remove(child) {
    _.remove(child);
  }
}

export default Container;
