"use client";
import { FRONT_API_BASE_URL } from "@/lib/macro";
export default function LogoutButton(props: {
  children: string;
  className: string;
}): JSX.Element {
  return (
    <button
      className={props.className}
      onClick={async (e) => {
        const result = await fetch(FRONT_API_BASE_URL + "/api/logout", {
          method: "get",
        });

        if (result.status === 200) {
          location.assign(FRONT_API_BASE_URL + "/");
        } else {
          window.alert("ログアウトに失敗しました．");
        }
      }}
    >
      {props.children}
    </button>
  );
}
