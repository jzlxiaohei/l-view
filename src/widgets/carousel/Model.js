import BaseModel from '../BaseModel';
import { WidgetTypes } from '../widgetTable';

class Carousel extends BaseModel {
  AllowedChildrenTypes = [
    WidgetTypes.Text,
    WidgetTypes.Image,
  ]
}

export default Carousel;
