import {NextPage} from 'next';
import { Metadata } from 'next';

export const metadata:Metadata = {
  title: 'Sign Up',
}

const SignUpPage : NextPage = () => {
  return (
    <main>
      <div className="flex h-screen justify-center items-center">
        <div className="flex flex-col">
          <a className="text-xl">会員登録</a>
          <div className="flex my-2 flex-col">
            <label htmlFor="user-name">ユーザー名</label>
            <input type="email" id="email-address" name="email-address" required></input>
          </div>
          <div className="flex my-2 flex-col">
            <label htmlFor="email-address">メールアドレス</label>
            <input type="email" id="email-address" name="email-address" required></input>
          </div>
          <div className="flex my-2 flex-col">
            <label htmlFor="password">パスワード</label>
            <input type="password" id="password" name="password" required></input>
          </div>
          <input type="submit" value="登録" className="my-3 bg-cyan-400 hover:bg-cyan-500 active:bg-cyan-600 text-center text-white"/>
        </div>
      </div>
    </main>
  );
}

export default SignUpPage;