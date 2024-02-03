"use client";
import Header from "@/_components/notLoginedHeader";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { API_BASE_URL } from "@/lib/macro";

export default async function LoginPage(): Promise<JSX.Element | void> {
  // useEffect(()=>{
  //   (async ()=>{
  //     const res = await fetch(API_BASE_URL+'/api/session',{method: 'GET'})
  //     const resJson = await res.json()
  //     console.debug('useEffect')
  //     console.debug(resJson)
  //     if(resJson.session){
  //       location.assign(API_BASE_URL + '/' )
  //     }
  //   })()
  // },[])

  return (
    <main>
      <Header />
      <div className="flex h-screen justify-center items-center">
        <form
          className="flex flex-col"
          method="post"
          action={async (formData) => {
            const res = await fetch(API_BASE_URL + "/api/login", {
              method: "POST",
              body: formData,
            });
            if (res.status === 200) {
              redirect("/");
            } else {
              window.alert(await res.text());
              console.debug(res.status);
            }
          }}
        >
          <a className="text-xl">ログイン</a>
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
            <input
              type="password"
              id="password"
              name="password"
              required
            ></input>
          </div>
          <input
            type="submit"
            value="ログイン"
            className="my-3 bg-cyan-400 hover:bg-cyan-500 active:bg-cyan-600 text-center text-white"
          />
        </form>
      </div>
    </main>
  );
}
