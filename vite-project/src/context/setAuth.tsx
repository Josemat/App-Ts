import * as React from 'react';
import { logout } from '../helpers/firebaseActions';

interface contextito {
  user: {
    nombre: string;
    apellido: string;
    uid: string;
    avatar: string;
    posicion?: number;
  };
  login: Function;
  logOut: Function;
  funcPosicion: Function;
  pos: number;
  setPos: Function;
}
interface Props {
  children: JSX.Element[] | JSX.Element;
}
interface Login {
  nombre: string;
  apellido: string;
  uid: string;
  avatar: string;
  posicion?: number;
}
export const AuthContext = React.createContext<contextito | null>(null);

const AuthProvider = ({ children }: Props) => {
  const userLocal = JSON.parse(localStorage.getItem('user') || 'false');
  const [pos, setPos] = React.useState(0);
  const [user, setUser] = React.useState<Login>({
    nombre: userLocal.nombre || '',
    apellido: userLocal.apellido || '',
    uid: userLocal.uid || '',
    avatar: userLocal.avatar || '',
    posicion: pos,
  });
  if (user.nombre) localStorage.setItem('user', JSON.stringify(user));
  const login = ({ nombre, apellido, uid, avatar }: Login) => {
    setUser({ nombre, apellido, uid, avatar });
  };
  const funcPosicion = (num: number) => {
    setPos(num);
  };
  const logOut = () => {
    logout();
    setUser({ nombre: '', apellido: '', uid: '', avatar: '' });

    localStorage.clear();
  };
  return (
    <AuthContext.Provider
      value={{ user, login, logOut, funcPosicion, pos, setPos }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
