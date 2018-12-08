import React from 'react';
import PropTypes from 'prop-types';
import OpEditor from './op-editor';
import StyleEditor from './style-editor';
import { observer } from 'mobx-react';
import WidgetBaseModel from '@/widgets/BaseModel';
import './style.less';

@observer
class PropEditor extends React.Component {

  static propTypes = {
    model: PropTypes.instanceOf(WidgetBaseModel),
  }

  render() {
    const model = this.props.model;
    return (
      <div className="comp-prop-editor">
        <OpEditor model={model} />
        <StyleEditor model={model.style}/>
      </div>
    )
  }
}

export default PropEditor;
