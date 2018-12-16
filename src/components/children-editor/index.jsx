import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { widgetTable, WidgetTypes } from "@/widgets/widgetTable";
import './style.less';

@observer
class EditAddChildren extends React.Component {
  static propTypes = {
    model: PropTypes.object.isRequired,
    title: PropTypes.string,
  };

  static defaultProps = {
    title: '添加子组件'
  }

  handleAddChild = viewType => {
    const childModel = widgetTable.createModel(viewType);
    this.props.model.push(childModel);
  };

  render() {
    const { AllowedChildrenTypes } = this.props.model;
    if (!AllowedChildrenTypes) {
      throw new Error('AllowedChildrenTypes must be in model for add-children editor');
    }
    return (
      <Card
        className="comp-add-children"
        title={this.props.title}
      >
        {
          AllowedChildrenTypes.map(v => {
            return (
              <Card.Grid
                className="child-view-type-card"
                key={v}
                onClick={() => this.handleAddChild(v)}
              >
                <div>{v}</div>
              </Card.Grid>
            );
          })
        }
      </Card>
    );
  }
}

export default EditAddChildren;
