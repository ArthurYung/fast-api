import React from "react";
import codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/selection/active-line.js";

export default class Editor extends React.Component<{ value?: string }> {
  editorId: string;
  Editor: codemirror.EditorFromTextArea | null;
  Doc: codemirror.Doc | null;
  showHintTimeout: any;
  constructor(props: { value?: string }) {
    super(props);
    this.editorId = Date.now() + "";
    this.Editor = null;
    this.Doc = null;
  }
  componentDidMount() {
    const textarea = document.getElementById(this.editorId);
    this.Editor = codemirror.fromTextArea(textarea as HTMLTextAreaElement, {
      lineNumbers: true,
      styleActiveLine: true,
      matchBrackets: true,
      mode: "text/javascript",
      indentWithTabs: true,
      lineWrapping: true,
      theme: "dracula",
    });
    this.Doc = this.Editor.getDoc();
    this._bindEditorEvent();
    this._initEditorValue();
  }
  private _initEditorValue() {
    if (this.props.value) {
      (this.Doc as codemirror.Doc).setValue(this.props.value);
    }
  }
  private _bindEditorEvent() {
    (this.Editor as codemirror.EditorFromTextArea).on(
      "change",
      (editor: CodeMirror.Editor, change) => {
        //获取用户当前的编辑器中的编写的代码
        if (change.origin === "+input") {
          clearTimeout(this.showHintTimeout);
          const [text] = change.text;

          if (!checkChange(text)) {
            return;
          }
          this.showHintTimeout = setTimeout(function() {
            editor.execCommand("autocomplete");
          }, 300);
        }
      }
    );
  }
  public getEditorValue(): string {
    if (!this.Doc) return "";
    return this.Doc.getValue();
  }
  render() {
    return (
      <div className="editor-content">
        <textarea id={this.editorId} name="code" style={{ border: "none" }} />
      </div>
    );
  }
}

function checkChange(text: string | undefined) {
  if (!text) return false;
  if (text === "") return false;
  if (text === " ") return false;
  if (text === "=") return false;
  if (text === "= ") return false;
  return true;
}
