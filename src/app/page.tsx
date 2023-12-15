import { NextPage } from 'next';
import {Metadata} from 'next';
import Header from '@/components/header';
export const metadata:Metadata ={
  title: "Image-Share",
}

const TopPage : NextPage = () => {
  return (
    <main>
      <Header/>
    </main>
  );
}

export default TopPage;