import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { ImageEdit, ImageModel, ImagePreview } from '@/widgets/image'
import { TextEdit, TextModel, TextPreview } from '@/widgets/text'


import './style.less';

@observer
class DesignPage extends React.Component {

  constructor() {
    super();
    this.imageModel = new ImageModel();
    this.textModel = new TextModel();
  }

  render() {
    return (
      <div className="page-design">
        <div className="design-container">
          <div className="preview-container">
            <div className="simulator">
              <ImagePreview model={this.imageModel} />
              <TextPreview model={this.textModel} />
            </div>
          </div>
          <div className="edit-container">
            {/* <ImageEdit model={this.imageModel} /> */}
            <TextEdit model={this.textModel} />
          </div>
        </div>
      </div>
    )
  }
}

export default DesignPage;
