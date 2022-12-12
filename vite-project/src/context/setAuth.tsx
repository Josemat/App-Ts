import * as React from 'react';
interface contextito {
  user: { nombre: string; apellido: string; uid: string; avatar: string };
  login: Function;
  logOut: Function;
}
interface Props {
  children: JSX.Element[] | JSX.Element;
}
interface Login {
  nombre: string;
  apellido: string;
  uid: string;
  avatar: string;
}
export const AuthContext = React.createContext<contextito | null>(null);

const AuthProvider = ({ children }: Props) => {
  const userLocal = JSON.parse(localStorage.getItem('user') || 'false');
  const [user, setUser] = React.useState({
    nombre: userLocal.nombre || '',
    apellido: userLocal.apellido || '',
    uid: userLocal.uid || '',
    avatar: userLocal.avatar || '',
  });
  if (user.nombre) localStorage.setItem('user', JSON.stringify(user));
  const login = ({ nombre, apellido, uid, avatar }: Login) => {
    setUser({ nombre, apellido, uid, avatar });
  };
  const logOut = () => {
    setUser({ nombre: '', apellido: '', uid: '', avatar: '' });
    localStorage.clear();
  };
  return (
    <AuthContext.Provider value={{ user, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
