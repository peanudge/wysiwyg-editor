import React, { useCallback } from "react";
import { Button, ButtonProps, Dropdown, DropdownButton } from "react-bootstrap";
import { useEditor, useSlateStatic } from "slate-react";
import { BlockElementType } from "../../utils/const";
import {
  getActiveStyles,
  getTextBlockStyle,
  toggleBlockType,
  toggleStyle,
} from "../../utils/EditorUtils";
import "./Toolbar.css";

const PARAGRAPH_STYLES = ["h1", "h2", "h3", "h4", "paragraph", "multiple"];
const CHARACTER_STYLES = ["bold", "italic", "underline", "code"];

export function Toolbar({ selection, previousSelection }: any) {
  const editor = useSlateStatic();

  const onBlockTypeChange = useCallback((targetType: string | null) => {
    if (targetType === null || !PARAGRAPH_STYLES.includes(targetType)) {
      return;
    }
    if (targetType === "multiple") {
      return;
    }
    toggleBlockType(editor, targetType as BlockElementType);
  }, []);

  const blockType = getTextBlockStyle(editor);

  return (
    <div className="toolbar">
      <DropdownButton
        className="block-style-dropdown"
        disabled={blockType == null}
        id="block-style"
        onSelect={onBlockTypeChange}
        title={blockType ?? "paragraph"}
      >
        {PARAGRAPH_STYLES.map((blockType) => (
          <Dropdown.Item eventKey={blockType} key={blockType}>
            {blockType}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      {CHARACTER_STYLES.map((style) => (
        <ToolBarButton
          key={style}
          icon={<p>{style}</p>}
          isActive={getActiveStyles(editor).has(style)}
          onMouseDown={(event) => {
            event.preventDefault();
            toggleStyle(editor, style);
          }}
        />
      ))}
    </div>
  );
}

function ToolBarButton(
  props: ButtonProps & { icon: React.ReactNode; isActive: boolean }
) {
  const { icon, isActive, ...otherProps } = props;
  return (
    <Button
      variant="outline-primary"
      className="toolbar-btn"
      active={isActive}
      {...otherProps}
    >
      {icon}
    </Button>
  );
}
