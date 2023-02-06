import { withReact, Slate, Editable, DefaultElement } from "slate-react";
import { createEditor, Descendant } from "slate";
import { useMemo } from "react";

export function Editor(props: {
  document: Descendant[];
  onChange?: React.Dispatch<React.SetStateAction<Descendant[]>>;
}) {
  const editor = useMemo(() => withReact(createEditor()), []);
  return (
    <Slate editor={editor} value={props.document}>
      <Editable />
    </Slate>
  );
}
