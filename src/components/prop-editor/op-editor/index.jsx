import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { FormCheckbox } from 'comps/form-item';


@observer
class CompOperationEditor extends React.Component {
  static propTypes = {
    model: PropTypes.object,
  };


  render() {
    const model = this.props.model;

    return (
      <div className="op-editor">
        <FormCheckbox className="half" model={model} path="resizable" label="是否可缩放" />
        <FormCheckbox className="quarter" model={model} path="draggable" label="是否可拖拽" />
        {
          model.draggable ?
            <FormCheckbox
              className="quarter"
              model={model}
              path="isAbsolute"
              label="不保持原位置"
            /> : null
        }
      </div>
    );
  }
}

export default CompOperationEditor;
