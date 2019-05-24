import BaseModel from '../BaseModel';
import { WidgetTypes } from '../widgetTable';
import _ from 'lodash';
import { action, observable } from 'mobx';

class Carousel extends BaseModel {

  @observable
  selectedIndex = 0;

  AllowedChildrenTypes = [
    WidgetTypes.Text,
    WidgetTypes.Image,
  ]

  onChildSelect(child) {
    const index = _.findIndex(this.children, child);
    this.setSelectedIndex(index);
  }

  @action
  setSelectedIndex(index) {
    this.selectedIndex = index;
  }
}

export default Carousel;
