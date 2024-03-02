import Header from "@/_components/notLoginedHeader";
import { API_BASE_URL } from "@/lib/macro";
import LoginForm from "./loginForm";

export default async function LoginPage(): Promise<JSX.Element | void> {
  console.debug(API_BASE_URL);
  return (
    <main>
      <Header />
      <div className="flex h-screen justify-center items-center">
        <LoginForm />
      </div>
    </main>
  );
}
