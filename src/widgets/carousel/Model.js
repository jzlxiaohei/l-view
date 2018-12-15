import BaseModel from '../BaseModel';
import { WidgetTypes } from '../widgetTable';

class Carousel extends BaseModel {
  childrenTypes = [
    WidgetTypes.Text,
    WidgetTypes.Image,
  ]
}

export default Carousel;
