import Header from "./_components/Header";
import QuestionList from "./_components/questionList";
import { db } from "@/lib/db";
import { question } from "db/schema.mjs";
import { desc } from "drizzle-orm";
import { API_BASE_URL } from "./lib/macro";

export default async function TopPage(): Promise<JSX.Element> {
  const questions: { title: string; id: string }[] | string = await fetch(
    API_BASE_URL + "/api/question/desc",
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
}
