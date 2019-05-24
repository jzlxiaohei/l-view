import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import PropEditor from 'comps/prop-editor';
import ButtonModel from './model';


@observer
class ButtonEdit extends React.Component {
  static propTypes = {
    model: PropTypes.instanceOf(ButtonModel),
  };

  render() {
    return (
      <div className="widget-edit-image">
        <PropEditor
          model={this.props.model}
        />
      </div>
    );
  }
}

export default ButtonEdit;
