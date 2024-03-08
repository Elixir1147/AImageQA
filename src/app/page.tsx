import Header from "./_components/Header";
import QuestionList from "./_components/questionList";
import { SERVER_API_BASE_URL } from "./lib/macro";

export default async function TopPage(): Promise<JSX.Element> {
  try {
    const questions: { title: string; id: string }[] | string = await fetch(
      SERVER_API_BASE_URL +
        "/api/question/?" +
        new URLSearchParams({ order: "desc" }).toString(),
      {
        cache: "no-store",
      }
    ).then((res) => {
      switch (res.status) {
        case 200:
          return res.json();
        case 500:
          return "コンテンツが読み込めませんでした．";
        default:
          return "予期せぬエラーが発生しました．";
      }
    });
    return (
      <main>
        <Header />
        <div className={"grid grid-cols-6"}>
          <div className={"col-start-2 col-end-6"}>
            {typeof questions === "string" ? (
              questions
            ) : (
              <QuestionList questions={questions} />
            )}
          </div>
        </div>
      </main>
    );
  } catch (e) {
    if (
      e instanceof Error &&
      e.name === "TypeError" &&
      e.message === "fetch failed"
    ) {
      console.debug("ビルド時にフェッチが行えないためエラーが出ます．");
      return <></>;
    } else {
      console.debug(e);
      return <>予期せぬエラーが発生しました．</>;
    }
  }
}
