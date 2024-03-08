import Header from "@/_components/notLoginedHeader";
import LoginForm from "./loginForm";

export default async function LoginPage(): Promise<JSX.Element | void> {
  return (
    <main>
      <Header />
      <div className="flex h-screen justify-center items-center">
        <LoginForm />
      </div>
    </main>
  );
}
