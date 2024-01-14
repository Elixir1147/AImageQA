'use client'

import { registerUser } from '@/lib/registerUser';
import Header from '@/_components/header';
import {auth} from "@/auth/lucia"
import * as context from "next/headers"
import {redirect} from "next/navigation"

export default async function SignUpPage(): Promise<JSX.Element | void>{
  
  const authRequest = auth.handleRequest("GET",context)
  const session = await authRequest.validate()
  if(session){
    redirect("/")
  }

  return (
    <main>
      <Header/>
      <div className="flex h-screen justify-center items-center">
        <form className="flex flex-col" method="post" action={async(formData)=>{
          const message= await registerUser(formData);
          if(typeof message !== 'undefined'){
            window.alert(message.message)
            console.debug(message.message)
          }
        }}>
          <a className="text-xl">会員登録</a>
          <div className="flex my-2 flex-col">
            <label htmlFor="user-name">ユーザー名</label>
            <input type="text" id="user-name" name="user-name" required></input>
          </div>
          <div className="flex my-2 flex-col">
            <label htmlFor="mail-address">メールアドレス</label>
            <input type="email" id="mail-address" name="mail-address" required></input>
          </div>
          <div className="flex my-2 flex-col">
            <label htmlFor="password">パスワード</label>
            <input type="password" id="password" name="password" required></input>
          </div>
          <input type="submit" className="my-3 bg-cyan-400 hover:bg-cyan-500 active:bg-cyan-600 text-center text-white"/>
        </form>
      </div>
    </main>
  );
}

// export function getStaticProps():{props:{onClickFunction:()=>Promise<void>}}{
//   const onClickFunction = async()=>{
//     console.debug("onclick is called")
//     const userName=document.getElementById("user-name")
//     const mailAddress=document.getElementById("email-address")
//     const password=document.getElementById("password")
//     if(userName!==null && mailAddress!==null && password!==null){
//       await fetch(
//         "http://localhost:3000/users",{
//           method:"POST",
//           body:JSON.stringify({
//             userName: (userName as HTMLInputElement).value,
//             mailAddress: (mailAddress as HTMLInputElement).value,
//             password: (password as HTMLInputElement).value,
//           })
//         }
//       )
//     }
//   }
  
//   return {
//     props: {
//       onClickFunction,
//     }
//   }
// }