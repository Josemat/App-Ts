import * as React from 'react';
import './App.css';
import Navbar from './layout/Navbar';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <Navbar />
      <h1> </h1>
      {/* <Login/> */}
      <Register />
    </div>
  );
}

export default App;
