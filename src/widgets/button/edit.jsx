import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import PropEditor from 'comps/prop-editor';
import ButtonModel from './model';
import { FormInput } from 'comps/form-item';


@observer
class ButtonEdit extends React.Component {
  static propTypes = {
    model: PropTypes.instanceOf(ButtonModel),
  };

  renderButtonEditor(model) {
    return (
      <React.Fragment>
        <FormInput label="text" model={model} path="attr.text" />
      </React.Fragment>
    )
  }


  render() {
    return (
      <div className="widget-edit-button">
        <PropEditor
          model={this.props.model}
          renderAfterBasicInfo={model => {
            return this.renderButtonEditor(model);
          }}
        />
      </div>
    );
  }
}

export default ButtonEdit;
