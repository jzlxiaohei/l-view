import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import TextModel from './model';
import PropEditor from 'comps/prop-editor';
import DraftEditor from './comps/draft';
import './edit.less';


@observer
class TextEditor extends React.Component {

  static propTypes = {
    model: PropTypes.instanceOf(TextModel),
  };

  handleChange = editorState => {
    this.props.model.setEditorState(editorState);
  };

  render() {
    const model = this.props.model;
    return (
      <div className="widget-edit-text">
        <PropEditor model={model} />
        <DraftEditor
          onChange={this.handleChange}
          editorState={model.editorState}
        />
      </div>
    );
  }
}

export default TextEditor;
