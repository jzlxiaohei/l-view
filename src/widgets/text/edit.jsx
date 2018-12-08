import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import TextModel from './Model';
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
        <DraftEditor
          onChange={this.handleChange}
          editorState={model.editorState}
        />
        <PropEditor model={model} />
      </div>
    );
  }
}

export default TextEditor;
