import { widgetTable, WidgetTypes } from "@/widgets/widgetTable";
import { action } from "mobx";


class DesignModel {

  constructor() {
    this.init();
  }

  @action
  init() {
    const type = WidgetTypes.Container
    this.rootModel = widgetTable.createModel(type);
    this.rootModel.setDraggable(false);
    this.rootModel.setResizable(false);
    this.rootModel.assignAttr({
      id: 'root-widget',
    })
  }

  pushByType(type) {
    const widgetModel = widgetTable.createModel(type);
    this.push(widgetModel);
    return widgetModel;
  }

  push(child) {
    this.rootModel.push(child);
  }

}

export default DesignModel;
