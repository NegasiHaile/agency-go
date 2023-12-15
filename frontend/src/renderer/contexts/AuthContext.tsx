import { ReactNode, createContext, useEffect, useState } from 'react';
import useQuery from 'renderer/hooks/useQuery';
import fetchReq from 'utils/fetch';

interface AuthContextType {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
  userData: any;
  userDetail: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLogin: false,
  login: () => {},
  logout: () => {},
  userData: {},
  userDetail: () => {},
});

interface $Props {
  children: ReactNode | ReactNode[];
}

export default function AuthProvider({ children }: $Props) {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState({});
  const authQuery = useQuery({
    key: 'verify',
    onSuccess() {
      setIsLogin(true);
    },
    onError() {
      setIsLogin(false);
    }
  })
  const token = localStorage.getItem('Authorization');

  useEffect(() => {
    if (token) {
      login();
      userDetail();
    }
  }, [token]);

  const userDetail = () => {
    let endpoint = 'verify';
    let options = {
      method: 'GET' as 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withAuth: true,
    };
    fetchReq(endpoint, options)
      .then((response) => response.json())
      .then((res) => {
        if (res.message == 'verify') {
          setUserData(res.data);
          setIsLogin(true);
        }
      })
      .catch((err) => {
        console.log('Error occured: ', err);
        setIsLogin(false);
      });
  };

  const login = () => {
    authQuery.refetch();
    // setIsLogin(true);
  };

  const logout = () => {
    let endpoint = 'logout';
    let options = {
      method: 'POST' as 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withAuth: true,
    };
    fetchReq(endpoint, options)
      .then((response) => response.json())
      .then((res) => {
        if (res.message) {
          localStorage.removeItem('Authorization');
          localStorage.removeItem('AgencyId');
          localStorage.removeItem('UserId');
          localStorage.removeItem('TwilioToken');
          setIsLogin(false);
          setUserData({});
        }
      })
      .catch((err) => {
        console.log('Error occured: ', err);
        //Clear auth token, and set to login screen as fallback;
        localStorage.removeItem('Authorization');
        localStorage.removeItem('AgencyId');
        localStorage.removeItem('UserId');
        localStorage.removeItem('TwilioToken');
        setIsLogin(false);
        setUserData({});
      });
  };

  return (
    <AuthContext.Provider
      value={{ isLogin, login, logout, userData, userDetail }}
    >
      {children}
    </AuthContext.Provider>
  );
}
