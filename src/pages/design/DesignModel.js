import { widgetTable, WidgetTypes } from "@/widgets/widgetTable";


class DesignModel {

  constructor() {
    this.init();
  }

  init() {
    const type = WidgetTypes.Container
    this.rootModel = widgetTable.createModel(type);
    this.rootModel.setDraggable(false);
    this.rootModel.setResizable(false);
  }

  pushByType(type) {
    const widgetModel = widgetTable.createModel(type);
    this.push(widgetModel);
  }

  push(child) {
    this.rootModel.push(child);
  }

}

export default DesignModel;
