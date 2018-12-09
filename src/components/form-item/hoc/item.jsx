import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { isObservable, action } from 'mobx';
import hoistNonReactStatic from 'hoist-non-react-statics';
import _ from 'lodash';
import { Form } from 'antd';

export default function hoc(OriginComponent) {
  @observer
  class FormItem extends React.Component {
    static propTypes = {
      model: PropTypes.object.isRequired,
      path: PropTypes.string.isRequired,
      label: PropTypes.string,
      onChange: PropTypes.func,
      getValue: PropTypes.func,
      itemProps: PropTypes.object
    };

    static defaultProps = {
      getValue: _.get
    };

    onChange = action((data) => {
      const { model, path, onChange } = this.props;
      if (onChange) {
        onChange({
          ...data,
          model,
          path
        });
      } else {
        if (!isObservable(model)) {
          throw new Error(
            'model is not Observable, onChange must be provide'
          );
        }
        const modelValue = this.transformToModel(data.value);
        _.set(model, path, modelValue);
      }
    });

    transformToModel(viewValue) {
      const _t = OriginComponent.transformToModel || _.identity;
      return _t(viewValue);
    }

    transformToView(modelValue) {
      const _t = OriginComponent.transformToView || _.identity;
      return _t(modelValue);
    }

    render() {
      const { model, path, itemProps } = this.props;
      const value = this.transformToView(this.props.getValue(model, path));
      const props = {
        ..._.omit(this.props, [
          'getValue', 'itemProps', 'label',
          'model', 'path','className']
        ),
        value,
        onChange: this.onChange,
      };
      return (
        <Form.Item
          {...itemProps}
          className={this.props.className}
          label={this.props.label}
        >
          <OriginComponent {...props} />
        </Form.Item>
      );
    }
  }
  hoistNonReactStatic(FormItem, OriginComponent)
  FormItem.$OriginComponent = OriginComponent
  return FormItem;
}
