import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import StyleEditor from 'comps/style-editor';
import ImageModel from './Model';

@observer
class ImageEdit extends React.Component {

  constructor(props) {
    super(props);
    window.$model = this.props.model;
  }

  static propTypes = {
    model: PropTypes.instanceOf(ImageModel),
  }

  render() {
    return (
      <div className="widget-edit-image">
        <StyleEditor style={this.props.model.style} />
      </div>
    )
  }
}

export default ImageEdit;
