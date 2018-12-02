import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import StyleEditor from 'comps/style-editor';
import { observable } from 'mobx';
import ImageEditor from '@/widgets/image/edit'
import ImageModel from '@/widgets/image/Model';
import ImagePreview from '@/widgets/image/preview';
import './style.less';

@observer
class DesignPage extends React.Component {

  constructor() {
    super();
    this.imageModel = new ImageModel();
  }

  render() {
    return (
      <div className="page-design">
        <div className="design-container">
          <div className="preview-container">
            <div className="simulator">
              <ImagePreview model={this.imageModel} />
            </div>
          </div>
          <div className="edit-container">
            <ImageEditor model={this.imageModel} />
          </div>
        </div>
      </div>
    )
  }
}

export default DesignPage;
