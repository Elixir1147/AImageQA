"use client";
import { FRONT_API_BASE_URL } from "@/lib/macro";

export default function SignupForm(): JSX.Element {
  return (
    <form
      className="flex flex-col"
      method="post"
      action={async (formData) => {
        const res = await fetch(FRONT_API_BASE_URL + "/api/signup", {
          method: "POST",
          body: formData,
        });
        console.debug("form");
        console.debug(res);
        if (res.status === 201) {
          location.assign(FRONT_API_BASE_URL + "/");
        } else {
          window.alert(await res.text());
          console.debug(res.status);
        }
      }}
    >
      <a className="text-xl">会員登録</a>
      <div className="flex my-2 flex-col">
        <label htmlFor="user-name">ユーザー名</label>
        <input type="text" id="user-name" name="user-name" required></input>
      </div>
      <div className="flex my-2 flex-col">
        <label htmlFor="mail-address">メールアドレス</label>
        <input
          type="email"
          id="mail-address"
          name="mail-address"
          required
        ></input>
      </div>
      <div className="flex my-2 flex-col">
        <label htmlFor="password">パスワード</label>
        <input type="password" id="password" name="password" required></input>
      </div>
      <input
        type="submit"
        className="my-3 bg-cyan-400 hover:bg-cyan-500 active:bg-cyan-600 text-center text-white"
      />
    </form>
  );
}
