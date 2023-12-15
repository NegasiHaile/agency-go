import { ReactNode, createContext, useEffect, useState } from 'react';
import fetchReq from 'utils/fetch';

interface AuthContextType {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
  userData: any;
}

export const AuthContext = createContext<AuthContextType>({
  isLogin: false,
  login: () => {},
  logout: () => {},
  userData: {},
});

interface $Props {
  children: ReactNode | ReactNode[];
}

export default function AuthProvider({ children }: $Props) {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState({});
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
        }
      })
      .catch((err) => {
        console.log('Error occured: ', err);
      });
  };

  const login = () => {
    setIsLogin(true);
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
      });
  };

  return (
    <AuthContext.Provider value={{ isLogin, login, logout, userData }}>
      {children}
    </AuthContext.Provider>
  );
}
