import { db } from "@/lib/db";
import { question } from "db/schema.mjs";
import { desc } from "drizzle-orm";
import QuestionTitleCard from "./questionTitleCard";
import { API_BASE_URL } from "@/lib/macro";
export default async function QuestionList({
  questions,
}: {
  questions: { title: string; id: string }[];
}): Promise<JSX.Element> {
  const questionList = questions.map((question) => (
    <QuestionTitleCard link={API_BASE_URL + "/article/" + question.id}>
      {question.title}
    </QuestionTitleCard>
  ));

  return <>{questionList}</>;
}
