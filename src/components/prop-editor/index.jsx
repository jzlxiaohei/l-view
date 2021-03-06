import React from 'react';
import PropTypes from 'prop-types';
import { FormInput } from 'comps/form-item';
import OpEditor from './op-editor';
import StyleEditor from './style-editor';
import { observer } from 'mobx-react';
import WidgetBaseModel from '@/widgets/BaseModel';
import { Tag, Divider } from 'antd';
import './style.less';

@observer
class PropEditor extends React.Component {

  static propTypes = {
    model: PropTypes.instanceOf(WidgetBaseModel),
    renderAfterBasicInfo: PropTypes.func,
  }

  render() {
    const model = this.props.model;
    return (
      <div className="comp-prop-editor">
        <Tag color="blue">{model.$type}</Tag>
        <FormInput model={model} path="attr.id" label="ID" disabled={model.idLock}/>
        <Divider />
        {
          this.props.renderAfterBasicInfo && (
            <React.Fragment>
              {this.props.renderAfterBasicInfo(model)}
              <Divider />
            </React.Fragment>
          )
        }
        <OpEditor model={model} />
        <StyleEditor model={model.style}/>
      </div>
    )
  }
}

export default PropEditor;
