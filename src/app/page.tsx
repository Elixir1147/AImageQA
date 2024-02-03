import NotLoginedHeader from "@/_components/notLoginedHeader";
import LoginedHeader from "./_components/loginedHeader";
import { validateRequest } from "./lib/auth/validateRequest";

export default async function TopPage(): Promise<JSX.Element> {
  const validateResult = await validateRequest();
  if (validateResult.user) {
    return (
      <main>
        <NotLoginedHeader />
      </main>
    );
  }
  return (
    <main>
      <LoginedHeader />
    </main>
  );
}
