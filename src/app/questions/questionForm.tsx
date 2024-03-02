"use client";
import { LexicalEditor } from "lexical";
import PlaygroundEditor from "@/_components/editor/playgroundEditor";
import { useRef } from "react";
import { EditorStateContext } from "../lib/editorStateContext";
import { API_BASE_URL } from "@/lib/macro";

export default function QuestionForm(): JSX.Element {
  const refEditorState = useRef<LexicalEditor | null>(null);
  return (
    <form
      method="post"
      action={async (formData) => {
        const editorJSON = refEditorState.current?.getEditorState().toJSON();
        formData.append("editorState", JSON.stringify(editorJSON));
        const res = await fetch(API_BASE_URL + "/api/question", {
          method: "POST",
          body: formData,
        });
        if (res.status === 200) {
          location.assign(API_BASE_URL + "/");
        } else {
          window.alert(await res.text());
          console.debug(res.status);
        }
      }}
    >
      <div className={"grid grid-cols-6"}>
        <div className={"col-start-2 col-span-1"}>
          <label htmlFor="title">タイトル</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div className={"col-start-2 col-span-1"}>
          <label htmlFor="tags">タグ</label>
          <input type="text" id="tags" name="tags" />
        </div>
        <div className={"col-start-2 col-span-1"}>
          <label htmlFor="restricted">年齢制限</label>
          <input type="checkbox" id="restricted" name="ristricted" />
        </div>
        <div className={"col-start-2 col-end-6"}>
          <label>質問内容</label>
          <EditorStateContext.Provider value={refEditorState}>
            <PlaygroundEditor />
          </EditorStateContext.Provider>
          <input
            type="submit"
            value="質問する"
            className="m-auto ml-5 my-3 bg-cyan-400 hover:bg-cyan-500 active:bg-cyan-600 text-center text-white"
          />
        </div>
      </div>
    </form>
  );
}
