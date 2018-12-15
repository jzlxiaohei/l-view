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
        <FormCheckbox className="half" model={model} path="draggable" label="是否可拓展" />
        <FormCheckbox className="half" model={model} path="resizable" label="是否可缩放" />
      </div>
    );
  }
}

export default CompOperationEditor;
