/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
"use client";
// import { $createLinkNode } from "@lexical/link";
// import { $createListItemNode, $createListNode } from "@lexical/list";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
// import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
// import { $createParagraphNode, $createTextNode, $getRoot } from "lexical";
import * as React from "react";

// import { isDevPlayground } from "./appSettings";
import { SettingsContext, useSettings } from "./context/SettingsContext";
import { SharedAutocompleteContext } from "./context/SharedAutocompleteContext";
import { SharedHistoryContext } from "./context/SharedHistoryContext";
import Editor from "./PreviewOnly";
// import logo from './images/logo.svg';
import PlaygroundNodes from "./nodes/PlaygroundNodes";
// import DocsPlugin from './plugins/DocsPlugin';
// import PasteLogPlugin from './plugins/PasteLogPlugin';
import { TableContext } from "./plugins/TablePlugin";
// import TestRecorderPlugin from './plugins/TestRecorderPlugin';
// import TypingPerfPlugin from './plugins/TypingPerfPlugin';
// import Settings from './Settings';
import PlaygroundEditorTheme from "./themes/PlaygroundEditorTheme";
import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";
import { LexicalEditor } from "lexical";
import { MutableRefObject } from "react";
import { SerializedEditorState } from "lexical";
import { SerializedLexicalNode } from "lexical";

// console.warn(
//   "If you are profiling the playground app, please ensure you turn off the debug view. You can disable it by pressing on the settings control in the bottom-left of your screen and toggling the debug view setting."
// );

function App({
  serializedEditorState,
}: {
  serializedEditorState: SerializedEditorState<SerializedLexicalNode>;
}): JSX.Element {
  // const {
  //   settings: { isCollab, emptyEditor, measureTypingPerf },
  // } = useSettings();
  const initialConfig = {
    editorState: JSON.stringify(serializedEditorState),
    namespace: "Playground",
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
    editable: false,
  };
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <TableContext>
          <SharedAutocompleteContext>
            <div className="editor-shell">
              <Editor />
            </div>
          </SharedAutocompleteContext>
        </TableContext>
      </SharedHistoryContext>
    </LexicalComposer>
  );
}

export default function PreviewAricle({
  serializedEditorState,
}: {
  serializedEditorState: SerializedEditorState<SerializedLexicalNode>;
}): JSX.Element {
  return (
    <SettingsContext>
      <App serializedEditorState={serializedEditorState} />
    </SettingsContext>
  );
}
