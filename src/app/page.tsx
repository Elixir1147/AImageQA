import NotLoginedHeader from "@/_components/notLoginedHeader";
import LoginedHeader from "./_components/loginedHeader";
import { validateRequest } from "./lib/auth/validateRequest";
import PlaygroundEditor from "./_components/editor/playgroundEditor";
import TestEditor from "./_components/TestEditor";

export default async function TopPage(): Promise<JSX.Element> {
  const validateResult = await validateRequest();
  if (!validateResult.user) {
    return (
      <main>
        <NotLoginedHeader />
        <TestEditor />
      </main>
    );
  }
  return (
    <main>
      <LoginedHeader />
    </main>
  );
}
