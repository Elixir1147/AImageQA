import LoginedHeader from "@/_components/loginedHeader";
import QuestionForm from "./questionForm";

export default function QuestionPage(): JSX.Element {
  return (
    <main>
      <LoginedHeader />
      <QuestionForm />
    </main>
  );
}
