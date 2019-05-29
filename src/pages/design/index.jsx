import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import DesignModel from './DesignModel';
import { WidgetTypes, widgetTable } from '@/widgets/widgetTable';
import WidgetTreeView from './WidgetTreeView';
import { Button } from 'antd';
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
    window.$model = this.designModel; // just for debug now
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
  handlePreviewSelect(model, modelAutoExpanded = true) {
    if (this.selectedModel) {
      this.selectedModel.setSelected(false);
    }
    this.selectedModel = model;
    model.setSelected(true);
    if(modelAutoExpanded) {
      model.setExpanded(true);
    }
    let parent = model.$parent;
    while (parent) {
      parent.setExpanded(true);
      if(parent.onChildSelect) {
        parent.onChildSelect(model);
      }
      parent = parent.$parent;
    }
  }

  handleShowJSON = () => {
    console.log(this.designModel.getJSON())
  }

  render() {
    const root = this.designModel.rootModel;
    const selectedModel = this.selectedModel;
    return (
      <div className="page-design">
        <div className="design-action-bar">
          <Button type="primary" onClick={this.handleShowJSON}>Console JSON</Button>
        </div>
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
