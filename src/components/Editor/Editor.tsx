import { withReact, Slate, Editable } from "slate-react";
import { createEditor, Descendant } from "slate";
import { useCallback, useMemo } from "react";
import useEditorConfig from "../../hook/useEditorConfig";
import useSelection from "../../hook/useSelection";
import { Toolbar } from "../Toolbar";

export function Editor(props: {
  document: Descendant[];
  onChange?: React.Dispatch<React.SetStateAction<Descendant[]>>;
}) {
  const { document, onChange } = props;
  const editor = useMemo(() => withReact(createEditor()), []);
  const { renderElement, renderLeaf, onKeyDown } = useEditorConfig(editor);
  const [selection, setSelection] = useSelection(editor);

  const onChangeHandler = useCallback(
    (document: Descendant[]) => {
      console.log(document);
      onChange && onChange(document);
      /**
       * NOTE: As selection changes in the editor, SlateJS does call the onChange method,
       * even if the document contents haven’t changed.
       */
      editor.selection && setSelection(editor.selection);
    },
    [editor.selection, onChange, setSelection]
  );
  return (
    <Slate editor={editor} value={props.document} onChange={onChangeHandler}>
      <Toolbar selection={selection} />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={onKeyDown}
      />
    </Slate>
  );
}
