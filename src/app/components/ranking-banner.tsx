import {NextPage} from 'next';

const RankingHeader : NextPage = () => {
  return(
    <div className='flex flex-row'>
      <a className='bg-cyan-400 hover:bg-cyan-500 text-center text-white basis-1/2'>イラスト</a>
      <a className='bg-cyan-400 hover:bg-cyan-500 text-center text-white basis-1/2'>ユーザ</a>
    </div>
  );
}

export default RankingHeader;