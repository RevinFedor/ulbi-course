import './styles/index.scss';
import React, { Suspense, useEffect } from 'react';
import { AppRouter } from './providers/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { useAppDispatch, useAppSelector } from '../shared/lib/hooks/hooksStore';
import { getUserInited, userActions } from '@/entities/User';
import { SideBar } from '@/widgets/SideBar';

// // return masked string
// function maskify(cc: string | number) {
//     const ccArr = cc.toString().split('');
//     const lastNum = ccArr.slice(-4);
//     if (ccArr.length < 4) return cc
//     return Array(ccArr.length - 4)
//         .fill('#')
//         .concat(lastNum).join('');
// }

// console.log(maskify(1));

function App() {
  const dispath = useAppDispatch();
  const inited = useAppSelector(getUserInited);
  useEffect(() => {
    dispath(userActions.initAuthData());
  }, [dispath]);

  // отобразить линки вне роутинга
  return (
    <div className={classNames('app', {}, [])}>
      <Suspense fallback="">
        <Navbar />
        <div className="content-page">
          <SideBar />
          {inited && <AppRouter />}
        </div>
      </Suspense>
    </div>
  );
}

export default App;
