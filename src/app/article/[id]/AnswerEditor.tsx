"use client";
import { useRef } from "react";
import { LexicalEditor } from "lexical";
import { API_BASE_URL } from "@/lib/macro";
import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("../../_components/editor/lexical-palyground/src/App"),
  {
    ssr: false,
  }
);

export default function AnswerEditor({ id }: { id: string }): JSX.Element {
  const refEditorState = useRef<LexicalEditor | null>(null);
  return (
    <form
      method="post"
      action={async (formData) => {
        const editorState = refEditorState.current?.getEditorState();
        if (editorState) {
          formData.append("questionId", id);
          formData.append("editorState", JSON.stringify(editorState));
          const res = await fetch(API_BASE_URL + "/api/answer", {
            method: "POST",
            body: formData,
          });
          if (res.status === 200) {
            location.reload();
          } else {
            window.alert(await res.text());
            console.debug(res.status);
          }
        } else {
          window.alert("送信が失敗しました．");
        }
      }}
    >
      <label className={"text-2xl"}>あなたの回答</label>
      <Editor refEditorState={refEditorState} />
      <input
        type="submit"
        value="回答する"
        className="m-auto ml-5 my-3 bg-cyan-400 hover:bg-cyan-500 active:bg-cyan-600 text-center text-white"
      />
    </form>
  );
}
