import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import "./Toolbar.css";

const PARAGRAPH_STYLES = ["h1", "h2", "h3", "h4", "paragraph", "multiple"];
const CHARACTER_STYLES = ["bold", "italic", "underline", "code"];

export function Toolbar({ selection, previousSelection }: any) {
  return (
    <div className="toolbar">
      <DropdownButton
        className="block-style-dropdown"
        disabled={false}
        id="block-style"
        title={"paragraph"}
      >
        {PARAGRAPH_STYLES.map((blockType) => (
          <Dropdown.Item eventKey={blockType} key={blockType}>
            {blockType}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      {CHARACTER_STYLES.map((style) => (
        <ToolBarButton key={style} icon={<p>{style}</p>} isActive={false} />
      ))}
    </div>
  );
}

function ToolBarButton(props: any) {
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
