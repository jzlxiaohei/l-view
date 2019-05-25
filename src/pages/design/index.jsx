import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import DesignModel from './DesignModel';
import { WidgetTypes, widgetTable } from '@/widgets/widgetTable';
import WidgetTreeView from './WidgetTreeView';

import './style.less';
import { action, observable } from 'mobx';

@observer
class DesignPage extends React.Component {
  @observable
  selectedModel = null;

  constructor() {
    super();
    this.init();
  }

  @action
  init() {
    this.designModel = new DesignModel();
    window.$model = this.designModel;
    this.designModel.pushByType(WidgetTypes.Image);
    this.designModel.pushByType(WidgetTypes.Text);
    this.designModel.pushByType(WidgetTypes.Button);

    const carouselModel = widgetTable.createModel(WidgetTypes.Carousel);
    carouselModel.push([
      widgetTable.createModel(WidgetTypes.Image),
      widgetTable.createModel(WidgetTypes.Text),
      widgetTable.createModel(WidgetTypes.Image),
    ]);

    this.designModel.push(carouselModel);

    this.selectedModel = this.designModel.rootModel;
  }

  @action.bound
  handlePreviewSelect(model) {
    if (this.selectedModel) {
      this.selectedModel.setSelected(false);
      model.setExpanded(false);
    }
    this.selectedModel = model;
    model.setSelected(true);
    model.setExpanded(true);
    let parent = model.$parent;
    while (parent) {
      parent.setExpanded(true);
      if(parent.onChildSelect) {
        parent.onChildSelect(model);
      }
      parent = parent.$parent;
    }
  }

  render() {
    const root = this.designModel.rootModel;
    const selectedModel = this.selectedModel;
    return (
      <div className="page-design">
        <div id="design-root">
          <div className="tree-view-area">
            <WidgetTreeView
              selectedModel={selectedModel}
              model={root}
              onSelect={this.handlePreviewSelect}
            />
          </div>
          <div className="preview-area">
            <div className="simulator">
              <root.$Preview model={root} onSelect={this.handlePreviewSelect} />
            </div>
          </div>
          <div className="edit-area">
            <selectedModel.$Edit model={selectedModel} />
          </div>
        </div>
      </div>
    );
  }
}

export default DesignPage;
