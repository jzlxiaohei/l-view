import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import DesignModel from './DesignModel';
import { WidgetTypes } from "@/widgets/widgetTable";


import './style.less';

@observer
class DesignPage extends React.Component {

  constructor() {
    super();
    this.init();
  }

  init() {
    this.designModel = new DesignModel();
    this.designModel.pushByType(WidgetTypes.Image);
    this.designModel.pushByType(WidgetTypes.Text);
  }



  render() {
    const root = this.designModel.rootModel;
    return (
      <div className="page-design">
        <div className="design-container">
          <div className="preview-container">
            <div className="simulator">
              <root.$Preview model={root} />
            </div>
          </div>
          <div className="edit-container">
            <root.$Edit model={root} />
          </div>
        </div>
      </div>
    )
  }
}

export default DesignPage;
