import * as React from 'react';
interface contextito {
  user: { nombre: string; apellido: string; uid: string };
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
}
export const AuthContext = React.createContext<contextito | null>(null);

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState({ nombre: '', apellido: '', uid: '' });
  const login = ({ nombre, apellido, uid }: Login) => {
    setUser({ nombre, apellido, uid });
  };
  const logOut = () => {
    setUser({ nombre: '', apellido: '', uid: '' });
  };
  return (
    <AuthContext.Provider value={{ user, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
