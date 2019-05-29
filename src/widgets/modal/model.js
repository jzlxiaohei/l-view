import BaseModel from '../BaseModel';
import { WidgetTypes } from '../widgetTable';

class Modal extends BaseModel {
  AllowedChildrenTypes = [
    WidgetTypes.Text,
    WidgetTypes.Image,
    WidgetTypes.Button,
  ]

  constructor() {
    super();
    this.init();
  }

  idLock = true;

  init() {
    this.assignAttr({
      visible: true,
    })
  }

}

export default Modal;
