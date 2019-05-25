import React from 'react';
import { observable, action } from 'mobx';
import BaseModel from '../BaseModel';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert'
import _ from 'lodash';
import { buildColorStr, parseColor } from './color-util';

class Text extends BaseModel {
  @observable
  editorState = null;

  constructor() {
    super();
    this.init();
  }

  init() {
    this.setEditorState(
      EditorState.createWithContent(ContentState.createFromText('text')),
    );
  }

  @action
  setEditorState(editorState) {
    this.editorState = editorState;

    const text = convertToHTML({
      styleToHTML: (style) => {
        const colorMeta = parseColor(style);
        if(colorMeta) {
          const { color } = colorMeta;
          return <span style={{color}}></span>
        }
      },
    })(editorState.getCurrentContent())

    this.assignAttr({
      text,
    });
  }
}

export default Text;
