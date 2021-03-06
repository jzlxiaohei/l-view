import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { FormInput } from 'comps/form-item';
import configItems from './configItems';


@observer
class CompStyleEditor extends React.Component {
  static propTypes = {
    model: PropTypes.object.isRequired,
  };

  renderItem(item) {
    const FormComp = item.Comp || FormInput;
    return (
      <FormComp
        {...item.props}
        key={item.path}
        model={this.props.model}
        path={item.path}
        label={item.label}
        className={item.className}
        placeholder={item.placeholder || item.label}
      />
    );
  }

  render() {
    return (
      <div className="style-editor">
        {configItems.map(item => {
          return this.renderItem(item);
        })}
      </div>
    );
  }
}

export default CompStyleEditor;
