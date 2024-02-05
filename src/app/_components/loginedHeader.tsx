import Link from "next/link";
import LogoutButton from "./logoutButton";

export default function LoginedHeader(): JSX.Element {
  return (
    <div className="grid grid-cols-12 gap-4 bg-cyan-400">
      <Link
        className="hover:bg-cyan-500 text-center text-white col-start-1 col-span-1 justify-start"
        href="/"
      >
        I
      </Link>
      <Link
        className="hover:bg-cyan-500 text-center text-white col-end-12 col-span-1"
        href="/question"
      >
        質問する
      </Link>
      <LogoutButton className="hover:bg-cyan-500 text-center text-white col-end-13 col-span-1">
        ログアウト
      </LogoutButton>
    </div>
  );
}
