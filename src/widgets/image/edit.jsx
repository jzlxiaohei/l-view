import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import PropEditor from 'comps/prop-editor';
import ImageModel from './Model';
import { FormInput } from 'comps/form-item';
import { Button } from 'antd';

@observer
class ImageEdit extends React.Component {
  static propTypes = {
    model: PropTypes.instanceOf(ImageModel),
  };

  handleAdjustRatio = (model) => {
    const width = model.style.width;
    model.autoHeight(width);
  }

  renderImageEditor(model) {
    return (
      <React.Fragment>
        <FormInput label="source" model={model} path="attr.src" />
        <Button onClick={() => this.handleAdjustRatio(model)}>调整比例(宽不变)</Button>
      </React.Fragment>
    )
  }

  render() {
    return (
      <div className="widget-edit-image">
        <PropEditor
          model={this.props.model}
          renderAfterBasicInfo={model => {
            return this.renderImageEditor(model);
          }}
        />
      </div>
    );
  }
}

export default ImageEdit;
