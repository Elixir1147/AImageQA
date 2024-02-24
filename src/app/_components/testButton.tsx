"use client";
import { LexicalEditor } from "lexical";
import { MutableRefObject } from "react";
export default function TestButton({
  editorState,
}: {
  editorState: MutableRefObject<LexicalEditor | null>;
}): JSX.Element {
  function onClick() {
    if (editorState.current !== null) {
      console.debug(JSON.stringify(editorState.current?.getEditorState()));
    } else {
      console.debug("editorState is null");
    }
  }
  return <button onClick={() => onClick()}>button</button>;
}
