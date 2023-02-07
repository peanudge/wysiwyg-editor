import { BaseEditor, BaseRange, Range, Editor, Transforms } from "slate";
import { BlockElementType } from "./const";

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

export function getTextBlockStyle(editor: BaseEditor) {
  const selection = editor.selection;
  if (selection == null) {
    return null;
  }
  // gives the forward-direction points in case the selection was
  // was backwards.
  const [start, end] = Range.edges(selection);

  //path[0] gives us the index of the top-level block.
  let startTopLevelBlockIndex = start.path[0];
  const endTopLevelBlockIndex = end.path[0];

  let blockType = null;
  while (startTopLevelBlockIndex <= endTopLevelBlockIndex) {
    const [node, _] = Editor.node(editor, [startTopLevelBlockIndex]);
    if ("type" in node) {
      if (blockType == null) {
        blockType = node.type;
      } else if (blockType !== node.type) {
        return "multiple";
      }
    }

    startTopLevelBlockIndex++;
  }

  return blockType;
}

export function toggleBlockType(
  editor: BaseEditor,
  blockType: BlockElementType
) {
  const currentBlockType = getTextBlockStyle(editor);
  const changeTo = currentBlockType === blockType ? "paragraph" : blockType;

  Transforms.setNodes(
    editor,
    { type: changeTo },
    {
      at: editor.selection as BaseRange,
      mode: "highest",
      match: (n: any) => {
        return Editor.isBlock(editor, n);
      },
    }
  );
}
