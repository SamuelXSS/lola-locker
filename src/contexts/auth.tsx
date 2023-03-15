import React, { createContext, useState, useContext, useEffect } from 'react';
import Notify from '../components/Toast';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  nickname: string;
  birthday: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  Login(nickname: string, password: string): Promise<any>;
  Logout(): void;
}

interface IProps {
  children?: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storagedUser = localStorage.getItem('@App:user');
    const storagedToken = localStorage.getItem('@App:token');

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  async function Login(nickname: string, password: string) {
    const res = await api
      .post('/login', {
        nickname,
        password,
      })
      .then((res) => {
        const {
          user,
          token: { token },
        } = res.data;
        setUser(user);
        api.defaults.headers.Authorization = `Bearer ${token}`;

        localStorage.setItem('@App:user', JSON.stringify(user));
        localStorage.setItem('@App:token', token);

        return true;
      })
      .catch((err) => {
        if (err.response) {
          return { status: err.response.status };
        }
      });
    return res;
  }

  function Logout() {
    setUser(null);

    localStorage.removeItem('@App:user');
    localStorage.removeItem('@App:token');
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, Login, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
