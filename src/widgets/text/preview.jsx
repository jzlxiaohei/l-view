import React from 'react';
import PropTypes from 'prop-types';
import preview from '@/hoc/preview';
import _ from 'lodash';
import './preview.less';

@preview
class Text extends React.Component {

  static propTypes = {
    style: PropTypes.object.isRequired,
    attr: PropTypes.object.isRequired,
  }

  render() {
    const { style, attr } = this.props;
    const otherAttr = _.omit(attr, ['text']);

    return (
      <div
        style={style}
        dangerouslySetInnerHTML={{
          __html: this.props.attr.text,
        }}
      />
    )
  }
}

export default Text;
