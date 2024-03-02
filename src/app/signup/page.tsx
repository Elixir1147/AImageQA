import Header from "@/_components/notLoginedHeader";
import { API_BASE_URL } from "@/lib/macro";
import SignupForm from "./singupForm";

export default async function SignUpPage(): Promise<JSX.Element | void> {
  return (
    <main>
      <Header />
      <div className="flex h-screen justify-center items-center">
        <SignupForm />
      </div>
    </main>
  );
}
