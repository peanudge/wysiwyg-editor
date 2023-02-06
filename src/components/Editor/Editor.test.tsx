import { render, screen } from "@testing-library/react";
import { Editor } from "./Editor";
import ExampleDocument from "../../utils/ExampleDocument";

describe("Editor", () => {
  it("Hello Editor", () => {
    render(<Editor document={ExampleDocument} />);
    const linkElement = screen.getByText(/Editor/i);
    expect(linkElement).toBeInTheDocument();
  });
});
