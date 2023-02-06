import React from "react";
import { render, screen } from "@testing-library/react";
import Editor from "./Editor";

describe("Editor", () => {
  it("Hello Editor", () => {
    render(<Editor />);
    const linkElement = screen.getByText(/Editor/i);
    expect(linkElement).toBeInTheDocument();
  });
});
