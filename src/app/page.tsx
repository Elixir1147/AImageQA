import { NextPage } from 'next';
import {Metadata} from 'next';
import Header from '@/components/header';
import RankingHeader from '@/components/ranking-banner';

export const metadata:Metadata ={
  title: "Image-Share",
}

const TopPage : NextPage = () => {
  return (
    <main>
      <Header/>
      <RankingHeader/>
    </main>
  );
}

export default TopPage;