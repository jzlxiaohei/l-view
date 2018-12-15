import BaseModel from '../BaseModel';
import { WidgetTypes } from '../widgetTable';

class Container extends BaseModel {
  childrenTypes = [
    WidgetTypes.Text,
    WidgetTypes.Image,
  ]
}

export default Container;
