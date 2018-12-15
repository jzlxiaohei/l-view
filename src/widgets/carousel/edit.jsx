import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import PropEditor from 'comps/prop-editor';
import ChildrenEditor from 'comps/children-editor';

import ContainerModel from './Model';

@observer
class CarouselEdit extends React.Component {

  static propTypes = {
    model: PropTypes.instanceOf(ContainerModel),
  }

  render() {
    const model = this.props.model;
    return (
      <div className="widget-edit-container">
        <PropEditor
          model={model}
          renderAfterBasicInfo={model => <ChildrenEditor model={model} />}
        />
      </div>
    )
  }
}

export default CarouselEdit;
