import Container from './container';
import Text from './text';
import Image from './image';
import Carousel from './carousel';
import Button from './button';
import _ from 'lodash';
import { action } from 'mobx';

const WidgetMeta = {
  Container,
  Text,
  Image,
  Carousel,
  Button,
}

export const WidgetTypes = _.mapValues(
  WidgetMeta,
  (val, key) => key
)

function checkWidgetType(type) {
  if(!(type in WidgetTypes)) {
    throw new Error(`type ${type} is not register`);
  }
}

let idIndex = 0;

export const widgetTable = {
  getPreview(type) {
    checkWidgetType(type);
    return WidgetMeta[type].Preview;
  },

  getEdit(type) {
    checkWidgetType(type);
    return WidgetMeta[type].Edit;
  },

  createModel(type) {
    checkWidgetType(type);
    const widgetModel = new WidgetMeta[type].Model();
    widgetModel.id = `${type}_${idIndex++}`
    widgetModel.$type = type;
    widgetModel.$Preview = widgetTable.getPreview(type);
    widgetModel.$Edit =  widgetTable.getEdit(type);
    return widgetModel;
  },

  removeModel: action((model) => {
    if(model.$parent) {
      const children = model.$parent.children;
      const index = children.indexOf(model);
      if(index !== -1) {
        children.splice(index, 1);
      }
    }
  })
}
