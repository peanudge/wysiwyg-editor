import { withReact, Slate, Editable, DefaultElement } from "slate-react";
import { createEditor, Descendant } from "slate";
import { useMemo } from "react";
import useEditorConfig from "../../hook/useEditorConfig";

export function Editor(props: {
  document: Descendant[];
  onChange?: React.Dispatch<React.SetStateAction<Descendant[]>>;
}) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const { renderElement, renderLeaf } = useEditorConfig(editor);
  return (
    <Slate editor={editor} value={props.document}>
      <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
    </Slate>
  );
}
