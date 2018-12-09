import Container from './container';
import Text from './text';
import Image from './image';
import _ from 'lodash';

const WidgetMeta = {
  Container,
  Text,
  Image,
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
    widgetModel.$Type = type;
    widgetModel.$Preview = widgetTable.getPreview(type);
    widgetModel.$Edit =  widgetTable.getEdit(type);
    return widgetModel;
  }
}
