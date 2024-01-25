'use client'
import Header from '@/_components/header';
import { redirect } from 'next/navigation';
import { API_BASE_URL } from '@/lib/macro';
import { revalidatePath } from 'next/cache';
import { useEffect } from 'react';
import { NextResponse } from 'next/server';
import { Session } from 'lucia';


export default async function SignUpPage(): Promise<JSX.Element|void>{
  useEffect(()=>{
    (async ()=>{
      const res = await fetch(API_BASE_URL+'/api/session',{method: 'GET'})
      const resJson = await res.json()
      console.debug('useEffect')
      console.debug(resJson)
      if(resJson.session){
        revalidatePath('/')
        redirect('/')
      }
    })()
  },[])
  return (
    <main>
      <Header/>
      <div className="flex h-screen justify-center items-center">
        <form className="flex flex-col" method="post" action={async(formData)=>{
          // const message= await registerUser(formData)
          // if(typeof message !== 'undefined'){
          //   window.alert(message.message)
          //   console.debug(message.message)
          // }
          // revalidatePath('/')
          // redirect('/')
            const res = await fetch(
                API_BASE_URL+'/api/signup',
                {
                  method:'POST',
                  body:formData
                }
              );
            console.debug('form')
            console.debug(res)
            if(res.status === 200){
              revalidatePath('/')
              redirect('/')
            }else{
              window.alert(await res.text())
              console.debug(res.status)
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
