import { API_BASE_URL } from "@/lib/macro";
import { notFound } from "next/navigation";
import { SerializedEditorState, SerializedLexicalNode } from "lexical";
import dynamic from "next/dynamic";
import Header from "@/_components/Header";
import AnswerList from "./answerList";

const PreviewAricle = dynamic(
  () =>
    import("../../_components/editor/lexical-palyground/src/PreviewOnlyApp"),
  {
    ssr: false,
  }
);

import AnswerEditor from "./AnswerEditor";

export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}): Promise<JSX.Element> {
  const NOT_FOUND = "the question of the id is not found.";
  const articleData:
    | {
        title: string;
        userName: string;
        content: unknown;
        viewNumber: number;
      }
    | string = await fetch(API_BASE_URL + "/api/question/" + params.id, {
    cache: "no-cache",
  })
    .then((res) => {
      switch (res.status) {
        case 200:
          return res.json();
        case 404:
          return NOT_FOUND;
        case 500:
          return "コンテンツが読み込めませんでした．";
        default:
          return "予期せぬエラーが発生しました．";
      }
    })
    .catch((e) => {
      console.error(e);
      return "error is occured.";
    });

  const answerData:
    | {
        userName: string;
        content: unknown;
        answerId: string;
      }[]
    | string = await fetch(
    API_BASE_URL +
      "/api/answer/?" +
      new URLSearchParams({ order: "desc", questionId: params.id }),
    { cache: "no-cache" }
  )
    .then((res) => {
      switch (res.status) {
        case 200:
          return res.json();
        case 400:
          return "クエリが不足しています．";
        case 500:
          return "コンテンツが読み込めませんでした．";
        default:
          return "予期せぬエラーが発生しました．";
      }
    })
    .catch((e) => {
      console.error(e);
      return "error is occured.";
    });
  console.log(answerData);
  console.log(
    API_BASE_URL +
      "/api/answer/?" +
      new URLSearchParams({ order: "desc", questionId: params.id })
  );

  if (articleData === NOT_FOUND) {
    notFound();
  } else if (typeof articleData === "string") {
    return <>{articleData}</>;
  } else {
    const articleState: SerializedEditorState<SerializedLexicalNode> =
      articleData.content as SerializedEditorState<SerializedLexicalNode>;
    return (
      <main>
        <Header />
        <div className={"grid grid-cols-6"}>
          <div className={"col-start-2 col-end-6  bg-white py-5"}>
            <h1>{articleData.title}</h1>
            <PreviewAricle serializedEditorState={articleState} />
            ユーザー名：{articleData.userName}
            <div className={"border-t-2 border-gray-100"}>
              <AnswerList answerData={answerData} />
            </div>
            <div className={"my-10"}>
              <AnswerEditor id={params.id} />
            </div>
          </div>
        </div>
      </main>
    );
  }
}
