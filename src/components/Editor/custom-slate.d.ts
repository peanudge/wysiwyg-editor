import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

type ParagraphElement = { type: "paragraph"; children: CustomText[] };
type Heading1Element = { type: "h1"; children: CustomText[] };
type Heading2Element = { type: "h2"; children: CustomText[] };
type Heading3Element = { type: "h3"; children: CustomText[] };
type Heading4Element = { type: "h4"; children: CustomText[] };

type CustomElement =
  | ParagraphElement
  | Heading1Element
  | Heading2Element
  | Heading3Element
  | Heading4Element;

type CustomText = {
  text: string;
  bold?: boolean;
  code?: boolean;
  italic?: boolean;
  underline?: boolean;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
