"use client";
import { API_BASE_URL } from "@/lib/macro";
export default function LogoutButton(props: {
  children: string;
  className: string;
}): JSX.Element {
  return (
    <button
      className={props.className}
      onClick={async (e) => {
        const result = await fetch(API_BASE_URL + "/api/logout", {
          method: "get",
        });

        if (result.status === 200) {
          location.assign(API_BASE_URL + "/");
        } else {
          window.alert("ログアウトに失敗しました．");
        }
      }}
    >
      {props.children}
    </button>
  );
}
