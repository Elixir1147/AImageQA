import {NextPage} from 'next';
import { Metadata } from 'next';

export const metadata:Metadata = {
  title: 'Sign Up',
}

const SignUpPage : NextPage = () => {
  return (
    <main>
      <div className="grid grid-cols-8">
        <div className="col-start-2 col-end-4">
          <label htmlFor="family-name">姓</label>
          <input type="text" id="family-name" name="famili-name" required></input>
        </div>
        <div className="col-start-4 col-end-6">
          <label htmlFor="last-name">名</label>
          <input type="text" id="last-name" name="last-name" required></input>
        </div>
        <div className="col-start-2 col-end-4">
          <label htmlFor="family-name-kana">セイ</label>
          <input type="text" id="family-name-kana" name="family-name-kana" required></input>
        </div>
        <div className="col-start-4 col-end-6">
          <label htmlFor="last-name-kana">メイ</label>
          <input type="text" id="last-name-kana" name="last-name-kana" required></input>
        </div>
        <div className="col-start-2 col-end-6">
          <label htmlFor="user-name">ユーザー名</label><input type="text" id="user-name" name="user-name" required></input>
        </div>
        <div className="col-start-2 col-end-6">
          <fieldset>
            <legend>性別</legend>
            <label htmlFor="male">男性</label><input type="radio" id="male" name="gender" required></input>
            <label htmlFor="female">女性</label><input type="radio" id="female" name="gender" required></input>
            <label htmlFor="other-gender">その他</label><input type="radio" id="other-gender" name="gender" required></input>
          </fieldset>
        </div>
        <div className="col-start-2 col-end-4">
          <fieldset>
            <legend>電話番号(どちらか必須)</legend>
              <div className="flex flex-col">
              <label htmlFor="telephone">固定電話</label>
              <input type="tel" id="telephone" name="phone-number" pattern="[0-9]{10}" />
              <label htmlFor="smartphone">携帯電話</label>
              <input type="tel" id="smartphone" name="phone-number" pattern="[0-9]{11}" />
              </div>
          </fieldset>
        </div>
        <div className="col-start-2 col-end-6">
          <fieldset id="birthday">
          <legend>生年月日</legend>
            <select name="birthday-year" id="birthday-year" required>
              <option value="1900">1900</option>
              <option value="1901">1901</option>
              <option value="1902">1902</option>
              <option value="1903">1903</option>
              <option value="1904">1904</option>
              <option value="1905">1905</option>
              <option value="1906">1906</option>
              <option value="1907">1907</option>
              <option value="1908">1908</option>
              <option value="1909">1909</option>
              <option value="1910">1910</option>
              <option value="1911">1911</option>
              <option value="1912">1912</option>
              <option value="1913">1913</option>
              <option value="1914">1914</option>
              <option value="1915">1915</option>
              <option value="1916">1916</option>
              <option value="1917">1917</option>
              <option value="1918">1918</option>
              <option value="1919">1919</option>
              <option value="1920">1920</option>
              <option value="1921">1921</option>
              <option value="1922">1922</option>
              <option value="1923">1923</option>
              <option value="1924">1924</option>
              <option value="1925">1925</option>
              <option value="1926">1926</option>
              <option value="1927">1927</option>
              <option value="1928">1928</option>
              <option value="1929">1929</option>
              <option value="1930">1930</option>
              <option value="1931">1931</option>
              <option value="1932">1932</option>
              <option value="1933">1933</option>
              <option value="1934">1934</option>
              <option value="1935">1935</option>
              <option value="1936">1936</option>
              <option value="1937">1937</option>
              <option value="1938">1938</option>
              <option value="1939">1939</option>
              <option value="1940">1940</option>
              <option value="1941">1941</option>
              <option value="1942">1942</option>
              <option value="1943">1943</option>
              <option value="1944">1944</option>
              <option value="1945">1945</option>
              <option value="1946">1946</option>
              <option value="1947">1947</option>
              <option value="1948">1948</option>
              <option value="1949">1949</option>
              <option value="1950">1950</option>
              <option value="1951">1951</option>
              <option value="1952">1952</option>
              <option value="1953">1953</option>
              <option value="1954">1954</option>
              <option value="1955">1955</option>
              <option value="1956">1956</option>
              <option value="1957">1957</option>
              <option value="1958">1958</option>
              <option value="1959">1959</option>
              <option value="1960">1960</option>
              <option value="1961">1961</option>
              <option value="1962">1962</option>
              <option value="1963">1963</option>
              <option value="1964">1964</option>
              <option value="1965">1965</option>
              <option value="1966">1966</option>
              <option value="1967">1967</option>
              <option value="1968">1968</option>
              <option value="1969">1969</option>
              <option value="1970">1970</option>
              <option value="1971">1971</option>
              <option value="1972">1972</option>
              <option value="1973">1973</option>
              <option value="1974">1974</option>
              <option value="1975">1975</option>
              <option value="1976">1976</option>
              <option value="1977">1977</option>
              <option value="1978">1978</option>
              <option value="1979">1979</option>
              <option value="1980">1980</option>
              <option value="1981">1981</option>
              <option value="1982">1982</option>
              <option value="1983">1983</option>
              <option value="1984">1984</option>
              <option value="1985">1985</option>
              <option value="1986">1986</option>
              <option value="1987">1987</option>
              <option value="1988">1988</option>
              <option value="1989">1989</option>
              <option value="1990">1990</option>
              <option value="1991">1991</option>
              <option value="1992">1992</option>
              <option value="1993">1993</option>
              <option value="1994">1994</option>
              <option value="1995">1995</option>
              <option value="1996">1996</option>
              <option value="1997">1997</option>
              <option value="1998">1998</option>
              <option value="1999">1999</option>
              <option value="2000">2000</option>
              <option value="2001">2001</option>
              <option value="2002">2002</option>
              <option value="2003">2003</option>
              <option value="2004">2004</option>
              <option value="2005">2005</option>
              <option value="2006">2006</option>
              <option value="2007">2007</option>
              <option value="2008">2008</option>
              <option value="2009">2009</option>
              <option value="2010">2010</option>
              <option value="2011">2011</option>
              <option value="2012">2012</option>
              <option value="2013">2013</option>
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>年
            <select name="birthday-month" id="birthday-month" required>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>月
            <select name="birthday-day" id="birthday-day" required>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </select>日
          </fieldset>
        </div>
        <div className="col-start-2 col-end-6">
          <label htmlFor="email-address">メールアドレス</label>
          <input type="email" id="email-address" name="email-address" required></input>
        </div>
        <div className="col-start-2 col-end-6">
          <label htmlFor="password">パスワード</label>
          <input type="password" id="password" name="password" required></input>
        </div>
        <div className="col-start-2">
          <fieldset>
            <legend>都道府県</legend>
            <select name="prefecture" id="prefecture" required>
              <option value="北海道">北海道</option>
              <option value="青森県">青森県</option>
              <option value="岩手県">岩手県</option>
              <option value="宮城県">宮城県</option>
              <option value="秋田県">秋田県</option>
              <option value="山形県">山形県</option>
              <option value="福島県">福島県</option>
              <option value="茨城県">茨城県</option>
              <option value="栃木県">栃木県</option>
              <option value="群馬県">群馬県</option>
              <option value="埼玉県">埼玉県</option>
              <option value="千葉県">千葉県</option>
              <option value="東京都" selected>東京都</option>
              <option value="神奈川県">神奈川県</option>
              <option value="新潟県">新潟県</option>
              <option value="富山県">富山県</option>
              <option value="石川県">石川県</option>
              <option value="福井県">福井県</option>
              <option value="山梨県">山梨県</option>
              <option value="長野県">長野県</option>
              <option value="岐阜県">岐阜県</option>
              <option value="静岡県">静岡県</option>
              <option value="愛知県">愛知県</option>
              <option value="三重県">三重県</option>
              <option value="滋賀県">滋賀県</option>
              <option value="京都府">京都府</option>
              <option value="大阪府">大阪府</option>
              <option value="兵庫県">兵庫県</option>
              <option value="奈良県">奈良県</option>
              <option value="和歌山県">和歌山県</option>
              <option value="鳥取県">鳥取県</option>
              <option value="島根県">島根県</option>
              <option value="岡山県">岡山県</option>
              <option value="広島県">広島県</option>
              <option value="山口県">山口県</option>
              <option value="徳島県">徳島県</option>
              <option value="香川県">香川県</option>
              <option value="愛媛県">愛媛県</option>
              <option value="高知県">高知県</option>
              <option value="福岡県">福岡県</option>
              <option value="佐賀県">佐賀県</option>
              <option value="長崎県">長崎県</option>
              <option value="熊本県">熊本県</option>
              <option value="大分県">大分県</option>
              <option value="宮崎県">宮崎県</option>
              <option value="鹿児島県">鹿児島県</option>
              <option value="沖縄県">沖縄県</option>
             </select>
          </fieldset>
        </div>
        <input type="submit" value="登録" className="col-start-2 bg-cyan-400 hover:bg-cyan-500 active:bg-cyan-600 text-center text-white"/>
      </div>
    </main>
  );
}

export default SignUpPage;