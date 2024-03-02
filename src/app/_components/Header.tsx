import { validateRequest } from "@/lib/auth/validateRequest";
import NotLoginedHeader from "./notLoginedHeader";
import LoginedHeader from "./loginedHeader";

export default async function Header(): Promise<JSX.Element> {
  const validateResult = await validateRequest();
  return !validateResult.user ? <NotLoginedHeader /> : <LoginedHeader />;
}
