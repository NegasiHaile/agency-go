import { useEffect, useState } from 'react';
import useQuery from './useQuery';

interface IResponse {
  isLogin: boolean;
  isAgencyAdmin: boolean;
  isEmployee: boolean;
  permissions: string[];
}

const useAuth = (): IResponse => {
  const [isLogin, setIsLogin] = useState(false);
  const { refetch } = useQuery({
    key: 'verify',
    notInitialFetch: true,
    onSuccess: () => {
      setIsLogin(true);
    },
    onError: () => {
      setIsLogin(false);
    },
  });

  // useEffect(() => {
  //   (async () => {
  //     const token = await window.electron.ipcRenderer.invoke(
  //       'get-store',
  //       'token'
  //     );
  //     console.log('token', token);
  //     if (token) {
  //       setTimeout(() => {
  //         refetch();
  //       }, 1000);
  //     } else {
  //       setIsLogin(false);
  //     }
  //   })();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   if (!isLogin) {
  //     window.electron.ipcRenderer.on('login-response', () => {
  //       setIsLogin(true);
  //       refetch();
  //     });
  //     window.electron.ipcRenderer.on('signup-response', () => {
  //       setIsLogin(true);
  //       refetch();
  //     });
  //   } else {
  //     window.electron.ipcRenderer.on('logout-response', async () => {
  //       setIsLogin(false);
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isLogin]);

  return {
    isLogin,
    // TODO: for agency admin and employee check permissions
    isAgencyAdmin: false,
    isEmployee: false,
    permissions: [],
  };
};

export default useAuth;
