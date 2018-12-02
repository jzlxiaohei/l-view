import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { FormInput, FormColor, FormTransform } from 'comps/form-item';
import './style.less';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const configItems = [
  { path: 'left', label: 'x坐标' },
  { path: 'top', label: 'y坐标' },
  { path: 'width', label: '宽度' },
  { path: 'height', label: '高度' },
  { path: 'color', label: '字体颜色', Comp: FormColor },
  { path: 'backgroundColor', label: '背景颜色', Comp: FormColor },
  {
    path: 'transform',
    label: '旋转角度',
    Comp: FormTransform,
  },
];

@observer
class CompStyleEditor extends React.Component {
  static propTypes = {
    style: PropTypes.object.isRequired,
  };

  renderItem(item) {
    const FormComp = item.Comp || FormInput;
    return (
      <FormComp
        key={item.path}
        itemProps={formItemLayout}
        model={this.props.style}
        path={item.path}
        label={item.label}
        placeholder={item.placeholder || item.label}
      />
    );
  }

  render() {
    return (
      <div className="comps-style-editor">
        {configItems.map(item => {
          return this.renderItem(item);
        })}
      </div>
    );
  }
}

export default CompStyleEditor;
