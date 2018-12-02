import { observable, action } from 'mobx';
import BaseModel from  '../BaseModel';
import { EditorState, ContentState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';



class Text extends BaseModel{

  @observable
  editorState = null

  constructor() {
    super();
    this.init();
  }

  init() {
    this.setEditorState(
      EditorState.createWithContent(ContentState.createFromText('text'))
    );
  }

  @action
  setEditorState(editorState) {
    this.editorState = editorState;
    this.assignAttr({
      text: stateToHTML(this.editorState.getCurrentContent())
    })
  }




  // TODO toJSON: attr.text

}

export default Text;
