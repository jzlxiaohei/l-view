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
    this.rootModel.AllowedChildrenTypes.push(WidgetTypes.Modal)
  }

  pushByType(type) {
    const widgetModel = widgetTable.createModel(type);
    this.push(widgetModel);
  }

  push(child) {
    this.rootModel.push(child);
  }

  getJSON() {
    return this.rootModel.getJSON();
  }
}

export default DesignModel;
