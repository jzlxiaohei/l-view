import BaseModel from '../BaseModel';
import { WidgetTypes } from '../widgetTable';

class Container extends BaseModel {
  AllowedChildrenTypes = [
    WidgetTypes.Text,
    WidgetTypes.Image,
    WidgetTypes.Button,
    WidgetTypes.Carousel
  ]
}

export default Container;
