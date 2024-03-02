"use client";
import { LexicalEditor } from "lexical";
import PlaygroundEditor from "./editor/playgroundEditor";
import { useRef } from "react";
import { EditorStateContext } from "../lib/editorStateContext";
import TestButton from "./testButton";

export default function TestEditor(): JSX.Element {
  const refEditorState = useRef<LexicalEditor | null>(null);
  return (
    <>
      <EditorStateContext.Provider value={refEditorState}>
        <PlaygroundEditor />
      </EditorStateContext.Provider>
      <TestButton editorState={refEditorState} />
    </>
  );
}
