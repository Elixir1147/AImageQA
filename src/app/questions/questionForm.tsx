"use client";
import { LexicalEditor } from "lexical";
import { useRef } from "react";
import { FRONT_API_BASE_URL } from "@/lib/macro";
import dynamic from "next/dynamic";

const PlaygroundEditor = dynamic(
  () => import("../_components/editor/lexical-palyground/src/App"),
  {
    ssr: false,
  }
);

export default function QuestionForm(): JSX.Element {
  const refEditorState = useRef<LexicalEditor | null>(null);
  return (
    <form
      method="post"
      action={async (formData) => {
        const editorState = refEditorState.current?.getEditorState();
        if (editorState) {
          formData.append("editorState", JSON.stringify(editorState));
          const res = await fetch(FRONT_API_BASE_URL + "/api/question", {
            method: "POST",
            body: formData,
          });
          if (res.status === 200) {
            location.assign(FRONT_API_BASE_URL + "/");
          } else {
            window.alert(await res.text());
            console.debug(res.status);
          }
        } else {
          window.alert("送信が失敗しました．");
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
          <PlaygroundEditor refEditorState={refEditorState} />
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
