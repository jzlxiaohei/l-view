import BaseModel from '../BaseModel';

export default class ButtonModel extends BaseModel {

  constructor() {
    super();
    this.init();
  }

  init() {
    this.assignAttr({
      text: 'button',
    });
  }

}
