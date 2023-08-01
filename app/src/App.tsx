import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Admin from './pages/admin';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Admin/>}/>
      </Routes>
    </div>
  );
}

export default App;
