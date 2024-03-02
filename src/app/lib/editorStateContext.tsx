import { LexicalEditor } from "lexical";
import { MutableRefObject, createContext } from "react";

export const EditorStateContext =
  createContext<MutableRefObject<LexicalEditor | null> | null>(null);
