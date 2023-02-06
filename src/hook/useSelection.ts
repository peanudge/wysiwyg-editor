import { useCallback, useState } from "react";
import { BaseEditor, BaseRange } from "slate";
import { ReactEditor } from "slate-react";
import areEqual from "deep-equal";

export default function useSelection(
  editor: BaseEditor & ReactEditor
): [BaseRange | null, (selection: BaseRange) => void] {
  const [selection, setSelection] = useState(editor.selection);
  const setSelectionOptimized = useCallback(
    (newSelection: BaseRange) => {
      if (areEqual(selection, newSelection)) {
        return;
      }
      setSelection(newSelection);
    },
    [setSelection, selection]
  );
  return [selection, setSelectionOptimized];
}
