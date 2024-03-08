"use client";
import { SerializedEditorState } from "lexical";
import { SerializedLexicalNode } from "lexical";
import dynamic from "next/dynamic";
const PreviewAricle = dynamic(
  () =>
    import("../../_components/editor/lexical-palyground/src/PreviewOnlyApp"),
  { ssr: false }
);

export default function AnswerList({
  answerData,
}: {
  answerData:
    | {
        userName: string;
        content: unknown;
        answerId: string;
      }[]
    | string;
}): JSX.Element {
  if (typeof answerData === "string") {
    return <>{answerData}</>;
  } else {
    const answerList = answerData.map((data) => {
      const answerState: SerializedEditorState<SerializedLexicalNode> =
        data.content as SerializedEditorState<SerializedLexicalNode>;
      return (
        <div key={data.answerId} className={"border-b-2 border-gray-100"}>
          <PreviewAricle serializedEditorState={answerState} />
          ユーザー名：{data.userName}
        </div>
      );
    });
    return <>{answerList}</>;
  }
}
