import ExampleDocument from "../utils/ExampleDocument";

type Document = typeof ExampleDocument;

export default function Editor(props: {
  document?: Document;
  onChange?: React.Dispatch<React.SetStateAction<Document>>;
}) {
  return <div>Editor</div>;
}
