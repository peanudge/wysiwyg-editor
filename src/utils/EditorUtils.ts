import { BaseEditor, Editor } from "slate";
import { ReactEditor } from "slate-react";

export function getActiveStyles(editor: BaseEditor) {
  return new Set(Object.keys(Editor.marks(editor) ?? {}));
}

export function toggleStyle(editor: BaseEditor, style: string) {
  const activeStyle = getActiveStyles(editor);
  if (activeStyle.has(style)) {
    Editor.removeMark(editor, style);
  } else {
    Editor.addMark(editor, style, true);
  }
}
