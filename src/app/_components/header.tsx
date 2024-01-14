import  Link  from 'next/link'
import { LOCAL_ADDRESS } from '@/lib/macro';

export default function Header():JSX.Element {
  return(
    <div className='grid grid-cols-12 gap-4 bg-cyan-400'>
      <a className='text-center text-white col-start-1 col-span-1 justify-start'>I</a>
      <a className='hover:bg-cyan-500 text-center text-white col-end-12 col-span-1'>
        ログイン
      </a>
      <Link className='hover:bg-cyan-500 text-center text-white col-end-13 col-span-1' href="/signup">登録</Link>
    </div>
  );
}
