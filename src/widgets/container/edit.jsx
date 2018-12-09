import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import PropEditor from 'comps/prop-editor';
import ContainerModel from './Model';

@observer
class ImageEdit extends React.Component {

  static propTypes = {
    model: PropTypes.instanceOf(ContainerModel),
  }

  render() {
    return (
      <div className="widget-edit-container">
        <PropEditor model={this.props.model} />
      </div>
    )
  }
}

export default ImageEdit;
