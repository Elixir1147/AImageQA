import QuestionTitleCard from "./questionTitleCard";
import { FRONT_API_BASE_URL } from "@/lib/macro";
export default async function QuestionList({
  questions,
}: {
  questions: { title: string; id: string }[];
}): Promise<JSX.Element> {
  const questionList = questions.map((question) => (
    <QuestionTitleCard
      key={question.id}
      link={FRONT_API_BASE_URL + "/article/" + question.id}
    >
      {question.title}
    </QuestionTitleCard>
  ));

  return <>{questionList}</>;
}
