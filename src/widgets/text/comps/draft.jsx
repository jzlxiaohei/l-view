import React from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Tooltip } from 'antd';
import { SketchPicker } from 'react-color';
import BlockStyleControls from './_BlockStyleControls';
import InlineStyleControls from './_InlineStyleControls';
import { buildColorStr, parseColor } from '../color-util';

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}



class DraftTextEditor extends React.Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
  }

  constructor() {
    super();
    this.draftRef = React.createRef();
    this.state = {editorState: EditorState.createEmpty()};
  }

  onChange = (editorState) => {
    this.props.onChange(editorState);
  }

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }


  toggleBlockType = (blockType) => {
    this.onChange(
      RichUtils.toggleBlockType(
        this.props.editorState,
        blockType
      )
    );
  }

  toggleInlineStyle = (inlineStyle) => {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.props.editorState,
        inlineStyle
      )
    );
  }

  customStyleFn = (style, block) => {
    const styleTextList = style.toJS();
    let lastStyle = null
    styleTextList.forEach((text) => {
      const colorMeta = parseColor(text);
      if(colorMeta) {
        const { color } = colorMeta;
        lastStyle = {
          color,
        };
      }
    })
    if(lastStyle) {
      return lastStyle;
    }
  }

  focus = ()=> {
    this.draftRef.current.editor.focus()
  }

  handleColorChange = color => {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.props.editorState,
        buildColorStr(color.hex)
      )
    );
  }

  render() {
    const editorState = this.props.editorState;

    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <Tooltip
          title={
            <SketchPicker
              onChangeComplete={this.handleColorChange}
            />
          }
        >
          <span className="RichEditor-styleButton">
            color
          </span>
        </Tooltip>

        <div className={className} onClick={this.focus}>
          <Editor
            editorState={editorState}
            onChange={this.onChange}
            blockStyleFn={getBlockStyle}
            handleKeyCommand={this.handleKeyCommand}
            placeholder="Some text..."
            ref={this.draftRef}
            spellCheck={true}
            customStyleFn={this.customStyleFn}
          />
        </div>
      </div>
    );
  }
}

export default DraftTextEditor;
