import {NextPage} from 'next';

const LoginPage : NextPage = () => {
  return(
    <main>
      <label htmlFor="email">メールアドレス</label>
      <input name="email" id="email" type="email"></input>
      <label htmlFor="password">パスワード</label>
      <input name="password" id="password" type="password"></input>
      <input type="submit" value="ログイン"/>
    </main>
  );
}

export default LoginPage;