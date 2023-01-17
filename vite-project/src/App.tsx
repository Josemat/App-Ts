import * as React from 'react';
import './App.css';
import Navbar from './layout/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import { Route } from 'wouter';
import Home from './components/Home';
import Perfil from './components/Perfil';
import NuevaAsistencia from './components/NuevaAsistencia';
import BuscarCoche from './components/BuscarCoche';
import Olvido from './components/Olvido';
import NuevaContrasena from './components/NuevaContrasena';
import { AuthContext } from './context/setAuth';
import Alertas from './components/Alertas';
interface Prop {
  variante: 'success' | 'warning' | 'info' | 'error';
  texto: string;
}
function App() {
  const context = React.useContext(AuthContext);
  return (
    <div className="App">
      <Navbar />
      <h1> </h1>
      {context?.componenteAlerta.texto ? (
        <Alertas
          variante={context?.componenteAlerta.variante}
          texto={context?.componenteAlerta.texto}
        />
      ) : null}
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/olvido" component={Olvido} />
      <Route path="/register" component={Register} />
      <Route path="/perfil" component={Perfil} />
      <Route path="/asistencianueva" component={NuevaAsistencia} />
      <Route path="/buscarcoche" component={BuscarCoche} />
      <Route path="/nuevacontrasena" component={NuevaContrasena} />
    </div>
  );
}

export default App;
