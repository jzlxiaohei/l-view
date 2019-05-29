import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import PropEditor from 'comps/prop-editor';
import ChildrenEditor from 'comps/children-editor';
import { FormCheckbox } from 'comps/form-item';

import ModalModel from './model';

@observer
class ContainerEditor extends React.Component {

  static propTypes = {
    model: PropTypes.instanceOf(ModalModel),
  }

  renderModalEditor(model) {
    return (
      <React.Fragment>
        <FormCheckbox label="visible" model={model} path="attr.visible" />
      </React.Fragment>
    )
  }

  render() {
    const model = this.props.model;
    return (
      <div className="widget-edit-modal">
        <PropEditor
          model={model}
          renderAfterBasicInfo={() => this.renderModalEditor(model)}
        />
      </div>
    )
  }
}

export default ContainerEditor;
