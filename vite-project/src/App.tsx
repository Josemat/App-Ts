import * as React from 'react';
import './App.css';
import Navbar from './layout/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import { Route, Switch } from 'wouter';
import Home from './components/Home';
import Perfil from './components/Perfil';
import NuevaAsistencia from './components/NuevaAsistencia';

function App() {
  return (
    <div className="App">
      <Navbar />
      <h1> </h1>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/perfil" component={Perfil} />
      <Route path="/asistencianueva" component={NuevaAsistencia} />
    </div>
  );
}

export default App;
